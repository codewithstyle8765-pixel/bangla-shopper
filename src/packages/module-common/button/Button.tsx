import React from "react";
import clsx from "clsx";
import LoadingDots from "@/packages/module-common/icons/LoadingDots";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "unstyled";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  className = "",
  title,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  ...rest
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-brand-coral text-white hover:bg-brand-coral-hover active:bg-brand-coral-active",
    secondary: "bg-brand-black text-white hover:bg-neutral-800 active:bg-neutral-900",
    outline: "border-2 border-brand-black text-brand-black bg-transparent hover:bg-brand-black/5",
    ghost: "text-brand-charcoal bg-transparent hover:bg-brand-black/5",
    unstyled: "",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm font-semibold rounded-xl",
    lg: "px-6 py-3.5 text-base font-semibold rounded-2xl",
    icon: "p-0",
  };

  const buttonClasses = clsx(
    "relative inline-flex items-center justify-center font-sans tracking-wide transition-colors duration-200 cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral",
    variantStyles[variant],
    sizeStyles[size],
    {
      "opacity-60 cursor-not-allowed pointer-events-none": disabled,
      "cursor-wait opacity-80": loading,
    },
    className,
  );

  const content = children ?? title;

  return (
    <button
      aria-disabled={loading || disabled}
      aria-label={typeof content === "string" ? content : title}
      className={buttonClasses}
      disabled={loading || disabled}
      type={type}
      {...rest}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          size === "icon" ? "w-full h-full relative" : "gap-2"
        )}
      >
        {loading ? (
          <>
            <LoadingDots className="bg-current" />
            <span>Loading...</span>
          </>
        ) : (
          content
        )}
      </div>
    </button>
  );
}

export default Button;
