import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MobikulUpdateWishlistMutationVariables = Types.Exact<{
  itemData?: Types.InputMaybe<Types.Scalars['String']['input']>;
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type MobikulUpdateWishlistMutation = { __typename?: 'Mutation', mobikulUpdateWishlist?: { __typename?: 'DefaultResponse', message?: string | null, success?: boolean | null } | null };


export const MobikulUpdateWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MobikulUpdateWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemData"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mobikulUpdateWishlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemData"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<MobikulUpdateWishlistMutation, MobikulUpdateWishlistMutationVariables>;