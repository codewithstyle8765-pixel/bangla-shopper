import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
dotenv.config();

const schemaUrl = process.env.NEXT_SERVER_MAGENTO_ENDPOINT;

if (!schemaUrl) {
  console.warn("NEXT_SERVER_MAGENTO_ENDPOINT environment variable is not set");
  process.exit(0);
}

const config: CodegenConfig = {
  schema: schemaUrl,
  documents: ["./src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "src/types/graphql-types.ts": {
      plugins: ["typescript"],
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
