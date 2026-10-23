import type { ReactNode } from "react";
import { AFFILIATE_ROOT } from "./AffiliateUi";

export interface AffiliateLink {
  href: string;
  label: string;
  short?: string;
  icon: ReactNode;
}

/** The affiliate area's own menu (Mirasvit's account sections), shown instead of the account sidebar. */
export const AFFILIATE_LINKS: AffiliateLink[] = [
  { href: AFFILIATE_ROOT, label: "Account Dashboard", short: "Dashboard", icon: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" /> },
  {
    href: `${AFFILIATE_ROOT}/promotion`,
    label: "Promotion Materials",
    short: "Promotion",
    icon: <path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6M7 15l1.5 5" />,
  },
  { href: `${AFFILIATE_ROOT}/transactions`, label: "Transactions", icon: <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" /> },
  {
    href: `${AFFILIATE_ROOT}/withdrawals`,
    label: "Withdrawals",
    icon: (
      <>
        <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4h-12A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
        <path d="M3 6.5A2.5 2.5 0 0 0 5.5 9H20v6h-4.5a3 3 0 0 1 0-6" />
      </>
    ),
  },
  { href: `${AFFILIATE_ROOT}/statistics`, label: "Statistics", icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  {
    href: `${AFFILIATE_ROOT}/settings`,
    label: "Settings",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </>
    ),
  },
];
