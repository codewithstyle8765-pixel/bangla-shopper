import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      id
      full_name_english
    }
  }
`;

/** Custom (placeholder) Bangladesh location tree; adjust to the backend's schema when it ships. */
export const BD_LOCATIONS_QUERY = gql`
  query BangladeshLocations {
    bdLocations {
      divisions { name cities { name areas } }
    }
  }
`;
