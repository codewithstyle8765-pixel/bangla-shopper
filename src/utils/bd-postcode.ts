import type { BdDivision } from "@/types/storefront";

/** postcode → [division, district, thana, post office] (Bangladesh Post data, English names). */
export type PostcodeTable = Record<string, [string, string, string, string]>;

let table: Promise<PostcodeTable> | null = null;

/** Loaded on demand (its own ~15KB chunk) the first time a Bangladesh address form opens. */
export function loadPostcodes(): Promise<PostcodeTable> {
  table ??= import("@/data/bd-postcodes.json").then((m) => m.default as unknown as PostcodeTable);
  return table;
}

/** Older/newer spellings used by the post office data vs the store's location list. */
const ALIASES: Array<[RegExp, string]> = [
  [/chittagong/g, "chattogram"],
  [/barisal/g, "barishal"],
  [/comilla/g, "cumilla"],
  [/jessore/g, "jashore"],
  [/bogra/g, "bogura"],
];

/** Compare names regardless of case, spacing, punctuation, spelling variant or a "TSO" (town sub office) suffix. */
export function normName(name: string): string {
  let n = name.toLowerCase().replace(/\btso\b|tso$/g, "");
  for (const [from, to] of ALIASES) n = n.replace(from, to);
  return n.replace(/[^a-z0-9]/g, "");
}

const findName = (names: string[], wanted: string) => names.find((n) => normName(n) === normName(wanted));

export interface PostcodeMatch {
  /** Names as they appear in the store's lists; a level is missing when the list does not have it. */
  region?: string;
  city?: string;
  thana?: string;
  /** "Banani TSO, Gulshan, Dhaka" for the hint under the field. */
  label: string;
}

/** Bangladesh postcode → Division / City / Area from the store's lists (the area may be the thana or the post office). */
export function locatePostcode(postcodes: PostcodeTable, postcode: string, locations: BdDivision[]): PostcodeMatch | null {
  const row = postcodes[postcode];
  if (!row) return null;
  const [division, district, thana, office] = row;
  const div = locations.find((d) => normName(d.name) === normName(division));
  const city = div?.cities.find((c) => normName(c.name) === normName(district));
  /* The post office ("Banani TSO") is more precise than its thana ("Gulshan") when the store lists both. */
  const area = city ? (findName(city.areas, office) ?? findName(city.areas, thana)) : undefined;
  const parts = [office.replace(/\s*-?\s*TSO$/i, ""), thana, city?.name ?? district];
  const label = parts.filter((p, i) => parts.findIndex((q) => normName(q) === normName(p)) === i).join(", ");
  return { region: div?.name, city: city?.name, thana: area, label };
}

/** Postcodes for a chosen City / Area: several when the thana has more than one post office. */
export function postcodesForArea(postcodes: PostcodeTable, city: string, area: string): Array<{ postcode: string; office: string }> {
  const c = normName(city);
  const a = normName(area);
  return Object.entries(postcodes)
    .filter(([, [, district, thana, office]]) => normName(district) === c && (normName(thana) === a || normName(office) === a))
    .map(([postcode, [, , , office]]) => ({ postcode, office }));
}

/** Find default/primary postcode for a city/district (prefers Sadar/GPO or head office). */
export function defaultPostcodeForCity(postcodes: PostcodeTable, city: string): { postcode: string; office: string } | null {
  const c = normName(city);
  const entries = Object.entries(postcodes).filter(([, [, district]]) => normName(district) === c);
  if (entries.length === 0) return null;

  // 1. Look for GPO or Sadar
  const sadar = entries.find(([, [, , , office]]) => /gpo\b|sadar/i.test(office));
  if (sadar) return { postcode: sadar[0], office: sadar[1][3] };

  // 2. Look for round number (ending in 00)
  const round = entries.find(([code]) => /00$/.test(code));
  if (round) return { postcode: round[0], office: round[1][3] };

  // 3. Fallback to first
  return { postcode: entries[0][0], office: entries[0][1][3] };
}

/** Find postcode for an area/office within a city and optional thana. */
export function findPostcodeForArea(
  postcodes: PostcodeTable,
  city: string,
  area: string,
  thana?: string,
): { postcode: string; office: string } | null {
  if (!city || !area) return null;
  const c = normName(city);
  const a = normName(area);
  const t = thana ? normName(thana) : "";

  const matches = Object.entries(postcodes).filter(([, [, district, th, office]]) => {
    if (normName(district) !== c) return false;
    const cleanOffice = normName(office.replace(/\s*-?\s*TSO$/i, ""));
    const rawOffice = normName(office);
    const thName = normName(th);

    if (t && thName !== t && rawOffice !== t && cleanOffice !== t) {
      return rawOffice === a || cleanOffice === a;
    }
    return rawOffice === a || cleanOffice === a || thName === a;
  });

  if (matches.length > 0) {
    const exact = matches.find(([, [, , , office]]) => {
      const cleanOffice = normName(office.replace(/\s*-?\s*TSO$/i, ""));
      return cleanOffice === a || normName(office) === a;
    });
    const chosen = exact ?? matches[0];
    return { postcode: chosen[0], office: chosen[1][3] };
  }

  return null;
}

