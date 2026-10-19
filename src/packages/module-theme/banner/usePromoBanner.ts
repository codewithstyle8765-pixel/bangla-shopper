"use client";

import { useEffect, useState } from "react";
import { PromoBannerData } from "./promoBanner.types";
import { MOCK_PROMO_BANNER } from "@/mocks/promoBanner";

/**
 * Hook to retrieve the current active promotional popup banner.
 *
 * CURRENT: Returns mock data with simulated loading.
 * FUTURE MAGENTO INTEGRATION:
 * Replace the MOCK_PROMO_BANNER call with your Apollo Client GraphQL query
 * (e.g., query GetPromoBanner { promoBanner { isEnabled, imageUrl, ... } })
 * or REST fetch.
 */
export function usePromoBanner() {
  const [data, setData] = useState<PromoBannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulated async fetch to reflect real API behavior
    const timer = setTimeout(() => {
      // Toggle here or read from API
      setData(MOCK_PROMO_BANNER);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    banner: data,
    loading,
    isEnabled: Boolean(data?.isEnabled),
  };
}
