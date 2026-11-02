import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type DeletePaymentTokenMutationVariables = Types.Exact<{
  public_hash: Types.Scalars['String']['input'];
}>;


export type DeletePaymentTokenMutation = { __typename?: 'Mutation', deletePaymentToken?: { __typename?: 'DeletePaymentTokenOutput', result: boolean, customerPaymentTokens?: { __typename?: 'CustomerPaymentTokens', items: Array<{ __typename?: 'PaymentToken', details?: string | null, payment_method_code: string, public_hash: string, type: Types.PaymentTokenTypeEnum } | null> } | null } | null };


export const DeletePaymentTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePaymentToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public_hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePaymentToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"public_hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public_hash"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerPaymentTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method_code"}},{"kind":"Field","name":{"kind":"Name","value":"public_hash"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<DeletePaymentTokenMutation, DeletePaymentTokenMutationVariables>;