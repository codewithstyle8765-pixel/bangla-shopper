import type { ReactNode } from "react";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import type { AffiliateOverview } from "@/types/storefront";
import { formatTk } from "@/utils/format";

/* A full page load: signed-out visitors are redirected to login by the proxy, which a client-side navigation would have to abort mid-stream. */
const APPLY_HREF = "/customer/account/affiliate";

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const ICONS = {
  apply: icon(<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />),
  share: icon(
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </>,
  ),
  earn: icon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5v11" />
    </>,
  ),
  join: icon(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6" />
    </>,
  ),
  advertise: icon(<path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6M7 15l1.5 5" />),
  truck: icon(<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />),
  returns: icon(<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />),
  store: icon(<path d="M4 10v10h16V10M3 6l2-3h14l2 3v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />),
  reward: icon(<path d="M3 8h18v4H3zM12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />),
  support: icon(<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM17 16v1a3 3 0 0 1-3 3h-2" />),
};

const STEPS = [
  { icon: ICONS.apply, title: "Apply", text: "Get started by filling out our partner application. We made it simple, and there's no cost to you." },
  { icon: ICONS.share, title: "Share", text: "Get your personal link, coupons and banners for multiple categories, sales and events." },
  { icon: ICONS.earn, title: "Earn", text: "Earn your BanglaShoppers.com points that can be cashed at any of our stores by using your personal code." },
];

const PILLARS = [
  {
    icon: ICONS.earn,
    title: "Earn",
    text: "Earn attractive commission with a program designed to help our affiliate partners succeed. (Conditions apply)",
    points: [{ title: "Marketing expertise", text: "Receive affiliate newsletters and tips from the BanglaShoppers.com marketing team on bestsellers, upcoming promotions and more." }],
  },
  {
    icon: ICONS.join,
    title: "Join",
    text: "We made it simple, and there's no cost to you.",
    points: [{ title: "Easy setup", text: "Getting up and running is a snap. We'll provide step-by-step directions to get you set up with BanglaShoppers.com banners and links for your site." }],
  },
  {
    icon: ICONS.advertise,
    title: "Advertise",
    text: "Put our beauty expertise, extraordinary service, high-demand products and exclusive offers to work.",
    points: [
      { title: "Fresh creative", text: "Your personal links for multiple categories, sales and events." },
      { title: "Product depth", text: "OFRA to W7. ABNY to SIGMA. Our range spans diverse prices, trends and brands, so you can promote what fits your audience best." },
      { title: "Exclusive offers", text: "Stand out with high-demand brands, unique offers, seasonal events and BanglaShoppers.com-exclusive products." },
    ],
  },
];

const BENEFITS = [
  { icon: ICONS.truck, title: "Free shipping", text: "On orders above BDT 5000" },
  { icon: ICONS.returns, title: "Free returns", text: "If the product is intact" },
  { icon: ICONS.store, title: "Pick up in store", text: "Buy online, collect in store" },
  { icon: ICONS.reward, title: "Reward points", text: "BanglaShoppers Rewards on every order" },
  { icon: ICONS.support, title: "Customer service", text: "Extraordinary support, every day" },
];

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[640px] text-center">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-coral">{eyebrow}</p>
      <h2 className="mt-1.5 text-[22px] font-black uppercase leading-tight tracking-[0.06em] text-brand-dark sm:text-[26px]">{title}</h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-10 bg-brand-coral" />
      {children && <p className="mt-3 text-[14px] leading-[1.6] text-footer-text sm:text-[15px]">{children}</p>}
    </div>
  );
}

const applyButton =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-brand-coral px-7 text-[15px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-brand-coral-hover";

function ApplyArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** "Become an Affiliate" landing page: the client's program copy, laid out in the store theme. */
export function AffiliateProgramView({ overview }: { overview: AffiliateOverview | null }) {
  const tiers = [...(overview?.programs.find((p) => p.type === "Pay per sale")?.groups ?? [])].sort((a, b) => a.minOrders - b.minOrders);
  const top = tiers.at(-1)?.commissions[0]?.value;
  const facts = [
    { value: "Free", label: "to join" },
    ...(top ? [{ value: `Up to ${top}`, label: "commission" }] : []),
    ...(overview ? [{ value: formatTk(overview.minPayout, false), label: "minimum payout" }] : []),
  ];

  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Affiliate Program" }]} />

      <section className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-brand-charcoal via-brand-navy to-brand-black px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
        <span aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-coral/25" />
        <span aria-hidden="true" className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-coral">How to become an affiliate</p>
            <h1 className="mt-3 text-[28px] font-black uppercase leading-[1.1] tracking-[0.04em] sm:text-[40px]">
              BanglaShoppers <span className="text-brand-coral">Affiliate</span> Program
            </h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.65] text-white/80 sm:text-[16px]">
              BanglaShoppers has worked hard to create a program that helps our partners achieve their goals. It&apos;s our business to make people happy, and that includes you.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={APPLY_HREF} className={applyButton}>
                Apply Now
                <ApplyArrow />
              </a>
              <a href={APPLY_HREF} className="inline-flex h-12 items-center justify-center rounded-[4px] border-2 border-white/40 px-6 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-brand-black">
                Already an affiliate? Open dashboard
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {facts.map((f) => (
              <li key={f.label} className="rounded-[8px] bg-white/10 px-3 py-4 text-center ring-1 ring-white/15 backdrop-blur-sm lg:flex lg:items-baseline lg:gap-3 lg:px-5 lg:text-left">
                <span className="block text-[18px] font-black text-white sm:text-[24px]">{f.value}</span>
                <span className="text-[12px] uppercase tracking-[0.1em] text-white/70 sm:text-[13px]">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <SectionHeading eyebrow="Simple as 1, 2, 3" title="How it works" />
        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-[8px] border border-card-border bg-white p-5 pt-6 sm:p-6">
              <span className="absolute right-5 top-4 text-[44px] font-black leading-none text-brand-coral/10">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-coral text-white">{step.icon}</span>
              <h3 className="mt-4 text-[17px] font-black uppercase tracking-[0.06em] text-brand-dark">{step.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-footer-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 sm:mt-16">
        <SectionHeading eyebrow="Why partner with us" title="Earn · Join · Advertise" />
        <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="flex flex-col rounded-[8px] border border-card-border bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">{pillar.icon}</span>
                <h3 className="text-[19px] font-black uppercase tracking-[0.08em] text-brand-dark">{pillar.title}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-footer-text">{pillar.text}</p>
              <ul className="mt-4 space-y-3 border-t border-card-border pt-4">
                {pillar.points.map((p) => (
                  <li key={p.title} className="flex gap-2.5">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                    <span className="text-[13px] leading-[1.55] text-footer-text">
                      <strong className="block text-[14px] font-bold text-brand-dark">{p.title}</strong>
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {tiers.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <SectionHeading eyebrow="Grow with every order" title="Commission tiers">
            Your commission rises as you refer more orders. Everyone starts in the {tiers[0].name} group.
          </SectionHeading>
          <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {tiers.map((tier, i) => (
              <li key={tier.name} className={`relative overflow-hidden rounded-[8px] border p-4 sm:p-5 ${i === tiers.length - 1 ? "border-brand-coral bg-brand-coral/5" : "border-card-border bg-white"}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-coral" style={{ opacity: 0.25 + (0.75 * (i + 1)) / tiers.length }} />
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-footer-text">{tier.minOrders > 0 ? `${tier.minOrders}+ orders` : "Starting tier"}</p>
                <h3 className="mt-1 text-[18px] font-black text-brand-dark">{tier.name}</h3>
                <p className="mt-2 text-[30px] font-black leading-none text-brand-coral sm:text-[36px]">{tier.commissions[0]?.value}</p>
                <p className="mt-1 text-[12px] leading-[1.45] text-footer-text">{tier.commissions[0]?.text}</p>
                {tier.commissions[1] && (
                  <p className="mt-2 border-t border-card-border pt-2 text-[12px] text-footer-text">
                    <strong className="text-brand-dark">{tier.commissions[1].value}</strong> {tier.commissions[1].text}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-12 rounded-[10px] bg-brand-surface px-5 py-10 ring-1 ring-card-border sm:mt-16 sm:px-8">
        <SectionHeading eyebrow="Promotional benefits" title="Services our customers love" />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex flex-col items-center rounded-[8px] bg-white p-4 text-center ring-1 ring-card-border max-sm:last:col-span-2">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">{b.icon}</span>
              <p className="mt-3 text-[14px] font-bold text-brand-dark">{b.title}</p>
              <p className="mt-0.5 text-[12px] leading-[1.45] text-footer-text">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4 mt-12 flex flex-col items-center justify-between gap-5 rounded-[10px] bg-brand-coral px-5 py-8 text-center text-white sm:mt-16 sm:px-10 md:flex-row md:text-left">
        <div>
          <h2 className="text-[22px] font-black uppercase tracking-[0.04em] sm:text-[26px]">Ready to start earning?</h2>
          <p className="mt-1 text-[14px] text-white/85 sm:text-[15px]">Join free in two minutes and get your personal referral link today.</p>
        </div>
        <a href={APPLY_HREF} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-white px-7 text-[15px] font-bold uppercase tracking-[0.06em] text-brand-coral transition-colors hover:bg-brand-black hover:text-white">
          Apply Now
          <ApplyArrow />
        </a>
      </section>
    </Container>
  );
}

export default AffiliateProgramView;
