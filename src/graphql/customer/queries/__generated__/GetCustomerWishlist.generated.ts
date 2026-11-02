import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetCustomerWishlistQueryVariables = Types.Exact<{
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
  storeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCustomerWishlistQuery = { __typename?: 'Query', getCustomerWishlist?: { __typename?: 'CustomerWishlistResponse', message?: string | null, success?: boolean | null, totalCount?: number | null, wishlist?: Array<{ __typename?: 'CustomerWishlistItem', productId?: number | null, wishlistItemId?: number | null } | null> | null } | null };


export const GetCustomerWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCustomerWishlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"wishlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"wishlistItemId"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomerWishlistQuery, GetCustomerWishlistQueryVariables>;