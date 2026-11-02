import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RegisterDeviceMutationVariables = Types.Exact<{
  os?: Types.InputMaybe<Types.Scalars['String']['input']>;
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
  token?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RegisterDeviceMutation = { __typename?: 'Mutation', registerDevice?: { __typename?: 'DefaultResponse', message?: string | null, success?: boolean | null } | null };


export const RegisterDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"os"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"os"},"value":{"kind":"Variable","name":{"kind":"Name","value":"os"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RegisterDeviceMutation, RegisterDeviceMutationVariables>;