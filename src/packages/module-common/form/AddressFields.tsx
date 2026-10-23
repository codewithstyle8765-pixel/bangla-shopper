"use client";

import { useEffect, useMemo, useState } from "react";
import { addressToFields, normalizePhone, validateAddress, type AddressField } from "@/utils/address";
import { loadPostcodes, postcodesForArea, findPostcodeForArea, type PostcodeTable } from "@/utils/bd-postcode";
import type { AddressInput, BdDivision } from "@/types/storefront";
import { SelectField, TextField, type SelectOption } from "./Field";

interface AddressFieldsProps {
  idPrefix: string;
  /** FormData name prefix, read back with `readAddress(formData, prefix)`. */
  namePrefix?: string;
  defaultValue?: Partial<AddressInput>;
  /** Server errors, shown until the field is edited. */
  errors?: Partial<Record<AddressField, string>>;
  countries: SelectOption[];
  /** Bangladesh Division → City → Area lists; when present, BD addresses use linked dropdowns instead of free text. */
  locations?: BdDivision[];
  onFieldChange?: (field: AddressField, value: string) => void;
  onValidityChange?: (valid: boolean) => void;
}

function toAddress(v: Record<AddressField, string>): AddressInput {
  const rawFullName = (v.fullName || "").trim();
  const parts = rawFullName.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || v.firstName.trim();
  const lastName = parts.slice(1).join(" ") || v.lastName.trim() || firstName || ".";
  return {
    fullName: rawFullName || `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    street: [v.street0.trim()],
    countryCode: v.countryCode,
    region: v.region.trim() || undefined,
    city: v.city.trim(),
    postcode: v.postcode.trim() || undefined,
    phone: normalizePhone(v.phone),
    thana: v.thana.trim(),
    area: v.area.trim() || undefined,
  };
}

/** Magento address fields incl. custom `thana_name`. Errors show after blur, then live. */
const options = (names: string[]): SelectOption[] => names.map((n) => ({ value: n, label: n }));

/** Keeps a saved value selectable even when it is missing from the list (e.g. an older free-text address). */
const withCurrent = (list: SelectOption[], value: string) => (value && !list.some((o) => o.value === value) ? [{ value, label: value }, ...list] : list);

const isThanaNotListed = (t?: string) => t === "Thana is not listed" || t === "My thana not listed";
const isAreaNotListed = (a?: string) => a === "Area is not listed" || a === "My area not listed";

export function AddressFields({ idPrefix, namePrefix = "", defaultValue, errors = {}, countries, locations = [], onFieldChange, onValidityChange }: AddressFieldsProps) {
  const [values, setValues] = useState(() => {
    const fields = addressToFields(defaultValue);
    /* Addresses saved before divisions existed: infer the division from a known city. */
    if (fields.countryCode === "BD" && !fields.region && fields.city) {
      const match = locations.find((d) => d.cities.some((c) => c.name === fields.city));
      if (match) fields.region = match.name;
    }
    return fields;
  });
  const [touched, setTouched] = useState<Partial<Record<AddressField, boolean>>>({});
  const [postcodes, setPostcodes] = useState<PostcodeTable | null>(null);
  const [edited, setEdited] = useState<Partial<Record<AddressField, boolean>>>({});

  /* Bangladesh with location data: Division → City → Thana dropdowns. */
  const picker = values.countryCode === "BD" && locations.length > 0;
  const division = locations.find((d) => d.name === values.region);
  const city = division?.cities.find((c) => c.name === values.city);
  const divisionOptions = withCurrent(options(locations.map((d) => d.name)), values.region);
  const cityOptions = withCurrent(options(division?.cities.map((c) => c.name) ?? []), values.city);
  const thanaOptions = useMemo(() => {
    const list = city?.areas ?? [];
    const baseOpts = options(list);
    if (list.length > 0 || values.city) {
      baseOpts.push({ value: "Thana is not listed", label: "Thana is not listed" });
    }
    return withCurrent(baseOpts, values.thana);
  }, [city?.areas, values.city, values.thana]);

  /* Post offices under the selected district & thana */
  const postOffices = useMemo(() => {
    if (!postcodes || !values.city || !values.thana || isThanaNotListed(values.thana)) return [];
    return postcodesForArea(postcodes, values.city, values.thana);
  }, [postcodes, values.city, values.thana]);

  const postOfficeOptions = useMemo(() => {
    if (!values.thana || isThanaNotListed(values.thana)) return [];
    const uniqueOffices = Array.from(new Set(postOffices.map((o) => o.office.replace(/\s*-?\s*TSO$/i, ""))));
    if (uniqueOffices.length === 0) return [];
    const baseOpts = options(uniqueOffices);
    baseOpts.push({ value: "Area is not listed", label: "Area is not listed" });
    return withCurrent(baseOpts, values.area);
  }, [postOffices, values.area, values.thana]);

  const clientErrors = useMemo(() => validateAddress(toAddress(values), { requireRegion: picker }), [values, picker]);
  const isValid = Object.keys(clientErrors).length === 0;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    if (picker) void loadPostcodes().then(setPostcodes, () => {});
  }, [picker]);

  const update = (field: AddressField, value: string) => {
    const v = values;
    const next = { ...v, [field]: value };
    const changed: AddressField[] = [field];

    /* When typing full name, update firstName and lastName */
    if (field === "fullName") {
      const parts = value.trim().split(/\s+/).filter(Boolean);
      const first = parts[0] ?? "";
      const last = parts.slice(1).join(" ") || first || ".";
      next.firstName = first;
      next.lastName = last;
      changed.push("firstName", "lastName");
    }

    /* A new division clears the city, thana, area and postcode below it. */
    if (picker && field === "region" && value !== v.region) {
      Object.assign(next, { city: "", thana: "", area: "", postcode: "" });
      changed.push("city", "thana", "area", "postcode");
    }
    /* A new city clears thana, area, and postcode without premature default postcode. */
    if (picker && field === "city" && value !== v.city) {
      Object.assign(next, { thana: "", area: "", postcode: "" });
      changed.push("thana", "area", "postcode");
    }
    /* Changing thana always resets dependent area and postcode */
    if (picker && field === "thana" && value !== v.thana) {
      next.area = "";
      next.postcode = "";
      if (!changed.includes("area")) changed.push("area");
      if (!changed.includes("postcode")) changed.push("postcode");

      /* If a valid listed thana is selected (not "Thana is not listed") */
      if (postcodes && value && !isThanaNotListed(value)) {
        const offices = postcodesForArea(postcodes, next.city, value);
        const uniqueOffices = Array.from(new Set(offices.map((o) => o.office.replace(/\s*-?\s*TSO$/i, ""))));
        /* If no areas are available under the selected thana, populate postcode based on the thana */
        if (uniqueOffices.length === 0) {
          const thanaMatch = offices[0] ?? findPostcodeForArea(postcodes, next.city, value);
          if (thanaMatch) {
            next.postcode = thanaMatch.postcode;
          }
        }
        /* If uniqueOffices.length > 0, do NOT populate postcode; wait until area is selected */
      }
    }
    /* Selecting an area populates postcode */
    if (picker && field === "area" && value !== v.area) {
      if (postcodes && value && !isAreaNotListed(value)) {
        const match = findPostcodeForArea(postcodes, next.city, value, next.thana);
        if (match) {
          next.postcode = match.postcode;
          if (!changed.includes("postcode")) changed.push("postcode");
        }
      } else if (isAreaNotListed(value)) {
        next.postcode = "";
        if (!changed.includes("postcode")) changed.push("postcode");
      }
    }

    setValues(next);
    setEdited((s) => ({ ...s, ...Object.fromEntries(changed.map((f) => [f, true])) }));
    for (const f of changed) onFieldChange?.(f, next[f]);
  };

  const base = (field: AddressField) => ({
    id: `${idPrefix}-${field}`,
    name: `${namePrefix}${field}`,
    value: values[field],
    error: (!edited[field] && errors[field]) || (touched[field] ? clientErrors[field] : undefined),
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
    reserveErrorSpace: true,
  });

  const props = (field: AddressField) => ({
    ...base(field),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(field, e.target.value),
  });

  const selectProps = (field: AddressField) => ({ ...base(field), onChange: (value: string) => update(field, value) });

  return (
    <>
      {/* Hidden inputs to preserve firstName and lastName for Magento */}
      <input type="hidden" name={`${namePrefix}firstName`} value={values.firstName} />
      <input type="hidden" name={`${namePrefix}lastName`} value={values.lastName} />

      <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
        {/* Full Name and Phone Number */}
        <TextField
          {...props("fullName")}
          label="Your Full Name"
          required
          autoComplete="name"
          placeholder="Enter your full name"
        />
        <TextField
          {...props("phone")}
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="8801XXXXXXXXX"
        />

        {/* Street Address right after Full Name and Phone Number; a single-line input so browser autofill fills it */}
        <TextField
          {...props("street0")}
          label="Street Address"
          required
          autoComplete="address-line1"
          placeholder="House / flat, road"
          wrapperClassName="sm:col-span-2"
        />

        {/* Country and Division */}
        <SelectField {...selectProps("countryCode")} label="Country" required options={countries} />
        {picker ? (
          <SelectField {...selectProps("region")} label="Division" required options={divisionOptions} placeholder="Select division" />
        ) : (
          <TextField {...props("region")} label="State / Province / Division" autoComplete="address-level1" />
        )}

        {/* City / District and Thana / Upazila */}
        {picker ? (
          <>
            <SelectField
              {...selectProps("city")}
              label="City / District"
              required
              options={cityOptions}
              placeholder={values.region ? "Select city / district" : "Select a division first"}
              disabled={!values.region}
            />
            <SelectField
              {...selectProps("thana")}
              label="Thana / Upazila"
              required
              options={thanaOptions}
              placeholder={values.city ? "Select thana / upazila" : "Select a city first"}
              disabled={!values.city}
            />
          </>
        ) : (
          <>
            <TextField {...props("city")} label="City / District" required autoComplete="address-level2" placeholder="e.g. Dhaka" />
            <TextField {...props("thana")} label="Thana / Upazila" required autoComplete="address-level3" placeholder="e.g. Banani" />
          </>
        )}

        {/* Area / Post Office and Postal Code */}
        {picker && values.thana && postOfficeOptions.length === 0 ? (
          <TextField
            {...props("area")}
            label="Area / Post Office"
            autoComplete="address-level4"
            placeholder="Enter your area / post office"
          />
        ) : picker ? (
          <SelectField
            {...selectProps("area")}
            label="Area / Post Office"
            options={postOfficeOptions}
            placeholder={values.thana ? "Select area / post office" : "Select thana first"}
            disabled={!values.thana}
          />
        ) : (
          <TextField
            {...props("area")}
            label="Area / Post Office"
            autoComplete="address-level4"
            placeholder="e.g. Banani TSO"
          />
        )}
        <TextField
          {...props("postcode")}
          label={values.countryCode === "BD" ? "Postal Code" : "Zip / Postal code"}
          inputMode="numeric"
          maxLength={values.countryCode === "BD" ? 4 : 10}
          autoComplete="postal-code"
          placeholder={values.countryCode === "BD" ? "e.g. 1213" : undefined}
        />
      </div>
    </>
  );
}

export default AddressFields;

