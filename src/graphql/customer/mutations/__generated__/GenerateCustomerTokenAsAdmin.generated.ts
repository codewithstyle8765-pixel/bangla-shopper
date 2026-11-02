import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GenerateCustomerTokenAsAdminMutationVariables = Types.Exact<{
  input: Types.GenerateCustomerTokenAsAdminInput;
}>;


export type GenerateCustomerTokenAsAdminMutation = { __typename?: 'Mutation', generateCustomerTokenAsAdmin?: { __typename?: 'GenerateCustomerTokenAsAdminOutput', customer_token: string } | null };


export const GenerateCustomerTokenAsAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateCustomerTokenAsAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCustomerTokenAsAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateCustomerTokenAsAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_token"}}]}}]}}]} as unknown as DocumentNode<GenerateCustomerTokenAsAdminMutation, GenerateCustomerTokenAsAdminMutationVariables>;