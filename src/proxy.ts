import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { CUSTOMER_FULL_NAME_COOKIE, CUSTOMER_NAME_COOKIE } from "@/lib/config";

const AUTH_PAGES = ["/customer/account/login", "/customer/account/create", "/customer/account/forgot-password"];

/** Only same-site paths are followed after login. */
const safePath = (target: string | null) => (target && target.startsWith("/") && !target.startsWith("//") ? target : "/customer/account");

/** Fast cookie check only; the account layout still verifies the token with Magento. */
export async function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const loggedIn = Boolean(session?.accessToken && (!session.expiresAt || Date.now() < session.expiresAt));

  /* A signed-out visitor must not keep the "Hello <name>" greeting from an expired session. */
  const signedOut = (response: NextResponse) => {
    for (const name of [CUSTOMER_NAME_COOKIE, CUSTOMER_FULL_NAME_COOKIE]) if (request.cookies.has(name)) response.cookies.delete(name);
    return response;
  };

  if (AUTH_PAGES.includes(pathname)) {
    if (loggedIn && !searchParams.has("expired")) return NextResponse.redirect(new URL(safePath(searchParams.get("redirect")), request.url));
    return loggedIn ? NextResponse.next() : signedOut(NextResponse.next());
  }

  if (!loggedIn) {
    const login = new URL("/customer/account/login", request.url);
    login.searchParams.set("redirect", pathname + search);
    if (session) login.searchParams.set("expired", "1");
    return signedOut(NextResponse.redirect(login));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/account/:path*"],
};
