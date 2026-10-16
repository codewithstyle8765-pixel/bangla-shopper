"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/packages/module-common/button/Button";
import { useCart } from "@/packages/module-quote/context/CartContext";
import type { OrderLine } from "@/types/storefront";

interface ReorderActionProps {
  items: OrderLine[];
  className?: string;
}

export function ReorderAction({ items, className = "" }: ReorderActionProps) {
  const { addItem, openCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReorder = async () => {
    if (!items.length || loading) return;
    setLoading(true);
    try {
      for (const item of items) {
        await addItem(item.sku, item.quantity, { openDrawer: false });
      }
      openCart();
    } catch {
      router.push("/cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      size="sm"
      loading={loading}
      disabled={loading || items.length === 0}
      onClick={handleReorder}
      className={`!rounded-[4px] !h-9 !px-4 !text-[13px] font-semibold gap-1.5 justify-center ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 21h5v-5" />
      </svg>
      <span>Reorder</span>
    </Button>
  );
}

export function PrintOrderAction({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`flex h-11 items-center justify-center gap-2 rounded-[4px] px-5 text-[14px] font-semibold transition-colors cursor-pointer border-2 border-card-border text-brand-dark hover:border-brand-dark bg-white ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" />
      </svg>
      <span>Print Order</span>
    </button>
  );
}
