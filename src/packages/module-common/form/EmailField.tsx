"use client";

import { useState, type ComponentProps } from "react";
import { TextField } from "./Field";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Email input checked when the customer leaves it, with the checkout's messages; the server's error shows otherwise. */
export function EmailField({ defaultValue, error, onBlur, onChange, ...rest }: Omit<ComponentProps<typeof TextField>, "type">) {
  const [value, setValue] = useState(String(defaultValue ?? ""));
  const [touched, setTouched] = useState(false);
  const valid = EMAIL_PATTERN.test(value.trim());
  const clientError = touched && !valid ? (value.trim() ? "Enter a valid email address." : "Email address is required.") : undefined;

  return (
    <TextField
      {...rest}
      type="email"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
      onBlur={(e) => {
        setTouched(true);
        onBlur?.(e);
      }}
      error={clientError ?? (touched && valid ? undefined : error)}
    />
  );
}

export default EmailField;
