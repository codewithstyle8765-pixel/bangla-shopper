import Link from "next/link";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import { getFooterData } from "@/utils/magento/cms";
import { BackToTop, FooterTopButton } from "./BackToTop";
import { ChevronRightIcon, ClockIcon, HighlightIcon, MailIcon, MailSolidIcon, PhoneIcon, PinIcon, SocialIcon } from "./FooterIcons";
import { NewsletterForm } from "./NewsletterForm";


function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[16px] font-bold text-brand-dark">
      {children}
      <span aria-hidden="true" className="mt-2.5 block h-[2px] w-6 bg-brand-coral" />
    </h2>
  );
}

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

  const contactItems = [
    { icon: PinIcon, label: "Address", value: contact.address },
    { icon: PhoneIcon, label: "Hotline", value: contact.hotline, href: `tel:${contact.hotline.replace(/\s+/g, "")}` },
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: ClockIcon, label: "Open Time", value: contact.hours },
  ];

  return (
    <footer className="mt-4 bg-white font-sans text-[14px] text-footer-text">
      <section aria-label="Newsletter" className="relative overflow-hidden bg-neutral-50 py-5 lg:py-6">
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-brand-coral/14" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-32 h-44 w-44 rounded-full bg-brand-coral/14 max-lg:hidden" />
        <Container className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-center gap-4 lg:shrink-0 lg:border-r lg:border-card-border lg:pr-10">
            <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-brand-coral/8 text-brand-coral">
              <MailSolidIcon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-[17px] font-bold leading-tight text-brand-dark sm:text-[19px]">{data.newsletterTitle}</h2>
              <p className="mt-1 text-[13px] sm:text-[14px]">{data.newsletterText}</p>
            </div>
          </div>
          <div className="w-full lg:max-w-[560px]">
            <NewsletterForm />
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-4 py-4 md:grid-cols-4 lg:gap-x-8 xl:grid-cols-[minmax(0,1.9fr)_repeat(4,minmax(0,1fr))]">
        <div className="col-span-2 md:col-span-4 xl:col-span-1">
          <ColumnTitle>{contact.title}</ColumnTitle>
          <address className="mt-5 grid gap-4 not-italic sm:grid-cols-2 xl:max-w-[350px] xl:grid-cols-1">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <p key={label} className="flex gap-3 text-[13px] leading-[1.45]">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-coral" />
                <span>
                  <span className="block font-semibold text-brand-dark">{label}</span>
                  {href ? (
                    <a href={href} className="transition-colors hover:text-brand-coral">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              </p>
            ))}
          </address>
        </div>

        {data.columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <ColumnTitle>{column.title}</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group transition-colors hover:text-brand-coral">
                    {link.label.slice(0, link.label.lastIndexOf(" ") + 1)}
                    <span className="whitespace-nowrap">
                      {link.label.slice(link.label.lastIndexOf(" ") + 1)}
                      <ChevronRightIcon className="ml-1.5 inline-block h-3 w-3 align-[-1px] transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
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
