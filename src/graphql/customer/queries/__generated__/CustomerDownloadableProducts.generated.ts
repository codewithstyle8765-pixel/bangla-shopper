import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CustomerDownloadableProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomerDownloadableProductsQuery = { __typename?: 'Query', customerDownloadableProducts?: { __typename?: 'CustomerDownloadableProducts', items?: Array<{ __typename?: 'CustomerDownloadableProduct', date?: string | null, download_url?: string | null, order_increment_id?: string | null, remaining_downloads?: string | null, status?: string | null } | null> | null } | null };


export const CustomerDownloadableProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerDownloadableProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerDownloadableProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"download_url"}},{"kind":"Field","name":{"kind":"Name","value":"order_increment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_downloads"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<CustomerDownloadableProductsQuery, CustomerDownloadableProductsQueryVariables>;