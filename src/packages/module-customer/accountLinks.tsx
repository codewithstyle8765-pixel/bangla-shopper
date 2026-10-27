import type { ReactNode } from "react";

export interface AccountLink {
  href: string;
  label: string;
  /** Hub tile label (phones/tablets), where the sidebar wording is too long. */
  short?: string;
  /** Hub tile label on phones only. */
  phone?: string;
  exact?: boolean;
  icon?: ReactNode;
}

const DASHBOARD = "/customer/account";

/** Sidebar order (desktop) — matches mobile hub order. */
export const ACCOUNT_LINKS: AccountLink[] = [
  { href: DASHBOARD, label: "My Dashboard", exact: true },
  {
    href: "/customer/account/orders",
    label: "My Orders",
    phone: "Orders",
    icon: <path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />,
  },
  {
    href: "/customer/account/wishlist",
    label: "My Wishlist",
    phone: "Wishlist",
    icon: <path d="M12 20s-7-4.4-9.3-8.7A5.2 5.2 0 0 1 12 6.4a5.2 5.2 0 0 1 9.3 4.9C19 15.6 12 20 12 20z" />,
  },
  {
    href: "/customer/account/addresses",
    label: "Address Book",
    icon: (
      <>
        <path d="M19 10c0 5.5-7 11-7 11s-7-5.5-7-11a7 7 0 0 1 14 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    href: "/customer/account/edit",
    label: "Account Information",
    short: "Account Info",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  },
  {
    href: "/customer/account/rewards",
    label: "My Reward Points",
    short: "Reward Points",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
      </>
    ),
  },
  {
    href: "/customer/account/reviews",
    label: "My Product Reviews",
    short: "My Reviews",
    icon: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  },
  {
    href: "/customer/account/payment-methods",
    label: "Stored Payment Methods",
    short: "Payment Methods",
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19M6.5 15h4" />
      </>
    ),
  },
  {
    href: "/customer/account/newsletter",
    label: "Newsletter Subscriptions",
    short: "Newsletter",
    icon: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m21.5 6.5-9.5 7-9.5-7" />
      </>
    ),
  },
  {
    href: "/customer/account/downloadable",
    label: "My Downloadable Products",
    short: "Downloads",
    icon: <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />,
  },
  {
    href: "/customer/account/affiliate",
    label: "Affiliate Program",
    short: "Affiliate",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
      </>
    ),
  },
];

/** Hub tile order (phones/tablets): the sections customers open most come first. */
export const HUB_ORDER = [
  "/customer/account/orders",
  "/customer/account/wishlist",
  "/customer/account/addresses",
  "/customer/account/edit",
  "/customer/account/rewards",
  "/customer/account/reviews",
  "/customer/account/payment-methods",
  "/customer/account/newsletter",
  "/customer/account/downloadable",
  "/customer/account/affiliate",
];

export const isDashboard = (pathname: string) => pathname === DASHBOARD;

/** Phones/tablets back link: a section page goes back to the hub, a page inside a section to that section. */
export function backLinkFor(pathname: string): { href: string; label: string } {
  const section = ACCOUNT_LINKS.find((l) => !l.exact && pathname.startsWith(`${l.href}/`));
  return section ? { href: section.href, label: section.label } : { href: DASHBOARD, label: "My Account" };
}
