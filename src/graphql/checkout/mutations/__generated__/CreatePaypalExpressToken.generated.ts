import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreatePaypalExpressTokenMutationVariables = Types.Exact<{
  input: Types.PaypalExpressTokenInput;
}>;


export type CreatePaypalExpressTokenMutation = { __typename?: 'Mutation', createPaypalExpressToken?: { __typename?: 'PaypalExpressTokenOutput', token?: string | null, paypal_urls?: { __typename?: 'PaypalExpressUrlList', edit?: string | null, start?: string | null } | null } | null };


export const CreatePaypalExpressTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaypalExpressToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaypalExpressTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaypalExpressToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paypal_urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<CreatePaypalExpressTokenMutation, CreatePaypalExpressTokenMutationVariables>;