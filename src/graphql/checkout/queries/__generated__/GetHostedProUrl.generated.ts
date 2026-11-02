import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetHostedProUrlQueryVariables = Types.Exact<{
  input: Types.HostedProUrlInput;
}>;


export type GetHostedProUrlQuery = { __typename?: 'Query', getHostedProUrl?: { __typename?: 'HostedProUrl', secure_form_url?: string | null } | null };


export const GetHostedProUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHostedProUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HostedProUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHostedProUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secure_form_url"}}]}}]}}]} as unknown as DocumentNode<GetHostedProUrlQuery, GetHostedProUrlQueryVariables>;