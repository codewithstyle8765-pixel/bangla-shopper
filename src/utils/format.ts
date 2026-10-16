export function formatTk(value: number, withDecimals = true): string {
  return `TK ${value.toLocaleString("en-US", {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  })}`;
}

/** Price filter value "300_500" → "TK 300 – TK 500"; open ends read "TK 2,000+" / "Up to TK 500". */
export function formatPriceRange(value: string): string {
  const [from, to] = value.split("_");
  const lo = Number(from) || 0;
  if (!to || to === "*") return `${formatTk(lo, false)}+`;
  return lo ? `${formatTk(lo, false)} – ${formatTk(Number(to), false)}` : `Up to ${formatTk(Number(to), false)}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
