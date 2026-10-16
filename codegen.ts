import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
dotenv.config();

const schemaUrl = process.env.NEXT_SERVER_MAGENTO_ENDPOINT;

if (!schemaUrl) {
  console.warn("⚠️ NEXT_SERVER_MAGENTO_ENDPOINT environment variable is not set");
}

/**
 * Run `npm run generate` once the Magento endpoint is reachable.
 *
 * - Base schema types  → src/types/graphql-types.ts
 * - Per-document types → src/graphql/<domain>/__generated__/index.generated.ts
 *   (typed `XxxDocument` + `XxxQuery` / `XxxMutation` / `...Variables`)
 *
 * Documents are the active `gql` operations in src/graphql/<domain>/index.ts
 * (catalog, cart, checkout, customer, cms). Operation names there are the
 * same keys the FALLBACK_MODE mocks resolve, so generation does not affect mocks.
 * Legacy *.graphql files in src/graphql are not imported by the app and are
 * excluded until they are reviewed against the live schema.
 */
const config: CodegenConfig = {
  schema: schemaUrl || "http://192.168.15.123/m248p4/pub/graphql",
  documents: ["./src/graphql/*/index.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/types/graphql-types.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: false,
        maybeValue: "T | null",
      },
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "src/types/graphql-types.ts",
        extension: ".generated.ts",
        folder: "__generated__",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
