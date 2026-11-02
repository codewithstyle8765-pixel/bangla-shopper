import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AllToCartMutationVariables = Types.Exact<{
  storeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  websiteId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
  itemData?: Types.InputMaybe<Array<Types.InputMaybe<Types.CartItemData>> | Types.InputMaybe<Types.CartItemData>>;
}>;


export type AllToCartMutation = { __typename?: 'Mutation', allToCart?: { __typename?: 'AllToCart', cartCount?: number | null, message?: string | null, success?: boolean | null, warning?: boolean | null } | null };


export const AllToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AllToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemData"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"cartItemData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartCount"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}}]}}]}}]} as unknown as DocumentNode<AllToCartMutation, AllToCartMutationVariables>;