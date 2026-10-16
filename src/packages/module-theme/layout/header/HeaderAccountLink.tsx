"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "@/packages/module-common/icons/UiIcons";
import { useCustomerName } from "@/packages/module-customer/session";
import { AccountMenu } from "./AccountMenu";

/** Desktop header account link; below lg the bottom bar has Account. */
function AccountLinkView({ name }: { name: string | null | undefined }) {
  const href = name ? "/customer/account" : "/customer/account/login";

  return (
    <div className="flex items-start shrink-0 ml-[12px] xl:ml-auto">
      <Link prefetch={false} href={href} aria-label={name ? "My account" : "Login"} className="shrink-0 hover:opacity-90">
        <UserIcon className="w-[20px] h-[24px] mt-[11px] mr-[10px] block text-brand-black" />
      </Link>
      <div className={`w-[110px] text-[14px] leading-[1.2] text-brand-black font-normal ${name === undefined ? "invisible" : ""}`}>
        {name ? (
          <AccountMenu name={name} />
        ) : (
          <>
            <span className="block">Hello Guest!</span>
            <span className="block">
              <Link prefetch={false} href="/customer/account/login" className="hover:text-brand-coral">
                Login
              </Link>
              {" / "}
              <Link prefetch={false} href="/customer/account/create" className="hover:text-brand-coral">
                Register
              </Link>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/** Re-read the name cookie after navigation (login/logout redirects). */
function CookieAccountLink() {
  return <AccountLinkView name={useCustomerName(usePathname())} />;
}

export function HeaderAccountLink() {
  return (
    <Suspense fallback={<AccountLinkView name={undefined} />}>
      <CookieAccountLink />
    </Suspense>
  );
}

export default HeaderAccountLink;
