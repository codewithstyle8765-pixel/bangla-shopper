"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars } from "@/packages/module-common/RatingStars";
import { useCart } from "@/packages/module-quote/context/CartContext";

export interface ProductCardProps {
  id?: string | number;
  sku?: string;
  name: string;
  urlKey?: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  origin?: string;
  inStock?: boolean;
  /** fixed: 207px (carousels). fluid: fills its grid cell. */
  layout?: "fixed" | "fluid";
  ctaLabel?: string;
  onAddToCart?: (sku: string) => Promise<void> | void;
  className?: string;
}

export function ProductCard({
  sku = "MLIH05",
  name,
  urlKey = "absolute-new-york-matte-lipstick",
  image = "/assets/images/catalog/hostile.png",
  price,
  originalPrice,
  rating = 0,
  reviewCount = 0,
  origin,
  inStock = true,
  layout = "fixed",
  ctaLabel = "Add to Cart",
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const fluid = layout === "fluid";
  const inset = fluid ? "ml-[9px] mr-[8px]" : "ml-[9px]";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsAdding(true);
      if (onAddToCart) await onAddToCart(sku);
      else await addItem(sku, 1);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={clsx(
        "@container group/card card-surface select-none flex flex-col overflow-hidden font-sans text-[11.78px] leading-none text-brand-charcoal",
        "p-[11px_3px]",
        fluid ? "h-full w-full min-w-0" : "w-[207px] h-[374px] shrink-0",
        className,
      )}
    >
      <Link href={`/product/${urlKey}`} className="block">
        <div className={clsx("relative overflow-hidden bg-white", inset, fluid ? "aspect-square" : "w-[182px] h-[182px]")}>
          <div className="h-full w-full transition-transform duration-500 ease-(--ease-panel) group-hover/card:scale-110 motion-reduce:transition-none">
            <NextImage
              src={image}
              alt={name}
              width={182}
              height={182}
              sizes={fluid ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px" : "182px"}
              className={clsx("object-contain block", fluid ? "w-full h-full" : "w-[182px] h-[182px]")}
            />
          </div>
        </div>

        <div className={clsx("flex items-start mt-[7px] h-[14px]", inset)}>
          <RatingStars value={rating} size={14} gap={5.3} className="w-[92px] mr-[5px] shrink-0" />
          <span aria-hidden="true" className="mt-[2px] min-w-0 text-brand-coral font-medium tracking-normal whitespace-nowrap truncate @max-[198px]:hidden">
            {reviewCount.toLocaleString()} (Reviews)
          </span>
          <span aria-hidden="true" className="mt-[2px] hidden text-brand-coral font-semibold tracking-normal whitespace-nowrap @max-[198px]:inline">
            {rating.toFixed(1)}/5
          </span>
          <span className="sr-only">
            Rated {rating.toFixed(1)} out of 5 from {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <h3
          title={name}
          className={clsx(
            "h-[calc(11.78px*1.2*4)] mt-[7px] font-medium leading-[1.2] tracking-[0.1em] line-clamp-4 break-words",
            inset,
            !fluid && "w-[190px]",
          )}
        >
          {name}
        </h3>

        <div
          className={clsx(
            "flex mt-[6px] tracking-[0.1em]",
            fluid ? "ml-[8px] mr-[8px] h-[18px] items-baseline @max-[230px]:tracking-normal" : "ml-[8px] items-start flex-wrap",
          )}
        >
          <span className={clsx("min-h-[18px] text-brand-alert text-[15.71px] font-bold whitespace-nowrap", fluid ? "mr-[5px] shrink-0 @max-[230px]:text-[14.5px] @max-[175px]:text-[13.5px]" : "mr-[6px]")}>
            TK{price.toLocaleString()}
            <sup>.00</sup>
          </span>
          {originalPrice && originalPrice > price && (
            <span className={clsx("text-price-strikethrough font-medium line-through whitespace-nowrap", fluid ? "min-w-0 truncate @max-[230px]:text-[10.5px] @max-[175px]:text-[10px]" : "mt-[4px]")}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  (TK {originalPrice.toLocaleString()}.00)
            </span>
          )}
        </div>

        <p className={clsx("mt-[3px] h-[10.8px] text-[10.8px] font-medium tracking-[0.1em] whitespace-nowrap truncate", inset)}>
          {origin && (
            <>
              Product Origin: <span className="text-brand-link">{origin}</span>
            </>
          )}
        </p>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding || !inStock}
        className={clsx(
          "btn-dark block h-[40px] shrink-0 text-center text-[16.68px] leading-[38px] font-semibold tracking-normal cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
          inset,
          "mt-[4px]",
          !fluid && "w-[181px]",
        )}
      >
        {!inStock ? "Sold Out" : isAdding ? "Adding..." : ctaLabel}
      </button>
    </article>
  );
}

export default ProductCard;
