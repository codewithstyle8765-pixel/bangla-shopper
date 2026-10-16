"use client";

import { useEffect, useState } from "react";
import { CUSTOMER_NAME_COOKIE } from "@/lib/config";

/**
 * Customer first name from the readable name cookie; null for guests, undefined until the cookie has been read
 * (so a signed-in customer never sees the guest greeting first). Re-read whenever `refreshKey` changes.
 */
export function useCustomerName(refreshKey?: unknown): string | null | undefined {
  const [name, setName] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${CUSTOMER_NAME_COOKIE}=`));
    setName(match ? decodeURIComponent(match.slice(CUSTOMER_NAME_COOKIE.length + 1)) : null);
  }, [refreshKey]);
  return name;
}

/**
 * Link target for an account page: guests go straight to login (with `redirect`), customers straight to the page.
 * The proxy then never has to redirect a client navigation or prefetch, which breaks the RSC stream in dev
 * ("Cannot close a CLOSED writable stream", "reading 'enqueueModel'").
 */
export function useAuthHref(path: string, guestPath?: string): string {
  const name = useCustomerName();
  if (name === null) return guestPath ?? `/customer/account/login?redirect=${encodeURIComponent(path)}`;
  return path;
}

/**
 * next-auth is loaded on click; its signOut event revokes the Magento token. No next-auth redirect (it would
 * point at NEXTAUTH_URL's host): a full load of this host's home page also drops cached account data.
 */
export async function signOutCustomer() {
  const { signOut } = await import("next-auth/react");
  await signOut({ redirect: false });
  window.location.assign("/");
}
