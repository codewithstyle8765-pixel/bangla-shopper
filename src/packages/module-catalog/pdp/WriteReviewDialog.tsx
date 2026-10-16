"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import clsx from "clsx";
import { Modal } from "@/packages/module-common/Modal";
import { FormAlert, TextareaField, TextField, useFieldErrors, useSubmitWithoutReset } from "@/packages/module-common/form";
import { CameraIcon } from "@/packages/module-common/icons/UiIcons";
import { useFormOperation } from "@/utils/api/client";

const STAR_LABELS = ["Poor", "Fair", "Average", "Good", "Excellent"];
const MAX_PHOTOS = 5;

/** The choice lives in the parent: React resets the form after each submit, which would clear a checked radio. */
function StarPicker({ value, onChange, error }: { value: number; onChange: (stars: number) => void; error?: string }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset aria-describedby={error ? "rating-error" : undefined}>
      <legend className="mb-1.5 text-[14px] font-semibold text-brand-dark">
        Your rating <span className="text-brand-alert">*</span>
      </legend>
      <div className="flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {STAR_LABELS.map((label, i) => {
            const stars = i + 1;
            return (
              <label key={label} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(stars)}>
                <input
                  type="radio"
                  name="rating-choice"
                  value={stars}
                  checked={value === stars}
                  onChange={() => onChange(stars)}
                  className="peer sr-only"
                  aria-label={`${stars} star${stars > 1 ? "s" : ""}, ${label}`}
                />
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={clsx(
                    "h-7 w-7 rounded-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-coral/40",
                    stars <= shown ? "text-star-filled" : "text-card-border",
                  )}
                >
                  <path fill="currentColor" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9Z" />
                </svg>
              </label>
            );
          })}
        </div>
        <span className="text-[13px] font-medium text-footer-text" aria-live="polite">
          {shown ? `${shown} – ${STAR_LABELS[shown - 1]}` : "Tap a star"}
        </span>
      </div>
      {error && (
        <p id="rating-error" className="mt-1 text-[12px] text-brand-alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface PhotoItem {
  id: string;
  dataUrl: string;
  name: string;
}

function PhotoUploader({
  photos,
  onChange,
}: {
  photos: PhotoItem[];
  onChange: (photos: PhotoItem[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setPhotoError(null);

    const availableSlots = MAX_PHOTOS - photos.length;
    if (availableSlots <= 0) {
      setPhotoError(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, availableSlots);
    if (fileList.length > availableSlots) {
      setPhotoError(`Only ${availableSlots} more photo${availableSlots === 1 ? "" : "s"} could be added (max ${MAX_PHOTOS}).`);
    }

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setPhotoError("Please select image files only (PNG, JPG, WEBP).");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setPhotoError(`"${file.name}" exceeds the 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          onChange([
            ...photos,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              dataUrl,
              name: file.name,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
    setPhotoError(null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  useEffect(() => {
    const el = fileInputRef.current;
    if (!el) return;
    const handleCancel = (e: Event) => e.stopPropagation();
    el.addEventListener("cancel", handleCancel);
    return () => el.removeEventListener("cancel", handleCancel);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-brand-dark flex items-center gap-1.5">
          <CameraIcon className="w-4 h-4 text-brand-dark" />
          <span>Upload Photos</span>
          <span className="font-normal text-price-strikethrough">(optional)</span>
        </label>
        <span className="text-[12px] font-medium text-footer-text">
          {photos.length}/{MAX_PHOTOS} photos
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
        className="sr-only"
        id="review-photo-upload"
      />

      {/* Preview Grid and Upload Trigger */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={clsx(
          "rounded-[8px] border-2 border-dashed p-3 transition-colors",
          isDragging ? "border-brand-coral bg-brand-coral/5" : "border-card-border bg-surface-soft/40",
        )}
      >
        {photos.length === MAX_PHOTOS ? (
          <div className="grid grid-cols-5 gap-2 sm:gap-2.5 w-full">
            {photos.map((item, idx) => (
              <div
                key={item.id}
                className="group relative aspect-square w-full overflow-hidden rounded-[6px] border border-card-border bg-white shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.dataUrl} alt={`Photo ${idx + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(item.id)}
                  aria-label={`Remove photo ${idx + 1}`}
                  className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-brand-black/75 text-white shadow-xs transition-transform hover:scale-110 hover:bg-brand-coral"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {photos.map((item, idx) => (
              <div
                key={item.id}
                className="group relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[6px] border border-card-border bg-white shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.dataUrl} alt={`Photo ${idx + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(item.id)}
                  aria-label={`Remove photo ${idx + 1}`}
                  className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-brand-black/75 text-white shadow-xs transition-transform hover:scale-110 hover:bg-brand-coral"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className={clsx(
                "cursor-pointer flex-col items-center justify-center rounded-[6px] border border-dashed border-card-border bg-white text-center transition-colors hover:border-brand-coral hover:bg-brand-coral/5",
                photos.length === 0
                  ? "flex h-[76px] w-full px-4"
                  : "flex h-[72px] min-w-[90px] flex-1 max-w-[140px] px-2.5",
              )}
            >
              <CameraIcon className="h-5 w-5 text-brand-dark" />
              <span className="mt-1 text-[12px] font-semibold text-brand-ink">
                {photos.length === 0 ? "Add Photos" : "Add More"}
              </span>
              <span className="text-[10px] text-footer-text">
                {photos.length === 0 ? `Up to ${MAX_PHOTOS} photos (max 10MB each)` : `${photos.length}/${MAX_PHOTOS}`}
              </span>
            </button>
          </div>
        )}

        {photos.length === 0 && (
          <p className="mt-2 text-center text-[12px] text-footer-text">
            Drop photos here or click to browse. Supported formats: PNG, JPG, WebP.
          </p>
        )}
      </div>

      {photoError && (
        <p className="text-[12px] text-brand-alert" role="alert">
          {photoError}
        </p>
      )}
    </div>
  );
}

interface ReviewSubmitPayload {
  nickname: string;
  rating: number;
  summary: string;
  text: string;
  pros?: string;
  value?: string;
  price?: string;
  photos: string[];
}

function ReviewForm({
  sku,
  onDone,
  onReviewSubmitted,
}: {
  sku: string;
  onDone: () => void;
  onReviewSubmitted?: (review: ReviewSubmitPayload) => void;
}) {
  const submit = useFormOperation("CreateProductReview");
  const [stars, setStars] = useState(0);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const submittedDataRef = useRef<ReviewSubmitPayload | null>(null);

  const [state, action, pending] = useActionState(
    (prev: Parameters<typeof submit>[0], formData: FormData) => {
      formData.set("rating", String(stars));
      const photoUrls = photos.map((p) => p.dataUrl);
      formData.set("photos", JSON.stringify(photoUrls));

      submittedDataRef.current = {
        nickname: String(formData.get("nickname") ?? ""),
        rating: stars,
        summary: String(formData.get("summary") ?? ""),
        text: String(formData.get("text") ?? ""),
        pros: String(formData.get("pros") ?? "") || undefined,
        value: String(formData.get("value") ?? "") || undefined,
        price: String(formData.get("price") ?? "") || undefined,
        photos: photoUrls,
      };

      return submit(prev, formData);
    },
    null,
  );

  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const onSubmit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};

  useEffect(() => {
    if (state?.ok && submittedDataRef.current) {
      onReviewSubmitted?.(submittedDataRef.current);
    }
  }, [state?.ok, onReviewSubmitted]);

  if (state?.ok) {
    return (
      <div className="space-y-4 py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-[18px] font-bold text-brand-dark">Thank you for your review!</p>
        <p className="mx-auto max-w-md text-[14px] leading-relaxed text-footer-text">
          Your feedback has been submitted successfully. It will appear on this page once approved by our moderation team.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="h-11 cursor-pointer rounded-[4px] bg-brand-coral px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      <input type="hidden" name="sku" value={sku} />

      <StarPicker value={stars} onChange={setStars} error={stars ? undefined : errors.rating} />

      <TextField
        id="nickname"
        label="Your name"
        required
        defaultValue={values.nickname}
        error={errors.nickname}
        placeholder="e.g. Anisha Rozen"
        autoComplete="given-name"
      />

      <TextField
        id="summary"
        label="Review title"
        required
        defaultValue={values.summary}
        error={errors.summary}
        placeholder="e.g. Excellent pigmentation with great fragrance!"
      />

      {/* Pros section matching what is displayed on reviews */}
      <TextareaField
        id="pros"
        label="Pros"
        optional
        rows={2}
        defaultValue={values.pros}
        error={errors.pros}
        placeholder="What did you love most? (e.g. Long-lasting, smooth feel, beautiful everyday shade)"
      />

      {/* Value and Price side by side */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField
          id="value"
          label="Value"
          optional
          defaultValue={values.value}
          error={errors.value}
          placeholder="e.g. Value for money is absolutely spot on!"
        />
        <TextField
          id="price"
          label="Price"
          optional
          defaultValue={values.price}
          error={errors.price}
          placeholder="e.g. Justified, affordable, worth it"
        />
      </div>

      {/* Detailed review comes after Pros, Value, and Price */}
      <TextareaField
        id="text"
        label="Detailed review"
        required
        rows={3}
        defaultValue={values.text}
        error={errors.text}
        placeholder="Share details about texture, application, finish, or how it felt..."
      />

      {/* Photo upload up to 5 photos */}
      <PhotoUploader photos={photos} onChange={setPhotos} />

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral text-[16px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export interface WriteReviewDialogProps {
  open: boolean;
  onClose: () => void;
  sku: string;
  productName: string;
  onReviewSubmitted?: (review: ReviewSubmitPayload) => void;
}

/** "Write a review" dialog: the form is rebuilt each time it opens, so a new review starts clean. */
export function WriteReviewDialog({
  open,
  onClose,
  sku,
  productName,
  onReviewSubmitted,
}: WriteReviewDialogProps) {
  const [round, setRound] = useState(0);
  const close = () => {
    onClose();
    setRound((r) => r + 1);
  };

  return (
    <Modal open={open} onClose={close} title="Write a Review" size="md">
      <p className="mb-4 text-[14px] text-footer-text">
        Reviewing <span className="font-semibold text-brand-dark">{productName}</span>
      </p>
      <ReviewForm key={round} sku={sku} onDone={close} onReviewSubmitted={onReviewSubmitted} />
    </Modal>
  );
}

export default WriteReviewDialog;
