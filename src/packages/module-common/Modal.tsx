"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { useScrollLock } from "@/packages/module-common/useScrollLock";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Prevent closing via Escape/backdrop while an action is running. */
  dismissible?: boolean;
  /** Snappier 200ms open/close for light informational dialogs. */
  quick?: boolean;
  /** Vertically center on mobile instead of sticking to bottom as a bottom-sheet. */
  center?: boolean;
  /** Extra styling on the scrollable content wrapper (e.g. overflow-visible for selects). */
  contentClassName?: string;
}

const SIZES = { sm: "sm:max-w-[420px]", md: "sm:max-w-[560px]", lg: "sm:max-w-[760px]" };
const DURATION = 300;
const QUICK_DURATION = 200;

/** Native <dialog>: focus trap, Escape and inert background built in; stays mounted until the exit transition ends. */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "sm",
  dismissible = true,
  quick = false,
  center = false,
  contentClassName = "",
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  if (open && !mounted) setMounted(true);

  useScrollLock(mounted);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !mounted) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => {
      dialog.close();
      setMounted(false);
    }, quick ? QUICK_DURATION : DURATION);
    return () => window.clearTimeout(timer);
  }, [open, mounted, quick]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        if (dismissible) onClose();
      }}
      className={clsx(
        "fixed inset-0 z-50 !m-0 !h-dvh !max-h-dvh !w-full !max-w-none overflow-hidden border-0 bg-transparent font-sans backdrop:bg-transparent open:flex open:flex-col",
        center
          ? "open:items-center open:justify-center p-3 sm:p-6"
          : "open:items-center p-0 sm:open:justify-center sm:p-6",
      )}
    >
      <div
        aria-hidden="true"
        onClick={() => dismissible && onClose()}
        className={clsx(
          "fixed inset-0 bg-brand-black/50 transition-opacity ease-(--ease-panel) motion-reduce:transition-none",
          quick ? "duration-200" : "duration-(--duration-panel)",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={clsx(
          "relative flex w-full min-h-0 flex-col bg-white shadow-2xl transition-[opacity,transform] ease-(--ease-panel) motion-reduce:transition-none overflow-hidden",
          // On mobile: mt-auto anchors to bottom. On sm+: my-auto centers vertically.
          !center && "mt-auto sm:my-auto",
          center && "my-auto",
          // Mobile: true bottom sheet (flush left, right, bottom; rounded top). sm+: centered floating modal.
          center
            ? "max-h-[min(85dvh,calc(100dvh-2.5rem))] rounded-[12px]"
            : "max-h-[min(85dvh,calc(100dvh-2.5rem))] rounded-t-[16px] rounded-b-none sm:rounded-[12px]",
          "sm:max-h-[min(85dvh,calc(100dvh-3.5rem))]",
          quick ? "duration-200" : "duration-(--duration-panel)",
          SIZES[size],
          visible
            ? "translate-y-0 opacity-100 sm:scale-100"
            : center
              ? "scale-95 opacity-0"
              : "translate-y-full opacity-0 sm:translate-y-2 sm:scale-[0.98] sm:opacity-0",
        )}
      >
        {/* Mobile drag indicator */}
        {!center && (
          <div className="flex shrink-0 justify-center pt-2 pb-1 sm:hidden">
            <div className="h-1 w-10 rounded-full bg-brand-muted/40" />
          </div>
        )}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-card-border px-5 py-3 sm:py-3.5">
          <h2 id={titleId} className="text-[16px] font-black uppercase leading-[1.25] tracking-[0.1em] text-brand-dark">
            {title}
          </h2>
          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-my-2 -mr-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-dark hover:bg-brand-surface transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {children && (
          <div
            className={clsx(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-[14px] leading-[1.5] text-footer-text",
              !footer && "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
              contentClassName,
            )}
          >
            {children}
          </div>
        )}
        {footer && (
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-card-border px-5 py-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      dismissible={!pending}
      footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="h-11 cursor-pointer rounded-[4px] border-2 border-brand-black px-6 text-[14px] font-semibold text-brand-black hover:bg-brand-black hover:text-white disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            autoFocus
            className={clsx(
              "h-11 cursor-pointer rounded-[4px] px-6 text-[14px] font-semibold text-white disabled:cursor-wait disabled:opacity-70",
              tone === "danger" ? "bg-brand-alert hover:bg-brand-coral-active" : "bg-brand-coral hover:bg-brand-coral-hover",
            )}
          >
            {pending ? "Please wait..." : confirmLabel}
          </button>
        </>
      }
    >
      {message}
    </Modal>
  );
}

export default Modal;
