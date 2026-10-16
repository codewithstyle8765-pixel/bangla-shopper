"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from "react";
import type { ActionResult, Cart, CartLine } from "@/types/storefront";
import { callApi } from "@/utils/api/client";

export type CartItem = CartLine;

interface CartContextValue {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cart: Cart;
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  isLoaded: boolean;
  isUpdating: boolean;
  error: string | null;
  clearError: () => void;
  addItem: (sku: string, quantity?: number, options?: { openDrawer?: boolean; selectedOptions?: string[] }) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  applyCoupon: (code: string) => Promise<ActionResult<Cart>>;
  removeCoupon: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

const EMPTY_CART: Cart = { id: null, items: [], totalQuantity: 0, subtotal: 0, discount: 0 };

const CartContext = createContext<CartContextValue | undefined>(undefined);

/** Client cart state. Every change goes through `/api/graphql`; the server-side cart is the source of truth. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, startTransition] = useTransition();

  /** `local`: the caller shows the error itself (e.g. coupon form), so it is not shared with other views. */
  const apply = useCallback((result: ActionResult<Cart>, local = false) => {
    if (result.ok) {
      setCart(result.data);
      if (!local) setError(null);
      return true;
    }
    if (!local) setError(result.message);
    return false;
  }, []);

  const refreshCart = useCallback(async () => {
    apply(await callApi("Cart"));
    setIsLoaded(true);
  }, [apply]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const run = useCallback(
    (action: () => Promise<ActionResult<Cart>>, local = false) =>
      new Promise<ActionResult<Cart>>((resolve) => {
        startTransition(async () => {
          const result = await action();
          apply(result, local);
          resolve(result);
        });
      }),
    [apply],
  );

  const addItem = useCallback<CartContextValue["addItem"]>(
    async (sku, quantity = 1, options) => {
      const result = await run(() => callApi("AddToCart", { sku, quantity, selectedOptions: options?.selectedOptions ?? [] }));
      if (result.ok && options?.openDrawer !== false) setIsCartOpen(true);
      return result.ok;
    },
    [run],
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => (await run(() => callApi("UpdateCartItem", { itemId, quantity }))).ok,
    [run],
  );
  const removeItem = useCallback(async (itemId: string) => (await run(() => callApi("RemoveCartItem", { itemId }))).ok, [run]);
  const applyCoupon = useCallback((code: string) => run(() => callApi("ApplyCoupon", { code }), true), [run]);
  const removeCoupon = useCallback(async () => (await run(() => callApi("RemoveCoupon"), true)).ok, [run]);

  const value = useMemo<CartContextValue>(
    () => ({
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toggleCart: () => setIsCartOpen((v) => !v),
      cart,
      items: cart.items,
      totalCount: cart.totalQuantity,
      subtotal: cart.subtotal,
      isLoaded,
      isUpdating,
      error,
      clearError: () => setError(null),
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      refreshCart,
    }),
    [isCartOpen, cart, isLoaded, isUpdating, error, addItem, removeItem, updateQuantity, applyCoupon, removeCoupon, refreshCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
