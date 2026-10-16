import { cache } from "react";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { CART_ID_COOKIE, CUSTOMER_FULL_NAME_COOKIE, CUSTOMER_NAME_COOKIE, CUSTOMER_TOKEN_LIFETIME_SECONDS } from "@/lib/config";

const THIRTY_DAYS = 60 * 60 * 24 * 30;
/* Same rule as next-auth's session cookie: browsers drop Secure cookies on plain-http hosts other than localhost (e.g. a LAN IP). */
const secure = process.env.NEXTAUTH_URL?.startsWith("https://") ?? process.env.NODE_ENV === "production";

/** next-auth uses the `__Secure-` name on HTTPS. */
const SESSION_COOKIES = ["__Secure-next-auth.session-token", "next-auth.session-token"];

export function authSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is not set.");
  return secret;
}

async function sessionCookie() {
  const store = await cookies();
  return SESSION_COOKIES.map((name) => store.get(name)?.value).find(Boolean) ?? null;
}

/** Magento customer token from the encrypted next-auth session; null when logged out or expired. Server only. */
export const getCustomerToken = cache(async (): Promise<string | null> => {
  const raw = await sessionCookie();
  if (!raw) return null;
  try {
    const jwt = await decode({ token: raw, secret: authSecret() });
    if (!jwt?.accessToken || (jwt.expiresAt && Date.now() > jwt.expiresAt)) return null;
    return jwt.accessToken;
  } catch {
    return null;
  }
});

/** True when a session cookie exists, even if its token has expired. */
export async function hasSessionCookie() {
  return Boolean(await sessionCookie());
}

/** Readable by the client header greeting; holds no credentials. Expires with the session, so the greeting never outlives the login. */
export async function setCustomerName(firstName: string, lastName = "") {
  const store = await cookies();
  const options = { sameSite: "lax", secure, path: "/", maxAge: CUSTOMER_TOKEN_LIFETIME_SECONDS } as const;
  store.set(CUSTOMER_NAME_COOKIE, firstName, options);
  store.set(CUSTOMER_FULL_NAME_COOKIE, `${firstName} ${lastName}`.trim(), options);
}

/** Full name for the account sidebar (no Magento call); null when signed out. */
export async function getCustomerFullName(): Promise<string | null> {
  return (await cookies()).get(CUSTOMER_FULL_NAME_COOKIE)?.value ?? null;
}

export async function clearCustomerName() {
  const store = await cookies();
  store.delete(CUSTOMER_NAME_COOKIE);
  store.delete(CUSTOMER_FULL_NAME_COOKIE);
}

/** Masked guest cart id returned by Magento `createEmptyCart`. */
export async function getGuestCartId(): Promise<string | null> {
  return (await cookies()).get(CART_ID_COOKIE)?.value ?? null;
}

export async function setGuestCartId(id: string) {
  (await cookies()).set(CART_ID_COOKIE, id, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: THIRTY_DAYS });
}

export async function clearGuestCartId() {
  (await cookies()).delete(CART_ID_COOKIE);
}
