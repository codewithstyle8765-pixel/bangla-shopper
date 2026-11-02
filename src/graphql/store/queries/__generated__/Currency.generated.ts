import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CurrencyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrencyQuery = { __typename?: 'Query', currency?: { __typename?: 'Currency', available_currency_codes?: Array<string | null> | null, base_currency_code?: string | null, base_currency_symbol?: string | null, default_display_currency_code?: string | null, default_display_currency_symbol?: string | null, exchange_rates?: Array<{ __typename?: 'ExchangeRate', currency_to?: string | null, rate?: number | null } | null> | null } | null };


export const CurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available_currency_codes"}},{"kind":"Field","name":{"kind":"Name","value":"base_currency_code"}},{"kind":"Field","name":{"kind":"Name","value":"base_currency_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"default_display_currency_code"}},{"kind":"Field","name":{"kind":"Name","value":"default_display_currency_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"exchange_rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency_to"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]}}]}}]} as unknown as DocumentNode<CurrencyQuery, CurrencyQueryVariables>;