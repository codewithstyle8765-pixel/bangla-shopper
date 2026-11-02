import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UrlResolverQueryVariables = Types.Exact<{
  url: Types.Scalars['String']['input'];
}>;


export type UrlResolverQuery = { __typename?: 'Query', urlResolver?: { __typename?: 'EntityUrl', entity_uid?: string | null, redirectCode?: number | null, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null } | null };


export const UrlResolverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UrlResolver"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urlResolver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity_uid"}},{"kind":"Field","name":{"kind":"Name","value":"redirectCode"}},{"kind":"Field","name":{"kind":"Name","value":"relative_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UrlResolverQuery, UrlResolverQueryVariables>;