import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetVaultConfigQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetVaultConfigQuery = { __typename?: 'Query', getVaultConfig?: { __typename?: 'VaultConfigOutput', credit_card?: { __typename?: 'VaultCreditCardConfig', is_vault_enabled?: boolean | null, three_ds_mode?: Types.ThreeDsMode | null, sdk_params?: Array<{ __typename?: 'SDKParams', name?: string | null, value?: string | null } | null> | null } | null } | null };


export const GetVaultConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVaultConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVaultConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credit_card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_vault_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"sdk_params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"three_ds_mode"}}]}}]}}]}}]} as unknown as DocumentNode<GetVaultConfigQuery, GetVaultConfigQueryVariables>;