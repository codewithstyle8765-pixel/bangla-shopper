import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/packages/module-theme/layout/header";
import { MegaMenu } from "@/packages/module-theme/layout/mega-menu";
import { Footer } from "@/packages/module-theme/layout/footer";
import { ErrorBoundary } from "@/packages/module-common/error/ErrorBoundary";
import { GlobalProviders } from "@/providers";
import { getNavigation } from "@/utils/magento/catalog";
import { getFooterData } from "@/utils/magento/cms";
import { SITE_URL } from "@/lib/config";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  /* Makes canonical and Open Graph URLs absolute on the storefront domain. */
  metadataBase: new URL(SITE_URL),
  title: "BanglaShoppers | Leading Online Beauty & Cosmetics Store in Bangladesh",
  description: "Shop 100% authentic international cosmetics, skincare, makeup, and perfumes with fast delivery across Bangladesh.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, footer] = await Promise.all([getNavigation(), getFooterData()]);

  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body className="antialiased font-sans min-h-screen bg-background text-foreground flex flex-col overflow-x-clip pb-[calc(4rem+1px+env(safe-area-inset-bottom))] lg:pb-0 has-[[data-sticky-cta]]:pb-[calc(4rem+1px+var(--sticky-cta-h)+env(safe-area-inset-bottom))] lg:has-[[data-sticky-cta=checkout]]:pb-0 lg:has-[[data-sticky-cta=pdp]]:pb-0 lg:has-[[data-sticky-cta=cart]]:pb-0">
        <ErrorBoundary>
          <GlobalProviders>
            <Header categories={categories} hotline={footer?.contact.hotline}>
              <MegaMenu categories={categories} />
            </Header>
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </GlobalProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
