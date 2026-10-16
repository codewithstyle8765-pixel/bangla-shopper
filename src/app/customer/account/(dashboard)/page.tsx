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
import { countryName, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "My Dashboard | BanglaShoppers", robots: { index: false } };

async function DashboardPageContent() {
  const [customer, orders, wishlist, countries, rewards] = await Promise.all([
    getCustomer(),
    getOrders(),
    getWishlist(),
    getCountries(),
    getRewardPoints().catch(() => null),
  ]);
  if (!customer) return null;
  const defaultAddress = customer.addresses.find((a) => a.isDefaultShipping) ?? customer.addresses[0];

  const stats = [
    { label: "Total Orders", value: String(orders.length), href: "/customer/account/orders" },
    { label: "Wishlist Items", value: String(wishlist.items.length), href: "/customer/account/wishlist" },
  ];

  return (
    <>
      <PageTitle
        description={
          <>
            Hello, <strong className="text-brand-dark">{customer.firstName}</strong>! From here you can track orders, manage addresses and update your account.
          </>
        }
      >
        My Dashboard
      </PageTitle>

      <ul className={rewards ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "grid grid-cols-2 gap-3"}>
        {stats.map((s) => (
          <li key={s.label}>
            <Link href={s.href} className="block h-full rounded-[6px] border border-card-border bg-white p-3 transition-colors hover:border-brand-coral sm:p-4">
              <span className="block text-[20px] font-bold text-brand-coral sm:text-[24px]">{s.value}</span>
              <span className="mt-0.5 block text-[12px] text-footer-text sm:text-[13px]">{s.label}</span>
            </Link>
          </li>
        ))}
        {rewards && (
          <li className="col-span-2 sm:col-span-1">
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

      <AccountHub />

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
