"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { formatMoney } from "@/utils/format";

const CurrencyContext = createContext("");

/** Store currency symbol from Magento (StoreSettings), set once in the root layout. */
export function CurrencyProvider({ symbol, children }: { symbol: string; children: ReactNode }) {
  return <CurrencyContext.Provider value={symbol}>{children}</CurrencyContext.Provider>;
}

/** "TK". */
export const useCurrency = () => useContext(CurrencyContext);

/** `money(1399)` → "TK 1,399.00"; `money(1399, false)` → "TK 1,399". */
export function useMoney() {
  const symbol = useCurrency();
  return useCallback((value: number, withDecimals = true) => formatMoney(value, symbol, withDecimals), [symbol]);
}

/** A formatted amount; also usable from server components. */
export function Money({ value, decimals = true }: { value: number; decimals?: boolean }) {
  return <>{useMoney()(value, decimals)}</>;
}
