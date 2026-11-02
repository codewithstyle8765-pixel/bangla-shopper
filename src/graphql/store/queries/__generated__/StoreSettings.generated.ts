import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type StoreSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StoreSettingsQuery = { __typename?: 'Query', storeConfig?: { __typename?: 'StoreConfig', store_code?: string | null, locale?: string | null, default_display_currency_code?: string | null } | null, currency?: { __typename?: 'Currency', default_display_currency_symbol?: string | null } | null };


export const StoreSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StoreSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storeConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store_code"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"default_display_currency_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default_display_currency_symbol"}}]}}]}}]} as unknown as DocumentNode<StoreSettingsQuery, StoreSettingsQueryVariables>;