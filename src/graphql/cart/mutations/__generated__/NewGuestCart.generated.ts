import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type NewGuestCartMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type NewGuestCartMutation = { __typename?: 'Mutation', createEmptyCart?: string | null };


export const NewGuestCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewGuestCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmptyCart"}}]}}]} as unknown as DocumentNode<NewGuestCartMutation, NewGuestCartMutationVariables>;