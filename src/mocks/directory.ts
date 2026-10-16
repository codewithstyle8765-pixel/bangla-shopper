import { MOCK_BD_LOCATIONS } from "./bd-locations";

const COUNTRIES: Array<[string, string]> = [
  ["BD", "Bangladesh"],
  ["AE", "United Arab Emirates"],
  ["GB", "United Kingdom"],
  ["US", "United States"],
  ["AU", "Australia"],
  ["CA", "Canada"],
  ["IN", "India"],
  ["MY", "Malaysia"],
  ["SA", "Saudi Arabia"],
  ["SG", "Singapore"],
];

export const directoryResolvers = {
  Countries: () => ({ countries: COUNTRIES.map(([id, full_name_english]) => ({ id, full_name_english })) }),
  BangladeshLocations: () => ({ bdLocations: { divisions: MOCK_BD_LOCATIONS } }),
};
