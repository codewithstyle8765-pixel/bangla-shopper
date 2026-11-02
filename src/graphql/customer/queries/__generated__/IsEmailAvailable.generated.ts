import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type IsEmailAvailableQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type IsEmailAvailableQuery = { __typename?: 'Query', isEmailAvailable?: { __typename?: 'IsEmailAvailableOutput', is_email_available?: boolean | null } | null };


export const IsEmailAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"is_email_available"}}]}}]}}]} as unknown as DocumentNode<IsEmailAvailableQuery, IsEmailAvailableQueryVariables>;