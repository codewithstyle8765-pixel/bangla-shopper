import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RevokeCustomerTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type RevokeCustomerTokenMutation = { __typename?: 'Mutation', revokeCustomerToken?: { __typename?: 'RevokeCustomerTokenOutput', result: boolean } | null };


export const RevokeCustomerTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeCustomerToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeCustomerToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RevokeCustomerTokenMutation, RevokeCustomerTokenMutationVariables>;