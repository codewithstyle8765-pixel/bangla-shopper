/** 1399 → "TK 1,399.00"; `symbol` is the store currency symbol from Magento (`useCurrency()` / `getStoreSettings()`). */
export function formatMoney(value: number, symbol: string, withDecimals = true): string {
  const amount = value.toLocaleString("en-US", {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  });
  return symbol ? `${symbol} ${amount}` : amount;
}

/** Price filter value "300_500" → "TK 300 – TK 500"; open ends read "TK 2,000+" / "Up to TK 500". */
export function formatPriceRange(value: string, symbol: string): string {
  const [from, to] = value.split("_");
  const lo = Number(from) || 0;
  const money = (v: number) => formatMoney(v, symbol, false);
  if (!to || to === "*") return `${money(lo)}+`;
  return lo ? `${money(lo)} – ${money(Number(to))}` : `Up to ${money(Number(to))}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/** "26 Oct 2026, 05:15 PM": 12-hour clock with a zero-padded hour and capital AM/PM. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${formatDate(iso)}, ${time}`;
}
