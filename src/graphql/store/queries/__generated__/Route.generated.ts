import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RouteQueryVariables = Types.Exact<{
  url: Types.Scalars['String']['input'];
}>;


export type RouteQuery = { __typename?: 'Query', route?:
    | { __typename: 'BundleProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'CategoryTree', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'CmsPage', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'ConfigurableProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'DownloadableProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'GroupedProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'RoutableUrl', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'SimpleProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
    | { __typename: 'VirtualProduct', redirect_code: number, relative_url?: string | null, type?: Types.UrlRewriteEntityTypeEnum | null }
   | null };


export const RouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Route"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"redirect_code"}},{"kind":"Field","name":{"kind":"Name","value":"relative_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<RouteQuery, RouteQueryVariables>;