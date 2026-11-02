import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CustomerGroupQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomerGroupQuery = { __typename?: 'Query', customerGroup: { __typename?: 'CustomerGroupStorefront', uid: string } };


export const CustomerGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<CustomerGroupQuery, CustomerGroupQueryVariables>;