"use client";

import { useEffect, useState } from "react";
import {
  HeartIcon,
  ShareIcon,
} from "@/packages/module-common/icons/UiIcons";
import { GuaranteeIcon, ReturnPolicyIcon } from "@/packages/module-common/icons/TrustIcons";
import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { QuantitySelector } from "@/packages/module-common/QuantitySelector";
import { RatingStars } from "@/packages/module-common/RatingStars";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { useWishlist } from "@/packages/module-quote/context/WishlistContext";
import { Modal } from "@/packages/module-common/Modal";
import { BUY_BOX_ID } from "./PdpSectionNav";
import { setPdpSelection } from "./pdpSelection";
import type { ProductOption, ProductVariant } from "@/types/storefront";
import { copyText } from "@/utils/clipboard";

export interface ProductSummaryProps {
  name?: string;
  sku?: string;
  brand?: string;
  origin?: string;
  rating?: number;
  ratingCount?: number;
  reviewCount?: number;
  price?: number;
  originalPrice?: number;
  inStock?: boolean;
  liveStock?: Array<{ location: string; available: boolean }>;
  /** Category listing for "Click for similar products"; without it the link jumps to the Similar Products row. */
  similarHref?: string;
  /** Units left when low (Magento `only_x_left_in_stock`); undefined = more than the threshold (10). */
  stockLeft?: number;
  /** Configurable products: the picked combination sets the price and stock shown. */
  options?: ProductOption[];
  variants?: ProductVariant[];
  className?: string;
}

export function ProductSummary({
  name = "Absolute New York Supreme Slim Demi Matte Lipstick - Night Shade - MLSS60 - 1.3gm, Imported from the USA.",
  sku = "888432939323",
  brand,
  origin = "China",
  rating = 4.2,
  ratingCount = 1045,
  reviewCount = 721,
  price: basePrice = 365,
  originalPrice: baseOriginalPrice = 650,
  inStock: baseInStock = false,
  liveStock = [],
  similarHref,
  stockLeft: baseStockLeft,
  options = [],
  variants = [],
  className = "",
}: ProductSummaryProps) {
  /* Initially unselected so customer chooses an option explicitly. */
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(false);

  const hasOptions = options.length > 0;
  const allOptionsSelected = hasOptions && options.every((o) => Boolean(selected[o.code]));
  const firstUnselectedOption = hasOptions ? options.find((o) => !selected[o.code]) : undefined;

  const variant = allOptionsSelected
    ? variants.find((v) => options.every((o) => v.attributes[o.code] === selected[o.code]))
    : undefined;
  const price = variant?.price ?? basePrice;
  const originalPrice = variant ? variant.originalPrice : baseOriginalPrice;
  const inStock = variant ? variant.inStock : hasOptions ? variants.some((v) => v.inStock) : baseInStock;
  const stockLeft = variant ? undefined : baseStockLeft;
  const selectedOptions = options.map((o) => selected[o.code]).filter(Boolean);
  const selectedLabels = options.map((o) => o.values.find((v) => v.uid === selected[o.code])?.label ?? "");

  useEffect(() => {
    if (!options.length) return;
    setPdpSelection(sku, {
      selectedOptions,
      labels: selectedLabels,
      complete: Boolean(allOptionsSelected && variant),
      price,
      originalPrice,
      inStock: Boolean(variant ? variant.inStock : variants.some((v) => v.inStock)),
    });
  }, [sku, variant, allOptionsSelected, price, originalPrice, inStock, selectedOptions.join(), options.length]);

  const [skuCopied, setSkuCopied] = useState(false);
  const copySku = async () => {
    window.getSelection()?.removeAllRanges();
    if (!(await copyText(sku))) return;
    setSkuCopied(true);
    window.setTimeout(() => setSkuCopied(false), 1600);
  };
  const [liveStockOpen, setLiveStockOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { isInWishlist, toggle: toggleWishlist } = useWishlist();
  const [wishlistPending, setWishlistPending] = useState(false);
  const isWishlisted = isInWishlist(sku);
  const { addItem } = useCart();
  const [notice, setNotice] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!inStock) {
      setNotice("This product is currently sold out.");
      return;
    }
    setNotice(null);
    try {
      setIsAdding(true);
      await addItem(sku, quantity, { selectedOptions });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      data-pdp-summary
      className={`w-full lg:flex-1 lg:min-w-0 desk:w-[604px] flex flex-col font-sans leading-none shrink-0 ${className}`}
    >
      <div className="desk:ml-[1px] ml-0">
        <h1 className="text-[18px] font-medium text-brand-dark leading-[22px]">
          {name}
        </h1>

        <nav className="w-full max-w-[451px] mt-[9px]">
          <ul className="flex items-center flex-wrap gap-x-[9px] text-[14px] *:min-h-[15px]">
            {brand && (
              <li>
                <p className="text-brand-dark">
                  <strong className="font-semibold text-brand-dark">
                    Brand:{" "}
                  </strong>
                  <Link
                    href={`/search?q=${encodeURIComponent(brand)}`}
                    className="text-brand-coral hover:underline"
                  >
                    {brand}
                  </Link>
                </p>
              </li>
            )}
            <li>
              <p className="text-brand-dark">
                <strong className="font-semibold text-brand-dark">
                  Origin:
                </strong>{" "}
                <span className="text-brand-coral">{origin}</span>
              </p>
            </li>
            <li>
              <p className="text-brand-dark">
                <strong className="font-semibold text-brand-dark">SKU:</strong>{" "}
                <span
                  onDoubleClick={copySku}
                  title="Double-click to copy"
                  className="relative cursor-copy touch-manipulation text-brand-coral"
                >
                  {sku}
                  <span
                    role="status"
                    className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-brand-dark px-2 py-1 text-[11px] font-medium text-white transition-opacity duration-200 ${
                      skuCopied ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {skuCopied ? "SKU copied" : ""}
                  </span>
                </span>
              </p>
            </li>
          </ul>
        </nav>

        <div className="divider w-full desk:w-[601px] mt-[11px] desk:ml-[1px] ml-0" />

        <a
          href="#reviews"
          onClick={(e) => {
            const tab = document.querySelector<HTMLElement>('[data-section="reviews"]');
            if (!tab) return;
            e.preventDefault();
            tab.click();
          }}
          aria-label={`${rating.toFixed(1)} out of 5 stars, ${reviewCount.toLocaleString()} reviews. Go to reviews`}
          className="group flex flex-wrap items-center gap-y-1 mt-[5px] cursor-pointer"
        >
          <RatingStars value={rating} size={16} gap={6} />
          <p className="ml-[10px] sm:ml-[13px] text-[13px] sm:text-[14px] font-bold text-brand-ink text-center mt-[2px] shrink-0">
            {rating.toFixed(1)} out of 5 stars
          </p>
          <p className="flex items-center text-[13px] sm:text-[14px] font-medium text-brand-ink mt-[2px] whitespace-nowrap max-[389px]:basis-full">
            <span aria-hidden="true" className="mx-[6px] sm:mx-[8px] text-muted-line max-[389px]:hidden">|</span>
            <span className="text-brand-coral underline-offset-2 group-hover:underline">
              {ratingCount.toLocaleString()} customer ratings
              <span className="hidden sm:inline">
                , {reviewCount.toLocaleString()} with reviews
              </span>
            </span>
          </p>
        </a>

        <div className="divider w-full desk:w-[601px] mt-[5px] desk:ml-[1px] ml-0" />
      </div>

      <div className="w-full desk:w-[603px] mt-[7px]">
        <div className="flow-root">
          <div className="float-right ml-2 mt-[4px]">
            <NextImage
              src="/assets/images/pdp/vector_smart_object.png"
              alt=""
              width={83}
              height={74}
              className="w-[83px] h-[74px] object-contain block"
            />
          </div>
          <div className="lg:max-w-[445px]">
            <div className="flex items-start flex-wrap gap-x-[1.3px]">
              <span className="text-[30px] font-semibold text-brand-alert leading-none desk:mt-[3px]">
                TK {price}
                <sup>.00</sup>
              </span>
              {originalPrice && (
                <span className="text-[16px] font-semibold text-text-subtle mt-[3px] desk:mt-[5px]">
                  (
                  <span className="line-through">
                    TK {originalPrice}.<sup>00</sup>
                  </span>
                  )
                </span>
              )}
              <span className="text-[14px] text-brand-alert mt-[6px]">
                <strong className="text-black font-semibold">
                  Offer ends:{" "}
                </strong>
                While supply last.
              </span>
            </div>

            <ul className="mt-[7px] ml-[1px] space-y-1 text-[13px] max-[374px]:text-[12.5px] sm:text-[14px] font-semibold text-text-subtle leading-snug">
              <li>
                Register or login to earn{" "}
                <span className="text-brand-coral">1% </span>
                Cash Back Reward with this purchase.
              </li>
              <li>
                Up to <span className="text-brand-coral">5% Cash Back</span> if
                pre-payment is selected at checkout.
              </li>
            </ul>
          </div>
        </div>

        {options.map((option) => {
          const chosen = option.values.find((v) => v.uid === selected[option.code]);
          const isMissing = showValidation && !selected[option.code];
          return (
            <fieldset
              key={option.code}
              id={`pdp-option-${option.code}`}
              data-option-code={option.code}
              data-option-missing={isMissing ? "true" : undefined}
              className="mt-[12px]"
            >
              <legend className="text-[14px] text-brand-dark">
                <strong className="font-semibold">{option.label}:</strong>{" "}
                <span
                  className={
                    chosen
                      ? "text-brand-coral"
                      : isMissing
                      ? "text-brand-alert font-semibold"
                      : "text-brand-coral"
                  }
                >
                  {chosen?.label ?? (isMissing ? `Please select ${option.label.toLowerCase()}` : "Please select")}
                </span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const soldOut = !variants.some(
                    (v) =>
                      v.inStock &&
                      v.attributes[option.code] === value.uid &&
                      options.every((o) => o.code === option.code || !selected[o.code] || v.attributes[o.code] === selected[o.code]),
                  );
                  const active = value.uid === selected[option.code];
                  const handleOptionClick = () => {
                    setSelected((cur) => ({ ...cur, [option.code]: value.uid }));
                  };
                  if (value.swatch) {
                    return (
                      <button
                        key={value.uid}
                        type="button"
                        aria-pressed={active}
                        aria-label={soldOut ? `${value.label} (sold out)` : value.label}
                        title={soldOut ? `${value.label} - sold out` : value.label}
                        onClick={handleOptionClick}
                        className={`relative h-9 w-9 cursor-pointer rounded-full border-2 p-[3px] transition-colors ${active ? "border-brand-coral" : "border-transparent hover:border-card-border"}`}
                      >
                        <span className="block h-full w-full rounded-full border border-black/10" style={{ background: value.swatch.kind === "color" ? value.swatch.value : `center / cover url("${value.swatch.value}")` }} />
                        {soldOut && (
                          <span aria-hidden="true" className="absolute inset-[3px] overflow-hidden rounded-full">
                            <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-brand-alert" />
                          </span>
                        )}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={value.uid}
                      type="button"
                      aria-pressed={active}
                      title={soldOut ? "Sold out" : undefined}
                      onClick={handleOptionClick}
                      className={`h-9 min-w-[68px] cursor-pointer rounded-[4px] border px-3 text-[14px] font-medium transition-colors ${
                        active ? "border-brand-coral bg-brand-coral/5 text-brand-coral ring-1 ring-brand-coral" : "border-card-border text-brand-dark hover:border-brand-dark"
                      } ${soldOut ? "border-dashed line-through decoration-text-subtle" : ""}`}
                    >
                      {value.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        <div className="mt-[10px] flex w-full items-center justify-between gap-3 border-y border-divider py-[7px] desk:mx-auto desk:w-[600px] desk:py-[5px]">
          <p className="min-w-0 text-[14px] leading-[1.3] text-stock-link">
            <strong className="text-text-subtle font-semibold">Stock: </strong>
            {hasOptions && !allOptionsSelected ? (
              <span className="text-brand-alert font-semibold">Please select option</span>
            ) : !inStock ? (
              <>
                <span className="text-brand-alert">Sold Out</span>{" "}
                <strong className="whitespace-nowrap font-semibold underline">
                  <Link href={similarHref ?? "#similar-products"}>
                    <span className="max-[389px]:hidden">Click for similar products</span>
                    <span className="min-[390px]:hidden">See similar</span>
                  </Link>
                </strong>
              </>
            ) : stockLeft ? (
              <span className="font-semibold text-brand-alert">
                Only {stockLeft} left in stock!
              </span>
            ) : (
              <span className="text-brand-alert">More than 10 available</span>
            )}
          </p>

          <button
            type="button"
            onClick={() => setLiveStockOpen(true)}
            aria-haspopup="dialog"
            className="h-[25px] px-2 rounded-[4px] bg-brand-coral text-white text-[12px] font-bold leading-[25px] text-center select-none shrink-0 cursor-pointer transition-colors hover:bg-brand-coral-hover"
          >
            LIVE STOCK
          </button>
        </div>
      </div>

      <div className="w-full desk:w-[604px] mt-[7px] desk:mt-[6px] desk:ml-[1px] ml-0">
        <div id={BUY_BOX_ID} className="flex items-center flex-wrap gap-[13px]">
          <QuantitySelector
            initialValue={quantity}
            onChange={(q) => setQuantity(q)}
            className="mt-[3px] shrink-0"
          />

          {hasOptions && !allOptionsSelected ? (
            <button
              type="button"
              data-choose-option-btn
              onClick={() => {
                setShowValidation(true);
                const target = firstUnselectedOption
                  ? document.getElementById(`pdp-option-${firstUnselectedOption.code}`)
                  : document.querySelector("[data-option-code]");
                target?.scrollIntoView({ block: "center", behavior: "smooth" });
              }}
              className="min-w-[146px] flex-1 sm:flex-none sm:w-[146px] h-[40px] leading-[40px] rounded-[4px] bg-brand-coral text-white text-[17px] font-semibold text-center cursor-pointer hover:bg-brand-coral-hover active:scale-98 transition-all select-none mt-[3px]"
            >
              Choose Option
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || !inStock}
              title={inStock ? undefined : "This product is currently sold out"}
              className="min-w-[146px] flex-1 sm:flex-none sm:w-[146px] h-[40px] leading-[40px] rounded-[4px] bg-brand-coral text-white text-[18px] font-semibold text-center cursor-pointer enabled:hover:bg-brand-coral-hover enabled:active:scale-98 transition-all disabled:cursor-not-allowed disabled:opacity-50 select-none mt-[3px]"
            >
              {isAdding ? "Adding..." : !inStock ? "Sold Out" : "Add to Cart"}
            </button>
          )}

          {/* Wishlist and share wrap together; Add to Cart then fills the first row on phones. */}
          <div className="flex shrink-0 items-center gap-[13px]">
            <button
              type="button"
              onClick={async () => {
                setWishlistPending(true);
                await toggleWishlist(sku);
                setWishlistPending(false);
              }}
              disabled={wishlistPending}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={isWishlisted}
              className="w-[40px] h-[40px] py-[9px] rounded-[4px] bg-black flex items-center justify-center cursor-pointer hover:bg-neutral-800 transition-colors mt-[3px] shrink-0"
            >
              <HeartIcon
                fill={isWishlisted ? "currentColor" : "none"}
                className={`w-[24px] h-[22px] block text-white transition-transform ${isWishlisted ? "scale-110" : ""}`}
              />
            </button>

            <button
              type="button"
              aria-label="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: name, url: window.location.href });
                }
              }}
              className="w-[40px] h-[40px] py-[8px] rounded-[4px] bg-black flex items-center justify-center cursor-pointer hover:bg-neutral-800 transition-colors mt-[3px] shrink-0"
            >
              <ShareIcon className="w-[24px] h-[24px] block text-white" />
            </button>
          </div>

          <div className="flex items-center gap-[10px] shrink-0 sm:gap-[13px]">
            <p className="whitespace-nowrap text-[16px] font-semibold leading-[18px] text-black min-[400px]:text-[17px] lg:text-[18px] lg:w-auto lg:whitespace-nowrap lg:text-left desk:w-[92px] desk:whitespace-normal desk:text-center desk:relative desk:-top-[3px]">
              Download Our App
            </p>

            <Link
              href="https://apps.apple.com/us/app/banglashoppers-cosmetics-shop/id1586953705"
              target="_blank"
              rel="noopener"
              className="mt-[2px] shrink-0"
              aria-label="Download on App Store"
            >
              <NextImage
                src="/assets/images/pdp/app-store-icon.svg"
                alt=""
                width={40}
                height={40}
                className="w-[40px] h-[40px] object-contain hover:opacity-85 transition-opacity"
              />
            </Link>

            <Link
              href="https://play.google.com/store/apps/details?id=com.banglashoppers.android"
              target="_blank"
              rel="noopener"
              className="mt-[3px] shrink-0"
              aria-label="Get it on Google Play"
            >
              <NextImage
                src="/assets/images/pdp/google-play-icon.svg"
                alt=""
                width={34}
                height={38}
                className="w-[34px] h-[38px] object-contain hover:opacity-85 transition-opacity"
              />
            </Link>
          </div>
        </div>

        {notice && (
          <p
            role="status"
            className="mt-[6px] text-[13px] font-medium text-brand-alert"
          >
            {notice}
          </p>
        )}

        <div className="divider w-full desk:w-[601px] mt-[9px]" />
      </div>

      <div className="w-full flex items-start flex-wrap gap-x-[6.5px] gap-y-[10px] mt-[6px] desk:mt-[7px] desk:ml-[1px] ml-0">
        <div className="flex items-start gap-[6.5px] shrink-0">
          <GuaranteeIcon className="w-[32px] h-[32px]" />
          <p className="w-[180px] text-brand-link text-[12.5px] leading-[1.2] mt-[3px] shrink-0">
            <strong className="text-brand-dark font-semibold">
              BanglaShoppers’s Guarantee
            </strong>
            <br />
            100% Authentic Brand Product
          </p>
        </div>

        <div className="flex min-w-0 max-w-full items-start gap-[6.5px]">
          <ReturnPolicyIcon className="w-[32px] h-[32px] shrink-0" />
          <p className="flex min-w-0 gap-x-1 text-brand-link text-[12.5px] leading-[1.2] mt-[3px]">
            <strong className="shrink-0 text-brand-dark font-semibold">Return Policy:</strong>
            <span className="min-w-0">
              We accept returns or exchanges.
              <Link href="/terms/return-policy" className="block text-brand-alert hover:underline">
                Please read return policy here.
              </Link>
            </span>
          </p>
        </div>
      </div>

      <div className="divider w-full desk:w-[601px] mt-[6px] desk:ml-[3px] ml-0" />

      <div className="w-full desk:w-[599px] mt-[8px] desk:ml-[1px] ml-0">
        <NextImage
          src="/assets/images/pdp/cash_back_banner.png"
          alt=""
          width={599}
          height={200}
          className="w-full h-auto max-h-[200px] object-contain block"
        />
      </div>

      <div className="divider w-full desk:w-[601px] mt-[10px] desk:ml-[3px] ml-0" />

      <Modal
        open={liveStockOpen}
        onClose={() => setLiveStockOpen(false)}
        title="Live Stock"
        quick
      >
        <table className="-mx-5 -my-4 w-[calc(100%+2.5rem)] table-fixed text-center text-[14px]">
          <caption className="sr-only">Stock by location</caption>
          <thead>
            <tr className="bg-brand-surface text-[12px] font-bold uppercase tracking-[0.06em] text-brand-dark">
              <th scope="col" className="w-1/2 px-5 py-2.5">
                Location
              </th>
              <th scope="col" className="w-1/2 px-5 py-2.5">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {liveStock.map((row) => (
              <tr
                key={row.location}
                className="border-b border-card-border last:border-0"
              >
                <td className="px-5 py-3 text-brand-dark">{row.location}</td>
                <td
                  className={`px-5 py-3 font-bold ${row.available ? "text-success" : "text-footer-text"}`}
                >
                  {row.available ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
}

export default ProductSummary;
