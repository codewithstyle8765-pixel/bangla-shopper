import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateBraintreePayPalVaultClientTokenMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.BraintreeVaultInput>;
}>;


export type CreateBraintreePayPalVaultClientTokenMutation = { __typename?: 'Mutation', createBraintreePayPalVaultClientToken: string };


export const CreateBraintreePayPalVaultClientTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBraintreePayPalVaultClientToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BraintreeVaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBraintreePayPalVaultClientToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateBraintreePayPalVaultClientTokenMutation, CreateBraintreePayPalVaultClientTokenMutationVariables>;