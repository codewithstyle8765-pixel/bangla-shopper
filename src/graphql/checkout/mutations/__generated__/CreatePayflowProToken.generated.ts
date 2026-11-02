import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreatePayflowProTokenMutationVariables = Types.Exact<{
  input: Types.PayflowProTokenInput;
}>;


export type CreatePayflowProTokenMutation = { __typename?: 'Mutation', createPayflowProToken?: { __typename?: 'CreatePayflowProTokenOutput', response_message: string, result: number, result_code: number, secure_token: string, secure_token_id: string } | null };


export const CreatePayflowProTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePayflowProToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PayflowProTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPayflowProToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response_message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"result_code"}},{"kind":"Field","name":{"kind":"Name","value":"secure_token"}},{"kind":"Field","name":{"kind":"Name","value":"secure_token_id"}}]}}]}}]} as unknown as DocumentNode<CreatePayflowProTokenMutation, CreatePayflowProTokenMutationVariables>;