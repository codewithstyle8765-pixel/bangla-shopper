import { Suspense } from "react";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import type { RewardTier } from "@/types/storefront";
import { getCustomer } from "@/utils/magento/customer";
import { getRewardTier } from "@/utils/magento/rewards";
import { getCustomerFullName, getSessionProfile } from "@/utils/session";

/** Membership tier badge, else the social login photo, else the first letter of the name. */
export function ProfileAvatar({ name, picture, tier, className }: { name: string; picture?: string | null; tier?: RewardTier | null; className?: string }) {
  const base = clsx("grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full", className);
  if (tier?.logo) {
    return <NextImage src={tier.logo} alt={tier.name} width={96} height={96} className={clsx(base, "object-contain")} />;
  }
  if (picture) {
    // eslint-disable-next-line @next/next/no-img-element -- Google / Facebook photo URLs, not optimisable local assets.
    return <img src={picture} alt="" referrerPolicy="no-referrer" className={clsx(base, "object-cover")} />;
  }
  return (
    <span aria-hidden="true" className={clsx(base, "bg-brand-navy text-[20px] font-bold uppercase text-white")}>
      {name.trim().charAt(0) || "?"}
    </span>
  );
}

/** Avatar, tier, name and email in one row. */
export function ProfileSummary({ name, email, picture, tier }: { name: string; email?: string; picture?: string | null; tier?: RewardTier | null }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ProfileAvatar name={name} picture={picture} tier={tier} />
      <div className="min-w-0">
        {tier && <p className="text-[11px] font-bold uppercase leading-[1.3] tracking-[0.1em] text-brand-coral">{tier.name}</p>}
        <p className="truncate text-[16px] font-bold leading-[1.3] text-brand-dark">{name}</p>
        {/* A long email breaks after the "@" rather than mid-word. */}
        {email && (
          <p className="text-[13px] leading-[1.4] text-footer-text [overflow-wrap:anywhere]">
            {email.split("@")[0]}
            {email.includes("@") && (
              <>
                @<wbr />
                {email.slice(email.indexOf("@") + 1)}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

/** Name from the login cookie, email / photo from the session, tier from Mirasvit; older sessions ask Magento for the name. */
async function SessionProfile() {
  const [fullName, session, { current: tier }] = await Promise.all([getCustomerFullName(), getSessionProfile(), getRewardTier()]);
  if (fullName && session.email) return <ProfileSummary name={fullName} email={session.email} picture={session.picture} tier={tier} />;
  const customer = await getCustomer();
  if (!customer) return null;
  return <ProfileSummary name={`${customer.firstName} ${customer.lastName}`.trim()} email={customer.email} picture={session.picture} tier={tier} />;
}

function ProfileSkeleton() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3">
      <span className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-surface-gray" />
      <span className="flex-1 space-y-2">
        <span className="block h-4 w-3/4 animate-pulse rounded bg-surface-gray" />
        <span className="block h-3 w-full animate-pulse rounded bg-surface-gray" />
      </span>
    </div>
  );
}

/** Sidebar profile, streamed so the links render at once. */
export function AccountProfile() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <SessionProfile />
    </Suspense>
  );
}
