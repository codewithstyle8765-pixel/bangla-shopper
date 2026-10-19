"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { QuantitySelector } from "@/packages/module-common/QuantitySelector";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { formatTk } from "@/utils/format";
import { usePdpSelection } from "./pdpSelection";

/** The summary's Add to Cart row; once it scrolls under the header the phone buy bar appears. */
export const BUY_BOX_ID = "pdp-buy-box";

export interface PdpSection {
  id: string;
  label: string;
}

export interface PdpBuyProduct {
  sku: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  /** Configurable products ("Size"): until a full in-stock combination is picked, the bar sends the customer up to pick one. */
  chooseOption?: string;
}

const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

function Price({ price, originalPrice, className = "" }: { price: number; originalPrice?: number; className?: string }) {
  return (
    <p className={`flex items-baseline gap-1.5 whitespace-nowrap font-bold text-brand-alert ${className}`}>
      {formatTk(price)}
      {originalPrice ? <span className="text-[12px] font-medium text-text-subtle line-through">{formatTk(originalPrice)}</span> : null}
    </p>
  );
}

/** Price plus the picked options ("Black · 38C") in place of the old price; tapping them goes back to the pickers. */
function BarPrice({ price, originalPrice, labels, onChange }: { price: number; originalPrice?: number; labels?: string[]; onChange?: () => void }) {
  return (
    <div className="min-w-0 flex-1">
      <Price price={price} originalPrice={labels?.length ? undefined : originalPrice} className="flex-col items-start gap-0 text-[17px] leading-tight" />
      {labels?.length ? (
        <button type="button" onClick={onChange} className="mt-0.5 block max-w-full cursor-pointer truncate text-left text-[12px] font-medium text-footer-text underline decoration-dotted underline-offset-2">
          {labels.join(" · ")}
        </button>
      ) : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m2.5 6.2 2.3 2.3 4.7-5" />
    </svg>
  );
}

/**
 * Sticky strip under the header: section links that follow the scroll position. Below lg, once the summary's Add to
 * Cart has scrolled away, a buy bar slides up above the bottom navigation; after adding it shows the cart quantity
 * and a way to checkout.
 */
export function PdpSectionNav({ sections, product }: { sections: PdpSection[]; product: PdpBuyProduct }) {
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  /* While a tapped link's smooth scroll runs, that link stays active (no flicker through the sections in between). */
  const lockRef = useRef<string | null>(null);
  const settleRef = useRef(0);
  const releaseRef = useRef<() => void>(() => {});
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;
  const [top, setTop] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState(sections[0]?.id);
  const [adding, setAdding] = useState(false);
  const { items, addItem, updateQuantity, isUpdating } = useCart();
  const selection = usePdpSelection(product.sku);
  const configurable = Boolean(product.chooseOption);
  const picked = configurable && selection?.complete ? selection : undefined;
  const price = picked?.price ?? product.price;
  const originalPrice = picked ? picked.originalPrice : product.originalPrice;
  const inStock = configurable && picked ? picked.inStock : product.inStock;
  const mustChoose = configurable && !picked;
  const line = mustChoose
    ? undefined
    : items.find(
        (item) =>
          item.sku === product.sku &&
          (!picked || (item.options?.length === picked.labels.length && item.options.every((o, i) => o.value === picked.labels[i]))),
      );

  /* The header's height changes with the breakpoint; the strip sits right under it and anchors/sticky panels clear both. */
  useEffect(() => {
    const header = document.querySelector("header");
    const bar = barRef.current;
    if (!header || !bar) return;
    const root = document.documentElement;
    const measure = () => {
      setTop(header.offsetHeight);
      root.style.setProperty("--pdp-sticky-top", `${header.offsetHeight + bar.offsetHeight}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--pdp-sticky-top");
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const buyBox = document.getElementById(BUY_BOX_ID);
      setStuck(buyBox ? buyBox.getBoundingClientRect().bottom < header : false);
      if (lockRef.current) return;
      const edge = (barRef.current?.getBoundingClientRect().bottom ?? header) + 12;
      let current = sectionsRef.current[0]?.id;
      for (const { id } of sectionsRef.current) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= edge) current = id;
      }
      setActive(current);
    };
    const unlock = () => {
      if (!lockRef.current) return;
      const id = lockRef.current;
      lockRef.current = null;
      window.clearTimeout(settleRef.current);
      update();
      revealLink(id);
    };
    /* The tap's scroll is over at `scrollend`; where that event is missing, once scroll events stop for a while. */
    const releaseLock = () => {
      window.clearTimeout(settleRef.current);
      settleRef.current = window.setTimeout(unlock, 600);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      if (lockRef.current) releaseLock();
    };
    releaseRef.current = releaseLock;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", unlock);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", unlock);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Phones: slide the highlighted link into the swipeable strip when it is cut off. Never during a tap's page scroll:
     two smooth scrolls at once stall the page one. */
  const revealLink = (id: string | undefined) => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (!nav || !link) return;
    const visible = link.offsetLeft >= nav.scrollLeft && link.offsetLeft + link.offsetWidth <= nav.scrollLeft + nav.clientWidth;
    if (!visible) nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: smooth() });
  };

  useEffect(() => {
    if (!lockRef.current) revealLink(active);
  }, [active]);

  const chooseAgain = () => {
    const chooseBtn = document.querySelector<HTMLButtonElement>("[data-choose-option-btn]");
    if (chooseBtn) {
      chooseBtn.click();
      return;
    }
    document.getElementById(BUY_BOX_ID)?.closest("[data-pdp-summary]")?.querySelector("fieldset")?.scrollIntoView({ block: "center", behavior: smooth() });
  };

  const add = async () => {
    setAdding(true);
    try {
      await addItem(product.sku, 1, picked ? { selectedOptions: picked.selectedOptions } : undefined);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <div
        ref={barRef}
        style={{ top }}
        data-pin
        className="sticky z-30 -mx-(--gutter) border-y border-card-border bg-white px-(--gutter) desk:mx-0 desk:px-0"
      >
        <div className="flex h-12 items-center lg:h-14">
          <nav ref={navRef} aria-label="Product sections" className="no-scrollbar flex h-full min-w-0 flex-1 overflow-x-auto">
            {sections.map(({ id, label }) => {
              const current = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  data-section={id}
                  aria-current={current ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    lockRef.current = id;
                    releaseRef.current();
                    setActive(id);
                    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: smooth() });
                    history.replaceState(null, "", `#${id}`);
                  }}
                  className={`relative flex h-full shrink-0 items-center whitespace-nowrap px-3 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors first:pl-0 sm:px-4 sm:first:pl-0 lg:text-[14px] after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:origin-center after:rounded-t-[2px] after:bg-brand-coral after:transition-transform after:duration-(--duration-panel) first:after:left-0 sm:after:inset-x-4 sm:first:after:left-0 ${
                    current ? "text-brand-coral after:scale-x-100" : "text-footer-text after:scale-x-0 hover:text-brand-dark"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

        </div>
      </div>

      <div
        data-sticky-cta="pdp"
        inert={!stuck}
        className={`fixed inset-x-0 bottom-[calc(4rem+1px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-card-border bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-[transform,opacity,visibility] duration-(--duration-panel) ease-(--ease-panel) lg:hidden ${
          stuck ? "visible translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"
        }`}
      >
        <NextImage src={product.image} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[4px] border border-card-border object-contain" />
        {!inStock && !mustChoose ? (
          <>
            <BarPrice price={price} originalPrice={originalPrice} labels={picked?.labels} />
            <button
              type="button"
              onClick={chooseAgain}
              className="h-12 w-[150px] shrink-0 cursor-pointer rounded-[4px] bg-price-strikethrough/40 text-[15px] font-semibold leading-tight text-white min-[400px]:w-[170px]"
            >
              {configurable ? <>Sold Out<span className="block text-[12px] font-medium">Change {product.chooseOption}</span></> : "Sold Out"}
            </button>
          </>
        ) : line ? (
          <>
            <QuantitySelector size="sm" value={line.quantity} disabled={isUpdating} onChange={(q) => updateQuantity(line.id, q)} label={`${product.name} quantity in cart`} />
            <Link href="/checkout" className="flex h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[4px] bg-brand-dark px-3 text-[16px] font-semibold text-white">
              <CheckIcon />
              Checkout
              <span aria-hidden="true">→</span>
            </Link>
          </>
        ) : (
          <>
            <BarPrice price={price} originalPrice={originalPrice} labels={picked?.labels} onChange={picked ? chooseAgain : undefined} />
            <button
              type="button"
              onClick={mustChoose ? chooseAgain : add}
              disabled={adding}
              className="h-12 w-[150px] shrink-0 cursor-pointer rounded-[4px] bg-brand-coral text-[16px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-60 min-[400px]:w-[170px]"
            >
              {mustChoose ? "Choose Option" : adding ? "Adding..." : "Add to Cart"}
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PdpSectionNav;
