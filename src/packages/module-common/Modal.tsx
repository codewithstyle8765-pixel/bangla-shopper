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
  /** Extra styling on the scrollable content wrapper. */
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
        if (e.target !== ref.current) {
          e.stopPropagation();
          return;
        }
        e.preventDefault();
        if (dismissible) onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 font-sans backdrop:bg-transparent open:flex open:items-end open:justify-center sm:open:items-center sm:open:p-8"
    >
      <div
        aria-hidden="true"
        onClick={() => dismissible && onClose()}
        className={clsx(
          "absolute inset-0 bg-brand-black/50 transition-opacity ease-(--ease-panel) motion-reduce:transition-none",
          quick ? "duration-200" : "duration-(--duration-panel)",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={clsx(
          "relative flex max-h-[calc(100dvh-1rem)] w-full flex-col rounded-t-[12px] bg-white shadow-2xl transition-[opacity,transform] ease-(--ease-panel) motion-reduce:transition-none sm:max-h-full sm:rounded-[8px]",
          quick ? "duration-200" : "duration-(--duration-panel)",
          SIZES[size],
          visible ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-full opacity-0 sm:translate-y-2 sm:scale-[0.98]",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-card-border px-5 py-3.5">
          <h2 id={titleId} className="text-[16px] font-black uppercase leading-[1.25] tracking-[0.1em] text-brand-dark">
            {title}
          </h2>
          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-my-2 -mr-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-dark hover:bg-brand-surface"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {children && (
          <div className={clsx("min-h-0 text-[14px] leading-[1.5] text-footer-text px-5 py-4 overflow-y-auto overscroll-contain", contentClassName)}>
            {children}
          </div>
        )}
        {footer && (
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-card-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end">
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
