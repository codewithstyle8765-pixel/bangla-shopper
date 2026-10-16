import type { Metadata } from "next";
import { ContactView } from "@/packages/module-theme/contact/ContactView";
import { getFooterData } from "@/utils/magento/cms";

export const metadata: Metadata = {
  title: "Contact Us | BanglaShoppers",
  description: "Call, email or visit BanglaShoppers, or send us a message. We are here to help 7 days a week.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 3600;

export default async function ContactPage() {
  return <ContactView footer={await getFooterData()} />;
}
