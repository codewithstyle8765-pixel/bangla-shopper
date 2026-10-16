import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { CUSTOMER_TOKEN_LIFETIME_SECONDS } from "@/lib/config";
import * as customerApi from "@/utils/magento/customer";
import { authSecret } from "@/utils/session";

/**
 * Email/password login against Magento. The Magento token stays inside the encrypted
 * session cookie; the client-visible session only carries name and email.
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
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expiresAt = Date.now() + CUSTOMER_TOKEN_LIFETIME_SECONDS * 1000;
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
      await customerApi.revokeToken(token?.accessToken);
    },
  },
};
