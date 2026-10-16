import type { Order } from "@/types/storefront";

/** The just-placed order, kept for the confirmation page (guests cannot query their order afterwards). Tab-scoped. */
const KEY = "bs_last_order";

export function saveLastOrder(order: Order) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {}
}

export function readLastOrder(number: string): Order | null {
  try {
    const order = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as Order | null;
    return order?.number === number ? order : null;
  } catch {
    return null;
  }
}
