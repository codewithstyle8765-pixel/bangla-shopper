"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import { PageTitle } from "@/packages/module-common/PageTitle";
import type { StoreLocation } from "@/types/storefront";
import { ArrowRightIcon, ClockIcon, HighlightIcon, MailIcon, PhoneIcon, PinIcon } from "../layout/footer/FooterIcons";

type OpenStatus = { open: boolean; label: string };

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
};

const clock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "AM" : "PM"}`;
};

/** "Open now · until 9PM" in Dhaka time; undefined when the store has no opening times. */
function openStatus(store: StoreLocation, now: Date): OpenStatus | undefined {
  if (!store.opens || !store.closes) return undefined;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dhaka", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const time = Number(get("hour")) * 60 + Number(get("minute"));
  if (store.closedDays?.includes(day)) return { open: false, label: "Closed today" };
  if (time < minutes(store.opens)) return { open: false, label: `Opens at ${clock(store.opens)}` };
  if (time >= minutes(store.closes)) return { open: false, label: "Closed now" };
  return { open: true, label: `Open now · until ${clock(store.closes)}` };
}

/** Shared city of all stores ("Dhaka"), from the last part of their area. */
const commonCity = (stores: StoreLocation[]) => {
  const cities = new Set(stores.map((s) => s.area.split(",").at(-1)?.trim()));
  return cities.size === 1 ? [...cities][0] : undefined;
};

const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

function StatusBadge({ status, className = "" }: { status?: OpenStatus; className?: string }) {
  if (!status) return null;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-semibold shadow-sm",
        status.open ? "text-success" : "text-brand-alert",
        className,
      )}
    >
      <span aria-hidden="true" className={clsx("h-2 w-2 rounded-full", status.open ? "animate-pulse bg-success" : "bg-brand-alert")} />
      {status.label}
    </span>
  );
}

function Detail({ icon: Icon, children }: { icon: typeof PinIcon; children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[14px] leading-[1.5] text-brand-ink">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-coral" />
      <div className="min-w-0">{children}</div>
    </li>
  );
}

function StoreActions({ store, className = "" }: { store: StoreLocation; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <a
        href={store.directions}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex h-11 items-center justify-center rounded-[4px] bg-brand-coral px-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-coral-hover"
      >
        Get directions
      </a>
      <a
        href={tel(store.phone)}
        onClick={(e) => e.stopPropagation()}
        className="flex h-11 items-center justify-center rounded-[4px] border-2 border-brand-dark px-3 text-[14px] font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
      >
        Call store
      </a>
    </div>
  );
}

/** The one map on the page: store chips on top switch it; it always shows the selected store. */
function MapPanel({ stores, current, onSelect, className = "" }: { stores: StoreLocation[]; current: StoreLocation; onSelect: (id: string) => void; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-[10px] border border-card-border bg-white ${className}`}>
      {stores.length > 1 && (
        <div role="tablist" aria-label="Choose a showroom" className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto border-b border-card-border p-3">
          {stores.map((store) => {
            const active = store.id === current.id;
            return (
              <button
                key={store.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(store.id)}
                className={clsx(
                  "flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-[13px] font-semibold transition-colors",
                  active ? "border-brand-coral bg-brand-coral text-white" : "border-card-border bg-white text-brand-dark hover:border-brand-coral hover:text-brand-coral",
                )}
              >
                <PinIcon className="h-3.5 w-3.5" />
                {store.area.split(",")[0]}
              </button>
            );
          })}
        </div>
      )}
      <div className="relative min-h-0 flex-1 bg-brand-surface max-lg:aspect-[4/3]">
        <iframe
          key={current.id}
          src={current.mapEmbed}
          title={`${current.name} on Google Maps`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
        <p className="min-w-0 truncate text-[14px] font-bold text-brand-dark">{current.name}</p>
        <a href={current.directions} target="_blank" rel="noopener noreferrer" className="group flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-coral">
          Get directions
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

/** Store Locations: highlights, one map that follows the chosen showroom, and a card per showroom. */
export function StoreLocationsView({ stores }: { stores: StoreLocation[] }) {
  const [selected, setSelected] = useState(stores[0]?.id);
  const [statuses, setStatuses] = useState<Record<string, OpenStatus | undefined>>({});
  const mapRef = useRef<HTMLDivElement>(null);
  const current = stores.find((s) => s.id === selected) ?? stores[0];
  const city = commonCity(stores);

  /* Worked out in the browser (Dhaka time, refreshed every minute) so the server render never disagrees with it. */
  useEffect(() => {
    const update = () => setStatuses(Object.fromEntries(stores.map((s) => [s.id, openStatus(s, new Date())])));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [stores]);

  /* Phones: the map sits above the list, so showing a store on it scrolls back up to the map. */
  const showOnMap = (id: string) => {
    setSelected(id);
    if (window.matchMedia("(max-width: 63.98rem)").matches) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      mapRef.current?.scrollIntoView({ block: "start", behavior });
    }
  };

  const highlights = [
    { icon: "delivery" as const, text: `${stores.length} ${stores.length === 1 ? "showroom" : "showrooms"}${city ? ` in ${city}` : ""}` },
    { icon: "secure" as const, text: "100% authentic products" },
    { icon: "support" as const, text: "Expert beauty advice" },
  ];

  return (
    <Container className="pb-4 font-sans lg:pb-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Store Locations" }]} />
      <PageTitle className="mb-3" description="Visit a BanglaShoppers showroom to see, try and buy 100% authentic beauty products, with friendly advice from our team.">
        Our Showrooms
      </PageTitle>

      {stores.length === 0 ? (
        <p className="rounded-[8px] border border-card-border bg-brand-surface p-6 text-center text-[15px] text-footer-text">Store information is coming soon.</p>
      ) : (
        <>
          <ul className="no-scrollbar -mx-(--gutter) mb-4 flex gap-2 overflow-x-auto px-(--gutter) lg:mx-0 lg:px-0">
            {highlights.map(({ icon, text }) => (
              <li key={text} className="flex h-9 shrink-0 items-center gap-2 rounded-full bg-brand-surface px-3.5 text-[13px] font-medium text-brand-dark">
                <HighlightIcon icon={icon} className="h-[18px] w-[18px] text-brand-coral" />
                {text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-6">
            {current && (
              <div ref={mapRef} className="scroll-mt-(--sticky-header) lg:sticky lg:top-4 lg:order-2 lg:h-[min(640px,calc(100dvh-2rem))]">
                <MapPanel stores={stores} current={current} onSelect={setSelected} className="lg:h-full" />
              </div>
            )}

            <ul className="space-y-4 lg:order-1">
              {stores.map((store) => {
                const active = store.id === current?.id;
                return (
                  <li key={store.id}>
                    <article
                      aria-labelledby={`store-${store.id}`}
                      onClick={() => setSelected(store.id)}
                      className={clsx(
                        "overflow-hidden rounded-[10px] border border-card-border bg-white transition-[border-color,box-shadow] duration-200 lg:cursor-pointer",
                        active ? "lg:border-brand-coral lg:shadow-[0_8px_28px_rgba(240,86,88,0.14)]" : "lg:hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]",
                      )}
                    >
                      <div className="relative aspect-[2/1] overflow-hidden bg-brand-surface lg:aspect-[5/2]">
                        {store.image && (
                          <NextImage src={store.image} alt={`${store.name} showroom`} fill sizes="(min-width: 1290px) 700px, (min-width: 1024px) 54vw, 100vw" className="object-cover" />
                        )}
                        <StatusBadge status={statuses[store.id]} className="absolute left-3 top-3" />
                      </div>

                      <div className="flex min-w-0 flex-col p-4 lg:p-5">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-coral">{store.area}</p>
                        <h2 id={`store-${store.id}`} className="mt-1 text-[18px] font-bold leading-tight text-brand-dark sm:text-[20px]">
                          {store.name}
                        </h2>
                        <ul className="mt-3 space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-2.5 lg:space-y-0">
                          <Detail icon={ClockIcon}>{store.hours}</Detail>
                          <Detail icon={PinIcon}>
                            {store.address.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                            {store.landmark && <span className="mt-0.5 block text-[13px] text-footer-text">{store.landmark}</span>}
                          </Detail>
                          <Detail icon={PhoneIcon}>
                            <a href={tel(store.phone)} onClick={(e) => e.stopPropagation()} className="font-semibold text-brand-dark hover:text-brand-coral">
                              {store.phone}
                            </a>
                          </Detail>
                          <Detail icon={MailIcon}>
                            <a href={`mailto:${store.email}`} onClick={(e) => e.stopPropagation()} className="break-all hover:text-brand-coral">
                              {store.email}
                            </a>
                          </Detail>
                        </ul>
                        <StoreActions store={store} className="mt-4 lg:max-w-[420px]" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            showOnMap(store.id);
                          }}
                          aria-pressed={active}
                          className={clsx(
                            "mt-3 flex cursor-pointer items-center gap-1.5 self-start text-[13px] font-semibold",
                            active ? "text-brand-coral" : "text-brand-link hover:text-brand-coral",
                          )}
                        >
                          <PinIcon className="h-4 w-4" />
                          {active ? "Showing on the map" : "View on map"}
                        </button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      <section className="mt-4 flex flex-col items-start gap-4 rounded-[10px] bg-brand-surface p-5 sm:flex-row sm:items-center sm:justify-between lg:mt-6 lg:p-6">
        <div>
          <h2 className="text-[17px] font-bold text-brand-dark">Can’t visit a store?</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-footer-text">Shop online with fast delivery across Bangladesh, or ask our team anything.</p>
        </div>
        <Link
          href="/contact"
          className="flex h-11 shrink-0 items-center gap-2 rounded-[4px] bg-brand-dark px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-charcoal"
        >
          Contact us
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </section>
    </Container>
  );
}

export default StoreLocationsView;
