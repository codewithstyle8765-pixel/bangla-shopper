import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MergeGuestCartMutationVariables = Types.Exact<{
  source: Types.Scalars['String']['input'];
  destination: Types.Scalars['String']['input'];
}>;


export type MergeGuestCartMutation = { __typename?: 'Mutation', mergeCarts: { __typename?: 'Cart', id: string } };


export const MergeGuestCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MergeGuestCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"destination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mergeCarts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source_cart_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"destination_cart_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"destination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MergeGuestCartMutation, MergeGuestCartMutationVariables>;