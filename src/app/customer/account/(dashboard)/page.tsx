import { Suspense } from "react";
import { DashboardSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import Link from "next/link";
import { AccountSection, AddressBlock, OrdersTable } from "@/packages/module-customer/AccountUi";
import { getCustomer, getOrders, getRewardPoints, getWishlist } from "@/utils/magento/customer";
import { formatTk } from "@/utils/format";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
import { SignOutButton } from "@/packages/module-customer/SignOutButton";
import { AccountHub } from "@/packages/module-customer/AccountHub";
import { AccountHelp } from "@/packages/module-customer/AccountHelp";
import { ProfileSummary } from "@/packages/module-customer/AccountProfile";
import { getFooterData } from "@/utils/magento/cms";
import { getRewardTier } from "@/utils/magento/rewards";
import { getSessionProfile } from "@/utils/session";
import { countryName, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "My Dashboard | BanglaShoppers", robots: { index: false } };

async function DashboardPageContent() {
  const [customer, orders, wishlist, countries, rewards, footer, session, tier] = await Promise.all([
    getCustomer(),
    getOrders(),
    getWishlist(),
    getCountries(),
    getRewardPoints().catch(() => null),
    getFooterData(),
    getSessionProfile(),
    getRewardTier(),
  ]);
  if (!customer) return null;
  const defaultAddress = customer.addresses.find((a) => a.isDefaultShipping) ?? customer.addresses[0];

  const stats = [
    { label: "Total Orders", value: String(orders.length), href: "/customer/account/orders" },
    { label: "Wishlist Items", value: String(wishlist.items.length), href: "/customer/account/wishlist" },
  ];

  return (
    <>
      {/* Below lg the profile card replaces the greeting. */}
      <PageTitle
        className="max-lg:[&_h1+div]:hidden"
        description={
          <>
            Hello, <strong className="text-brand-dark">{customer.firstName}</strong>! From here you can track orders, manage addresses and update your account.
          </>
        }
      >
        My Dashboard
      </PageTitle>

      <section aria-label="Your profile" className="overflow-hidden rounded-[6px] border border-card-border bg-white lg:hidden">
        <div className="flex items-center justify-between gap-3 p-4">
          <ProfileSummary name={`${customer.firstName} ${customer.lastName}`.trim()} email={customer.email} picture={session.picture} tier={tier.current} />
          <Link
            href="/customer/account/edit"
            aria-label="Edit account information"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-card-border text-brand-dark transition-colors hover:border-brand-coral hover:text-brand-coral"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4" />
            </svg>
          </Link>
        </div>
        {rewards && (
          <Link
            href="/customer/account/rewards"
            className="group flex items-center justify-between gap-3 border-t border-card-border px-4 py-3 transition-colors hover:bg-brand-coral/5"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <RewardCoin className="h-8 w-8 shrink-0" />
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold leading-[1.3] text-brand-dark">Reward Points</span>
                <span className="block text-[12px] leading-[1.4] text-footer-text">
                  Worth {formatTk(rewards.balanceValue, false)}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[14px] font-bold text-brand-coral">
              {rewards.balance.toLocaleString("en-US")} points
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </span>
          </Link>
        )}
      </section>

      <ul className={rewards ? "grid grid-cols-3 gap-3 max-lg:hidden" : "grid grid-cols-2 gap-3 max-lg:hidden"}>
        {stats.map((s) => (
          <li key={s.label}>
            <Link href={s.href} className="flex h-full flex-col items-center justify-center rounded-[6px] border border-card-border bg-white p-3 text-center transition-colors hover:border-brand-coral sm:p-4">
              <span className="block text-[20px] font-bold text-brand-coral sm:text-[24px]">{s.value}</span>
              <span className="mt-0.5 block text-[12px] text-footer-text sm:text-[13px]">{s.label}</span>
            </Link>
          </li>
        ))}
        {rewards && (
          <li>
            <Link
              href="/customer/account/rewards"
              className="flex h-full items-center gap-3 rounded-[6px] border border-card-border bg-white p-3 transition-colors hover:border-brand-coral sm:p-4"
            >
              <RewardCoin className="h-9 w-9 sm:h-10 sm:w-10" />
              <span className="min-w-0">
                <span className="block text-[20px] font-bold text-brand-coral sm:text-[24px]">{rewards.balance.toLocaleString("en-US")}</span>
                <span className="mt-0.5 block text-[12px] text-footer-text sm:text-[13px]">
                  Reward Points<span className="md:max-lg:hidden"> · worth {formatTk(rewards.balanceValue, false)}</span>
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>

      <AccountHub counts={{ "/customer/account/orders": orders.length, "/customer/account/wishlist": wishlist.items.length }} />

      <AccountSection
        title="Recent Orders"
        action={
          <Link href="/customer/account/orders" className="text-[13px] font-semibold text-brand-link hover:underline">
            View all
          </Link>
        }
      >
        <OrdersTable orders={orders.slice(0, 3)} />
      </AccountSection>

      <div className="grid gap-5 md:grid-cols-2">
        <AccountSection
          title="Contact Information"
          className="max-sm:hidden"
          action={
            <Link href="/customer/account/edit" className="text-[13px] font-semibold text-brand-link hover:underline">
              Edit
            </Link>
          }
        >
          <p className="text-[14px] leading-[1.6] text-footer-text">
            <span className="font-semibold text-brand-dark">
              {customer.firstName} {customer.lastName}
            </span>
            <br />
            {customer.email}
            <br />
            Newsletter: {customer.isSubscribed ? "Subscribed" : "Not subscribed"}
          </p>
        </AccountSection>

        <AccountSection
          title="Default Address"
          action={
            <Link href="/customer/account/addresses" className="text-[13px] font-semibold text-brand-link hover:underline">
              Manage
            </Link>
          }
        >
          {defaultAddress ? (
            <AddressBlock address={defaultAddress} countryName={countryName(countries, defaultAddress.countryCode)} />
          ) : (
            <p className="text-[14px] text-footer-text">You have not set a default address.</p>
          )}
        </AccountSection>
      </div>

      <AccountHelp footer={footer} />

      <SignOutButton className="lg:hidden" />
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  );
}
