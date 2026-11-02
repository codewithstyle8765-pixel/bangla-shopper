import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CustomerPaymentTokensQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomerPaymentTokensQuery = { __typename?: 'Query', customerPaymentTokens?: { __typename?: 'CustomerPaymentTokens', items: Array<{ __typename?: 'PaymentToken', details?: string | null, payment_method_code: string, public_hash: string, type: Types.PaymentTokenTypeEnum } | null> } | null };


export const CustomerPaymentTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerPaymentTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerPaymentTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method_code"}},{"kind":"Field","name":{"kind":"Name","value":"public_hash"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<CustomerPaymentTokensQuery, CustomerPaymentTokensQueryVariables>;