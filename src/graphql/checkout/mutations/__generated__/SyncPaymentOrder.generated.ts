import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SyncPaymentOrderMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SyncPaymentOrderInput>;
}>;


export type SyncPaymentOrderMutation = { __typename?: 'Mutation', syncPaymentOrder?: boolean | null };


export const SyncPaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncPaymentOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SyncPaymentOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SyncPaymentOrderMutation, SyncPaymentOrderMutationVariables>;