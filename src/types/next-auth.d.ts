import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    /** Epoch ms when the Magento token expires. */
    expiresAt?: number;
    /** OAuth provider used to sign in (undefined for credentials). */
    provider?: "credentials" | "google" | "facebook";
    /** Social OAuth access token — used to exchange for a Magento token when the backend API is available. */
    socialToken?: string;
  }
}
