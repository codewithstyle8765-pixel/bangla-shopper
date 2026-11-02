import { StoreSettingsDocument, type StoreSettingsQuery, type StoreSettingsQueryVariables } from "@/graphql/store/queries/__generated__/StoreSettings.generated";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import { getPageCacheConfig } from "@/utils/hooks/useCache";

export interface StoreSettings {
  /** "BDT". */
  currencyCode: string;
  /** "TK"; what prices are shown with. */
  currencySymbol: string;
}

/** Store settings from Magento; on failure prices show the currency code, or no symbol if that is missing too. */
export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const { storeConfig, currency } = await graphqlRequestCached<StoreSettingsQuery, StoreSettingsQueryVariables>(
      StoreSettingsDocument,
      {},
      getPageCacheConfig("store"),
    );
    const currencyCode = storeConfig?.default_display_currency_code ?? "";
    return { currencyCode, currencySymbol: currency?.default_display_currency_symbol || currencyCode };
  } catch (error) {
    console.error("[magento] store settings failed", error);
    return { currencyCode: "", currencySymbol: "" };
  }
}
