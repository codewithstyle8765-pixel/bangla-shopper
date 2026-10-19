import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { CUSTOMER_TOKEN_LIFETIME_SECONDS } from "@/lib/config";
import * as customerApi from "@/utils/magento/customer";
import { authSecret } from "@/utils/session";

/**
 * Email/password login against Magento. The Magento token stays inside the encrypted
 * session cookie; the client-visible session only carries name and email.
 *
 * Google and Facebook providers are configured but require:
 * 1. Real OAuth credentials in GOOGLE_CLIENT_ID/SECRET and FACEBOOK_CLIENT_ID/SECRET
 * 2. A Magento social login extension to exchange the social token for a Magento customer token
 *
 * TODO: When Magento social login API is available, call customerApi.socialLogin()
 *       inside the jwt callback to obtain a real Magento token.
 */
export const authOptions: NextAuthOptions = {
  secret: authSecret(),
  session: { strategy: "jwt", maxAge: CUSTOMER_TOKEN_LIFETIME_SECONDS },
  pages: { signIn: "/customer/account/login", error: "/customer/account/login" },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        const email = credentials?.email?.trim() ?? "";
        const password = credentials?.password ?? "";
        if (!email || !password) throw new Error("Email and password are required.");
        const customer = await customerApi.login(email, password);
        return { id: customer.email, email: customer.email, name: customer.firstName, accessToken: customer.token };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      if (user && account) {
        if (account.provider === "credentials") {
          /* Standard email/password login — Magento token is already available. */
          token.accessToken = user.accessToken;
          token.expiresAt = Date.now() + CUSTOMER_TOKEN_LIFETIME_SECONDS * 1000;
          token.provider = "credentials";
        } else if (account.provider === "google" || account.provider === "facebook") {
          /*
           * Social login — store the provider and OAuth access token.
           *
           * TODO: When Magento social login extension is installed, uncomment:
           *   const magento = await customerApi.socialLogin(account.provider, account.access_token);
           *   token.accessToken = magento.token;
           *   token.expiresAt = Date.now() + CUSTOMER_TOKEN_LIFETIME_SECONDS * 1000;
           *
           * For now, the session is created (name + email visible) but has no Magento
           * token, so authenticated Magento operations will not work.
           */
          token.provider = account.provider;
          token.socialToken = account.access_token ?? undefined;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user = { name: token.name, email: token.email };
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      /* Only revoke Magento tokens (social-only sessions have no Magento token). */
      if (token?.provider === "credentials" || token?.accessToken) {
        await customerApi.revokeToken(token?.accessToken);
      }
    },
  },
};

