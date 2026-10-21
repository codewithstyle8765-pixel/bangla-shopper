import Link from "next/link";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import { getFooterData } from "@/utils/magento/cms";
import { BackToTop, FooterTopButton } from "./BackToTop";
import { HighlightIcon, MailIcon, MailSolidIcon, PhoneIcon, SocialIcon } from "./FooterIcons";
import { FooterNavSections } from "./FooterNavSections";
import { NewsletterForm } from "./NewsletterForm";

/** Newsletter band, contact beside the link columns, promise row, app + payment row, copyright bar. */
export async function Footer() {
  const data = await getFooterData();
  if (!data) return null;
  const { contact } = data;

  const socialList = [
    ...data.social,
    ...(!data.social.some((s) => s.network === "tiktok") ? [{ network: "tiktok" as const, href: "https://www.tiktok.com/@banglashoppers" }] : []),
    ...(!data.social.some((s) => s.network === "pinterest") ? [{ network: "pinterest" as const, href: "https://www.pinterest.com/banglashoppers" }] : []),
  ];

  return (
    <footer className="mt-4 bg-white font-sans text-[14px] text-footer-text">
      <section aria-label="Newsletter" className="relative overflow-hidden bg-neutral-50 py-5 lg:py-6">
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-brand-coral/14" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-32 h-44 w-44 rounded-full bg-brand-coral/14 max-lg:hidden" />
        <Container className="relative flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Mobile contact items (Above newsletter on sm/mobile devices < md) */}
          <div className="flex items-center justify-between gap-2 min-[360px]:gap-3 md:hidden">
            <a
              href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
              className="flex shrink-0 items-center gap-2 sm:gap-2.5"
            >
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <span className="block truncate text-[12px] font-bold text-brand-dark sm:text-[13px]">{contact.hotline}</span>
                <span className="block truncate text-[10.5px] text-footer-text sm:text-[11px]">Call us for any query</span>
              </div>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex min-w-0 items-center gap-2 sm:gap-2.5"
            >
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                <MailIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <span className="block truncate text-[11px] font-bold text-brand-dark min-[370px]:text-[12px] sm:text-[13px]">{contact.email}</span>
                <span className="block truncate text-[10.5px] text-footer-text sm:text-[11px]">We're here to help</span>
              </div>
            </a>
          </div>

          {/* Newsletter Title Row (With md-only contacts on the right on md devices) */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:shrink-0 lg:border-r lg:border-card-border lg:pr-10">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-brand-coral/8 text-brand-coral">
                <MailSolidIcon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-[17px] font-bold leading-tight text-brand-dark sm:text-[19px]">{data.newsletterTitle}</h2>
                <p className="mt-1 text-[13px] sm:text-[14px]">{data.newsletterText}</p>
              </div>
            </div>

            {/* Tablet-only contacts (To the right of the title on md devices 768px-1023px) */}
            <div className="hidden md:flex lg:hidden items-center gap-6 shrink-0 justify-end">
              <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 group">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <div>
                  <span className="block whitespace-nowrap text-[13px] font-bold text-brand-dark transition-colors group-hover:text-brand-coral">{contact.hotline}</span>
                  <span className="block whitespace-nowrap text-[11px] text-footer-text">Call us for any query</span>
                </div>
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 group">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                  <MailIcon className="h-4 w-4" />
                </span>
                <div>
                  <span className="block whitespace-nowrap text-[13px] font-bold text-brand-dark transition-colors group-hover:text-brand-coral">{contact.email}</span>
                  <span className="block whitespace-nowrap text-[11px] text-footer-text">We're here to help</span>
                </div>
              </a>
            </div>
          </div>

          <div className="w-full lg:max-w-[560px]">
            <NewsletterForm />
          </div>
        </Container>
      </section>

      <Container className="py-0 lg:py-4">
        <FooterNavSections contact={contact} columns={data.columns} />
      </Container>

      <div className="border-t border-card-border py-4">
        <Container className="flex items-center justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {socialList.map(({ network, href }) => (
              <li key={network}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/5 hover:text-brand-coral"
                >
                  <SocialIcon network={network} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {(() => {
        const highlightsList = [
          {
            icon: "authentic" as const,
            title: "100% Authentic Products",
            text: "Authenticity Guaranteed",
          },
          ...data.highlights.filter(
            (h) => h.icon !== "support" && h.icon !== "authentic" && !h.title.toLowerCase().includes("support"),
          ),
        ];

        return (
          <div className="border-t border-b border-card-border py-4">
            <Container>
              <ul className="grid grid-cols-3 divide-x divide-card-border">
                {highlightsList.map(({ icon, title, text }) => (
                  <li key={title} className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-4 sm:text-left xl:px-8">
                    <HighlightIcon icon={icon} className="h-8 w-8 shrink-0 text-brand-coral sm:h-9 sm:w-9" />
                    <span className="text-[12px] leading-[1.4]">
                      <span className="block text-balance text-[13px] font-semibold leading-[1.3] text-brand-dark sm:text-[14px] sm:leading-[1.4]">
                        <span className="max-sm:hidden">{title.match(/^\d+%\s/)?.[0]}</span>
                        {title.replace(/^\d+%\s/, "")}
                      </span>
                      <span className="max-sm:hidden">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
        );
      })()}

      <Container className="flex flex-col items-center gap-5 py-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <h2 className="text-[16px] font-bold text-brand-dark">Check out our app!</h2>
          <div className="flex items-center gap-2">
            <a href={data.apps.ios} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className="shrink-0">
              <NextImage src="/assets/images/footer/download-on-the-app-store.svg" alt="" width={120} height={40} className="block h-10 w-[120px]" />
            </a>
            <a href={data.apps.android} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className="shrink-0">
              <NextImage src="/assets/images/footer/get-it-on-google-play.svg" alt="" width={135} height={40} className="block h-10 w-[135px]" />
            </a>
          </div>
        </div>
        <NextImage
          src="/assets/images/footer/payment-logos.webp"
          alt="Accepted payments: Visa, Mastercard, American Express, bKash, Nagad, Rocket, City Bank, upay and more via SSLCommerz"
          width={1851}
          height={416}
          sizes="(max-width: 1023px) 100vw, 400px"
          className="h-auto w-full max-w-[400px] shrink-0"
        />
      </Container>

      <div data-footer-bar className="bg-brand-navy py-4 text-[13px] text-white/80">
        <Container className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>{data.copyright}</p>
          <div className="flex items-center gap-5">
            <ul className="flex flex-wrap items-center justify-center gap-y-1">
              {data.legalLinks.map((link) => (
                <li key={link.label} className="flex items-center before:mx-2.5 before:h-3 before:w-px before:bg-white/30 first:before:hidden sm:before:mx-3">
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <FooterTopButton />
          </div>
        </Container>
      </div>

      <BackToTop />
    </footer>
  );
}

export default Footer;
