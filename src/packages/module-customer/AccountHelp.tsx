import type { ReactNode } from "react";
import Link from "next/link";
import { SUPPORT_CONTACT } from "@/lib/config";
import type { FooterData } from "@/types/storefront";
import { AccountSection } from "./AccountUi";

/** "01879 222 444" → "8801879222444" (Bangladesh, for wa.me). */
const internationalBd = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("880") ? digits : `88${digits}`;
};

interface HelpChannel {
  title: string;
  text: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
}

/** Dashboard: the ways to reach customer care. */
export function AccountHelp({ footer }: { footer: FooterData | null }) {
  const hotline = footer?.contact.hotline || SUPPORT_CONTACT.hotline;
  const facebook = footer?.social.find((s) => s.network === "facebook")?.href || SUPPORT_CONTACT.facebook;
  const channels: HelpChannel[] = [
    {
      title: "Submit a Support Request",
      text: "Need help? Send us your questions or concerns.",
      href: "/contact",
      icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />,
    },
    {
      title: "Chat on WhatsApp",
      text: "Get quick assistance from our support team.",
      href: `https://wa.me/${internationalBd(SUPPORT_CONTACT.whatsapp)}`,
      external: true,
      icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01" />,
    },
    {
      title: "Message Us on Facebook",
      text: "Connect with us directly on Messenger.",
      href: facebook,
      external: true,
      icon: <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8.8v3h2.6V21" />,
    },
    {
      title: "Call Customer Care",
      text: hotline,
      href: `tel:${hotline.replace(/\s+/g, "")}`,
      icon: <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />,
    },
  ];

  return (
    <AccountSection title="Need Help? We're Here for You!">
      <p className="-mt-2 mb-4 text-[13px] text-footer-text">Our customer care team is ready to assist you.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {channels.map((channel) => (
          <li key={channel.title}>
            <Link
              href={channel.href}
              {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex h-full min-h-[64px] items-center gap-3 rounded-[6px] border border-card-border bg-white p-3 transition-colors hover:border-brand-coral"
            >
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  {channel.icon}
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold leading-[1.3] text-brand-dark transition-colors group-hover:text-brand-coral">{channel.title}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.4] text-footer-text">{channel.text}</span>
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-footer-text transition-colors group-hover:text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </AccountSection>
  );
}

export default AccountHelp;
