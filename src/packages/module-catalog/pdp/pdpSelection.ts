"use client";

import { useSyncExternalStore } from "react";

/** The variant picked in the summary's option pickers, shared with the phone buy bar. */
export interface PdpSelection {
  /** Option value uids, sent with Add to Cart. */
  selectedOptions: string[];
  /** Picked value labels in option order, e.g. ["Black", "38C"]. */
  labels: string[];
  /** Every option has a value and that combination exists. */
  complete: boolean;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

let selections: Record<string, PdpSelection> = {};
const listeners = new Set<() => void>();

export function setPdpSelection(sku: string, selection: PdpSelection) {
  selections = { ...selections, [sku]: selection };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePdpSelection(sku: string): PdpSelection | undefined {
  return useSyncExternalStore(subscribe, () => selections[sku], () => undefined);
}
