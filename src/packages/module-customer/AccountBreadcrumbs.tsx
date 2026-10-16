"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/packages/module-common/Breadcrumbs";

const ROOT = "/customer/account";

const LABELS: Record<string, string> = {
  orders: "My Orders",
  wishlist: "My Wishlist",
  addresses: "Address Book",
  edit: "Account Information",
  downloadable: "My Downloadable Products",
  "payment-methods": "Stored Payment Methods",
  reviews: "My Product Reviews",
  newsletter: "Newsletter Subscriptions",
  rewards: "My Reward Points",
  new: "Add New Address",
};

function trailFor(pathname: string): BreadcrumbItem[] {
  const segments = pathname.replace(ROOT, "").split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "My Account", href: ROOT },
  ];
  let href = ROOT;
  segments.forEach((segment, i) => {
    href += `/${segment}`;
    const prev = segments[i - 1];
    if (prev === "orders") items.push({ label: `Order #${segment}`, href });
    else if (prev === "addresses" && segment !== "new") return;
    else if (segment === "edit" && prev && prev !== "account") items.push({ label: "Edit Address", href });
    else items.push({ label: LABELS[segment] ?? segment, href });
  });
  return items;
}

export function AccountBreadcrumbs() {
  return <Breadcrumbs items={trailFor(usePathname())} structuredData={false} />;
}

export default AccountBreadcrumbs;
