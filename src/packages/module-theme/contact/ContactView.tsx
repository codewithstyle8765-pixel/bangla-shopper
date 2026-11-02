import Link from "next/link";
import type { ComponentType } from "react";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { PageTitle } from "@/packages/module-common/PageTitle";
import type { ContactPageData, FooterData } from "@/types/storefront";
import { ArrowRightIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, SocialIcon } from "../layout/footer/FooterIcons";
import { ContactForm } from "./ContactForm";

const SOCIAL_BG: Partial<Record<string, string>> = {
  facebook: "bg-(--color-social-facebook)",
  youtube: "bg-(--color-social-youtube)",
  twitter: "bg-(--color-social-twitter)",
  instagram: "bg-(--color-social-instagram)",
  linkedin: "bg-(--color-social-linkedin)",
  tiktok: "bg-brand-black",
  pinterest: "bg-(--color-brand-coral)",
};

interface InfoCard {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  action?: { label: string; href: string; external?: boolean };
}

/** Contact Us: ways to reach the store, the "Write to Us" form and the map (from Magento query contactPage). */
export function ContactView({ data, footer }: { data?: ContactPageData | null; footer: FooterData | null }) {
  const hotline = data?.contactCards?.hotline || footer?.contact?.hotline || "";
  const email = data?.contactCards?.email || footer?.contact?.email || "";
  const address = data?.contactCards?.address || footer?.contact?.address || "";
  const hours = data?.contactCards?.hours || footer?.contact?.hours || "";
  const whatsapp = data?.contactCards?.whatsapp;
  const mapEmbed = data?.mapEmbedUrl || footer?.contact?.mapEmbed;
  const social = data?.social?.length ? data.social : (footer?.social ?? []);
  const pageTitle = data?.title || "Contact Us";
  const pageSubtitle = data?.subtitle || "We’re here to help 7 days a week. Call, email, visit us or send a message and our team will get back to you.";
  const formTitle = data?.formTitle || "Write to Us";
  const formSubtitle = data?.formSubtitle ?? "Questions about an order, a product or a store? Send us a message.";
  const ctaLabel = data?.showroomCtaLabel || "Visit our showrooms";
  const ctaLink = data?.showroomCtaLink || "/locations";

  const cards: InfoCard[] = [];
  if (hotline) {
    cards.push({ icon: PhoneIcon, label: "Call us", value: hotline, action: { label: "Call now", href: `tel:${hotline.replace(/\s+/g, "")}` } });
  }
  if (email) {
    cards.push({ icon: MailIcon, label: "Email us", value: email, action: { label: "Send an email", href: `mailto:${email}` } });
  }
  if (whatsapp) {
    cards.push({ icon: PhoneIcon, label: "WhatsApp", value: whatsapp, action: { label: "Chat on WhatsApp", href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`, external: true } });
  }
  if (address) {
    cards.push({
      icon: PinIcon,
      label: "Visit us",
      value: address,
      action: { label: "Get directions", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Bangla Shoppers, ${address}`)}`, external: true },
    });
  }
  if (hours) {
    cards.push({ icon: ClockIcon, label: "Opening hours", value: hours, action: { label: ctaLabel, href: ctaLink } });
  }

  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: pageTitle }]} />
      <PageTitle className="mb-4" description={pageSubtitle || undefined}>
        {pageTitle}
      </PageTitle>

      {cards.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          {cards.map(({ icon: Icon, label, value, action }) => (
            <li key={label} className="flex gap-3.5 rounded-[8px] border border-card-border bg-white p-4 transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-coral/8 text-brand-coral">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-footer-text">{label}</p>
                <p className="mt-1 break-words text-[15px] font-semibold leading-[1.4] text-brand-dark [overflow-wrap:anywhere]">{value}</p>
                {action && (
                  <a
                    href={action.href}
                    {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-coral"
                  >
                    {action.label}
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6">
        <section aria-labelledby="write-to-us" className="rounded-[8px] border border-card-border bg-white p-4 sm:p-6">
          <h2 id="write-to-us" className="text-[20px] font-bold text-brand-dark">
            {formTitle}
          </h2>
          {formSubtitle && <p className="mb-5 mt-1 text-[14px] leading-[1.5] text-footer-text">{formSubtitle}</p>}
          <ContactForm />
        </section>

        <div className="flex flex-col gap-4 lg:gap-6">
          {mapEmbed && (
            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[8px] border border-card-border bg-brand-surface sm:min-h-[340px]">
              <iframe
                src={mapEmbed}
                title="BanglaShoppers on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          )}
          <div className="flex flex-col gap-4 rounded-[8px] border border-card-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            {social.length ? (
              <div>
                <p className="text-[14px] font-semibold text-brand-dark">Follow us</p>
                <ul className="mt-2.5 flex gap-2.5">
                  {social.map(({ network, href }) => (
                    <li key={network}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={network}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-85 ${SOCIAL_BG[network] ?? "bg-brand-dark"}`}
                      >
                        <SocialIcon network={network as any} className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link
              href={ctaLink}
              className="flex h-11 items-center justify-center gap-2 rounded-[4px] border-2 border-brand-dark px-5 text-[14px] font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
            >
              {ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ContactView;
