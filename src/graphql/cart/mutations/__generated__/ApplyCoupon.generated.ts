import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ApplyCouponMutationVariables = Types.Exact<{
  storeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  couponCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
  removeCoupon?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  quoteId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ApplyCouponMutation = { __typename?: 'Mutation', applyCoupon?: { __typename?: 'DefaultResponse', message?: string | null, success?: boolean | null } | null };


export const ApplyCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"couponCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCoupon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quoteId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"couponCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"couponCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"removeCoupon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCoupon"}}},{"kind":"Argument","name":{"kind":"Name","value":"quoteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quoteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ApplyCouponMutation, ApplyCouponMutationVariables>;