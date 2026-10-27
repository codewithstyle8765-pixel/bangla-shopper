import { Suspense } from "react";
import clsx from "clsx";
import { getCustomer } from "@/utils/magento/customer";
import { getCustomerFullName, getSessionProfile } from "@/utils/session";

/** Social login photo when there is one, otherwise the first letter of the name. */
export function ProfileAvatar({ name, picture, className }: { name: string; picture?: string | null; className?: string }) {
  const base = clsx("grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full", className);
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

/** Avatar, name and email in one row. */
export function ProfileSummary({ name, email, picture }: { name: string; email?: string; picture?: string | null }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ProfileAvatar name={name} picture={picture} />
      <div className="min-w-0">
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

/** Name from the login cookie and email / photo from the session (instant); older sessions ask Magento once. */
async function SessionProfile() {
  const [fullName, session] = await Promise.all([getCustomerFullName(), getSessionProfile()]);
  if (fullName && session.email) return <ProfileSummary name={fullName} email={session.email} picture={session.picture} />;
  const customer = await getCustomer();
  if (!customer) return null;
  return <ProfileSummary name={`${customer.firstName} ${customer.lastName}`.trim()} email={customer.email} picture={session.picture} />;
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
