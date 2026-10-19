"use client";

import { useState } from "react";

/**
 * Social login buttons for Google and Facebook.
 * Renders an OR divider followed by side-by-side Google and Facebook buttons
 * matching the Banglashoppers design.
 */

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.361H7.332v3.209h2.747v8.196h3.318z" />
    </svg>
  );
}

/**
 * Temporary toggle: disable clicks and OAuth redirects until Magento backend APIs and
 * live OAuth credentials are configured. Set to true to re-enable.
 */
const SOCIAL_LOGIN_ENABLED = false;

interface SocialLoginButtonsProps {
  /** Optional custom redirect URL after social login. Defaults to /customer/account */
  callbackUrl?: string;
  /** Whether to show the top "OR" divider (defaults to true) */
  showDivider?: boolean;
}

export function SocialLoginButtons({ callbackUrl = "/customer/account", showDivider = true }: SocialLoginButtonsProps) {
  const [loading, setLoading] = useState<"google" | "facebook" | null>(null);

  async function handleSocialLogin(provider: "google" | "facebook") {
    if (!SOCIAL_LOGIN_ENABLED) return;
    setLoading(provider);
    try {
      const { signIn } = await import("next-auth/react");
      await signIn(provider, { callbackUrl });
    } catch {
      /* OAuth redirect will navigate away; errors are handled by NextAuth error page. */
      setLoading(null);
    }
  }

  return (
    <div className="space-y-2.5">
      {/* OR divider */}
      {showDivider && (
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#8c8c8c]" aria-hidden="true">
          <span className="h-px flex-1 bg-card-border" />
          OR
          <span className="h-px flex-1 bg-card-border" />
        </div>
      )}

      {/* Buttons side by side */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          type="button"
          disabled={!SOCIAL_LOGIN_ENABLED || loading !== null}
          onClick={SOCIAL_LOGIN_ENABLED ? () => handleSocialLogin("google") : undefined}
          title={!SOCIAL_LOGIN_ENABLED ? "Social login coming soon" : undefined}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-[#dadce0] bg-white px-2.5 text-[13px] font-semibold text-[#1a73e8] shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed sm:px-3 sm:text-[13.5px] xl:text-[14px]"
        >
          {loading === "google" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#1a73e8]" />
          ) : (
            <GoogleIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          )}
          <span className="whitespace-nowrap">
            <span className="sm:hidden">Google</span>
            <span className="hidden sm:inline">Continue with Google</span>
          </span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          disabled={!SOCIAL_LOGIN_ENABLED || loading !== null}
          onClick={SOCIAL_LOGIN_ENABLED ? () => handleSocialLogin("facebook") : undefined}
          title={!SOCIAL_LOGIN_ENABLED ? "Social login coming soon" : undefined}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-[#1877F2] px-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#166FE5] disabled:cursor-not-allowed sm:px-3 sm:text-[13.5px] xl:text-[14px]"
        >
          {loading === "facebook" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <FacebookIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          )}
          <span className="whitespace-nowrap">
            <span className="sm:hidden">Facebook</span>
            <span className="hidden sm:inline">Continue with Facebook</span>
          </span>
        </button>
      </div>
    </div>
  );
}
