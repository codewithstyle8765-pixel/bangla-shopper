import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/packages/module-customer/AuthShell";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { ForgotPasswordForm } from "@/packages/module-customer/AuthForms";

export const metadata: Metadata = { title: "Forgot Your Password? | BanglaShoppers", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Forgot Password" }]} structuredData={false} />
      <AuthShell
        title="Forgot Password"
        subtitle="Enter the email address linked to your account and we'll send you a link to reset your password."
      >
        <ForgotPasswordForm />
        <Link href="/customer/account/login" className="mt-5 block text-center text-[14px] font-semibold text-brand-link hover:underline">
          ‹ Back to Sign In
        </Link>
      </AuthShell>
    </Container>
  );
}
