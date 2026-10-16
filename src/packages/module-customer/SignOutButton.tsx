"use client";

import { useState } from "react";
import clsx from "clsx";
import { signOutCustomer } from "@/packages/module-customer/session";

/** Full-width Sign Out (dashboard on phones/tablets, where the account nav is a dropdown). */
export function SignOutButton({ className }: { className?: string }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void signOutCustomer();
      }}
      className={clsx(
        "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] border-2 border-brand-alert text-[14px] font-semibold text-brand-alert transition-colors hover:bg-brand-alert hover:text-white disabled:cursor-wait disabled:opacity-60",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H4" />
      </svg>
      {pending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

export default SignOutButton;
