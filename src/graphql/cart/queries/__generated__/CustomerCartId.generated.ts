import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CustomerCartIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomerCartIdQuery = { __typename?: 'Query', customerCart: { __typename?: 'Cart', id: string } };


export const CustomerCartIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerCartId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CustomerCartIdQuery, CustomerCartIdQueryVariables>;