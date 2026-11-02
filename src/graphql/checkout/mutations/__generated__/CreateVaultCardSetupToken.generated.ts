import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateVaultCardSetupTokenMutationVariables = Types.Exact<{
  input: Types.CreateVaultCardSetupTokenInput;
}>;


export type CreateVaultCardSetupTokenMutation = { __typename?: 'Mutation', createVaultCardSetupToken?: { __typename?: 'CreateVaultCardSetupTokenOutput', setup_token: string } | null };


export const CreateVaultCardSetupTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVaultCardSetupToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVaultCardSetupTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVaultCardSetupToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setup_token"}}]}}]}}]} as unknown as DocumentNode<CreateVaultCardSetupTokenMutation, CreateVaultCardSetupTokenMutationVariables>;