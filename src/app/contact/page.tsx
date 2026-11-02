import type { Metadata } from "next";
import { ContactView } from "@/packages/module-theme/contact/ContactView";
import { getContactPageData, getFooterData } from "@/utils/magento/cms";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  return {
    title: data?.metaTitle || data?.title || "Contact Us | BanglaShoppers",
    description: data?.metaDescription || "Call, email or visit BanglaShoppers, or send us a message. We are here to help 7 days a week.",
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const [data, footer] = await Promise.all([getContactPageData(), getFooterData()]);
  return <ContactView data={data} footer={footer} />;
}
