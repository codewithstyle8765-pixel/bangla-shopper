import type { CartLine } from "@/types/storefront";

/** "Size: 236 ml" under a cart line's name; each size of a product is its own line. */
export function CartLineOptions({ options, className = "" }: { options?: CartLine["options"]; className?: string }) {
  if (!options?.length) return null;
  return (
    <p className={`flex flex-wrap gap-x-3 text-[12px] leading-[1.4] text-footer-text ${className}`}>
      {options.map((o) => (
        <span key={o.label}>
          {o.label}: <strong className="font-semibold text-brand-dark">{o.value}</strong>
        </span>
      ))}
    </p>
  );
}

export default CartLineOptions;
