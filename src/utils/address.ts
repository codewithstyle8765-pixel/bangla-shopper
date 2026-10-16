import type { AddressInput } from "@/types/storefront";

export const DEFAULT_COUNTRY = "BD";

/** Address form field keys (also the FormData names, optionally prefixed). */
export const ADDRESS_FIELDS = [
  "fullName",
  "firstName",
  "lastName",
  "phone",
  "countryCode",
  "region",
  "city",
  "thana",
  "area",
  "postcode",
  "street0",
] as const;

export type AddressField = (typeof ADDRESS_FIELDS)[number];

export const EMPTY_ADDRESS: AddressInput = {
  fullName: "",
  firstName: "",
  lastName: "",
  phone: "",
  street: [""],
  city: "",
  countryCode: DEFAULT_COUNTRY,
  region: "",
  postcode: "",
  thana: "",
  area: "",
};

/** Strip spaces, dashes, brackets and a leading "+" (client site asks for digits only). */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-()+]/g, "");
}

const BD_PHONE = /^(?:88)?01[3-9]\d{8}$/;
const INTL_PHONE = /^\d{7,15}$/;

export function readAddress(formData: FormData, prefix = ""): AddressInput {
  const get = (key: string) => String(formData.get(`${prefix}${key}`) ?? "").trim();
  const rawFullName = get("fullName");
  let first = get("firstName");
  let last = get("lastName");
  if (rawFullName && (!first || !last)) {
    const parts = rawFullName.split(/\s+/).filter(Boolean);
    first = parts[0] ?? "";
    last = parts.slice(1).join(" ") || first || ".";
  }
  const street0 = get("street0") || get("street");
  const area = get("area");
  const thana = get("thana");
  return {
    fullName: rawFullName || `${first} ${last}`.trim(),
    firstName: first,
    lastName: last,
    street: [street0],
    countryCode: get("countryCode") || DEFAULT_COUNTRY,
    region: get("region") || undefined,
    city: get("city"),
    postcode: get("postcode") || undefined,
    phone: normalizePhone(get("phone")),
    thana,
    area: area || undefined,
  };
}

/** Returns field errors keyed by AddressField (prefix applied by the caller). `requireRegion`: the division picker is shown. */
export function validateAddress(a: AddressInput, { requireRegion = false } = {}): Partial<Record<AddressField, string>> {
  const errors: Partial<Record<AddressField, string>> = {};
  if (!a.fullName && !a.firstName) errors.fullName = "Your full name is required.";
  if (!a.phone) errors.phone = "Phone number is required.";
  const phoneOk = a.countryCode === "BD" ? BD_PHONE.test(a.phone) : INTL_PHONE.test(a.phone);
  if (a.phone && !phoneOk) {
    errors.phone = a.countryCode === "BD" ? "Enter a valid number, e.g. 8801712345678 or 01712345678." : "Enter a valid phone number (digits only).";
  }
  if (!a.countryCode) errors.countryCode = "Select a country.";
  if (requireRegion && !a.region) errors.region = "Select a division.";
  if (!a.city) errors.city = requireRegion ? "Select a city / district." : "City is required.";
  if (!a.thana) errors.thana = requireRegion ? "Select a thana / upazila." : "Thana / Upazila is required.";
  if (a.postcode && a.countryCode === "BD" && !/^\d{4}$/.test(a.postcode)) errors.postcode = "Enter the 4-digit postal code, e.g. 1213.";
  if (!a.street[0]) errors.street0 = "Street address is required.";
  return errors;
}

export function prefixErrors(errors: Record<string, string | undefined>, prefix: string): Record<string, string> {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v).map(([k, v]) => [`${prefix}${k}`, v as string]));
}

/** Flatten an address into AddressField → value (form default values). */
export function addressToFields(a?: Partial<AddressInput>): Record<AddressField, string> {
  const first = a?.firstName ?? "";
  const last = a?.lastName ?? "";
  const name = a?.fullName || [first, last].filter(Boolean).join(" ");
  return {
    fullName: name,
    firstName: first,
    lastName: last,
    street0: a?.street?.[0] ?? "",
    countryCode: a?.countryCode ?? DEFAULT_COUNTRY,
    region: a?.region ?? "",
    city: a?.city ?? "",
    postcode: a?.postcode ?? "",
    phone: a?.phone ?? "",
    thana: a?.thana ?? "",
    area: a?.area ?? "",
  };
}

export function formatAddressLines(a: AddressInput, countryName?: string): string[] {
  return [
    ...a.street.filter(Boolean),
    [a.area, a.thana, a.city, a.region && a.region !== a.city ? a.region : ""].filter(Boolean).join(", ") + (a.postcode ? ` - ${a.postcode}` : ""),
    countryName ?? a.countryCode,
  ];
}
