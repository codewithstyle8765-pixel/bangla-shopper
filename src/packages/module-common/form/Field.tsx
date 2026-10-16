import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Select, type SelectOption } from "./Select";

export type { SelectOption };

export const controlClass =
  "w-full rounded-[4px] border bg-white px-3 text-[16px] text-brand-dark outline-none lg:text-[14px] transition-colors placeholder:text-price-strikethrough focus:border-brand-dark focus-visible:ring-2 focus-visible:ring-brand-coral/30 disabled:cursor-not-allowed disabled:bg-brand-surface disabled:text-footer-text";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  optional?: boolean;
  className?: string;
  reserveErrorSpace?: boolean;
  children: ReactNode;
}

export function FieldShell({ id, label, error, hint, required, optional, className, reserveErrorSpace, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-[13px] font-medium text-brand-dark">
        {label}
        {required && <span className="text-brand-alert"> *</span>}
        {optional && <span className="font-normal text-price-strikethrough"> (optional)</span>}
      </label>
      {children}
      {reserveErrorSpace ? (
        <div className="mt-0.5 min-h-[16px] text-[12px] leading-[16px]">
          {error ? (
            <p id={`${id}-error`} className="text-brand-alert">
              {error}
            </p>
          ) : hint ? (
            <p id={`${id}-hint`} className="text-footer-text">
              {hint}
            </p>
          ) : null}
        </div>
      ) : error ? (
        <p id={`${id}-error`} className="mt-0.5 text-[12px] text-brand-alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-0.5 text-[12px] text-footer-text">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  reserveErrorSpace?: boolean;
  wrapperClassName?: string;
}

export function TextField({ id, label, error, hint, required, optional, reserveErrorSpace, wrapperClassName, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} reserveErrorSpace={reserveErrorSpace} className={wrapperClassName}>
      <input
        id={id}
        name={rest.name ?? id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={clsx(controlClass, "h-11", error ? "border-brand-alert" : "border-card-border", className)}
        {...rest}
      />
    </FieldShell>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  reserveErrorSpace?: boolean;
  wrapperClassName?: string;
}

export function TextareaField({ id, label, error, hint, required, optional, reserveErrorSpace, wrapperClassName, className, rows = 3, ...rest }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} reserveErrorSpace={reserveErrorSpace} className={wrapperClassName}>
      <textarea
        id={id}
        name={rest.name ?? id}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={clsx(controlClass, "py-2.5", error ? "border-brand-alert" : "border-card-border", className)}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: ReactNode;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  reserveErrorSpace?: boolean;
  wrapperClassName?: string;
}

export function SelectField({ id, label, error, hint, required, optional, reserveErrorSpace, wrapperClassName, name, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} reserveErrorSpace={reserveErrorSpace} className={wrapperClassName}>
      <Select id={id} name={name ?? id} invalid={Boolean(error)} describedBy={describedBy(id, error, hint)} className="h-11" {...rest} />
    </FieldShell>
  );
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function Checkbox({ label, description, className, id, ...rest }: CheckboxProps) {
  return (
    <label htmlFor={id} className={clsx("flex min-h-11 cursor-pointer items-start gap-2.5 py-1.5 text-[14px] text-brand-dark sm:min-h-0", className)}>
      <input id={id} type="checkbox" className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[3px] accent-brand-coral" {...rest} />
      <span className="min-w-0">
        <span className="block leading-[1.35]">{label}</span>
        {description && <span className="mt-0.5 block text-[12px] text-footer-text">{description}</span>}
      </span>
    </label>
  );
}

interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "title"> {
  title: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function RadioCard({ title, description, trailing, className, checked, ...rest }: RadioCardProps) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-start gap-3 rounded-[6px] border p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-coral/30",
        checked ? "border-brand-coral bg-brand-coral/5" : "border-card-border hover:border-brand-dark",
        className,
      )}
    >
      <input type="radio" checked={checked} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-coral" {...rest} />
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold text-brand-dark">{title}</span>
        {description && <span className="mt-0.5 block text-[12px] leading-[1.45] text-footer-text">{description}</span>}
      </span>
      {trailing}
    </label>
  );
}

export function FormAlert({ tone = "error", children }: { tone?: "error" | "success" | "info"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={clsx(
        "rounded-[4px] px-3 py-2.5 text-[13px]",
        tone === "error" && "bg-brand-alert/10 text-brand-alert",
        tone === "success" && "bg-brand-link/10 text-brand-link",
        tone === "info" && "bg-brand-surface text-brand-dark",
      )}
    >
      {children}
    </p>
  );
}
