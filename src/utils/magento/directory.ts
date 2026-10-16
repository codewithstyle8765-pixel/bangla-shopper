import { BD_LOCATIONS_QUERY, COUNTRIES_QUERY } from "@/graphql/directory";
import type { BdDivision } from "@/types/storefront";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import type { SelectOption } from "@/packages/module-common/form/Field";
import { getPageCacheConfig } from "@/utils/hooks/useCache";

/** Countries shown first, matching the client store's checkout. */
const PRIORITY = ["BD", "AE", "GB", "US"];

export async function getCountries(): Promise<SelectOption[]> {
  try {
    const data = await graphqlRequestCached<{ countries: Array<{ id: string; full_name_english: string }> }>(
      COUNTRIES_QUERY,
      {},
      getPageCacheConfig("static"),
    );
    const options = data.countries
      .filter((c) => c.full_name_english)
      .map((c) => ({ value: c.id, label: c.full_name_english }));
    const top = PRIORITY.map((id) => options.find((o) => o.value === id)).filter((o): o is SelectOption => Boolean(o));
    const rest = options.filter((o) => !PRIORITY.includes(o.value)).sort((a, b) => a.label.localeCompare(b.label));
    return [...top, ...rest];
  } catch (error) {
    console.error("[magento] countries failed", error);
    return [{ value: "BD", label: "Bangladesh" }];
  }
}

export function countryName(countries: SelectOption[], code: string): string {
  return countries.find((c) => c.value === code)?.label ?? code;
}

/** Division → City → Area for Bangladesh addresses; empty on failure, and the form falls back to free text. */
export async function getBdLocations(): Promise<BdDivision[]> {
  try {
    const data = await graphqlRequestCached<{ bdLocations: { divisions: BdDivision[] } | null }>(BD_LOCATIONS_QUERY, {}, getPageCacheConfig("static"));
    return data.bdLocations?.divisions ?? [];
  } catch (error) {
    console.error("[magento] Bangladesh locations failed", error);
    return [];
  }
}
