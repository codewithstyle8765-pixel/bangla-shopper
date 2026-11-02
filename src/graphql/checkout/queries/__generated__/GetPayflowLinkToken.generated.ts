import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetPayflowLinkTokenQueryVariables = Types.Exact<{
  input: Types.PayflowLinkTokenInput;
}>;


export type GetPayflowLinkTokenQuery = { __typename?: 'Query', getPayflowLinkToken?: { __typename?: 'PayflowLinkToken', mode?: Types.PayflowLinkMode | null, paypal_url?: string | null, secure_token?: string | null, secure_token_id?: string | null } | null };


export const GetPayflowLinkTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPayflowLinkToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PayflowLinkTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPayflowLinkToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"paypal_url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_token"}},{"kind":"Field","name":{"kind":"Name","value":"secure_token_id"}}]}}]}}]} as unknown as DocumentNode<GetPayflowLinkTokenQuery, GetPayflowLinkTokenQueryVariables>;