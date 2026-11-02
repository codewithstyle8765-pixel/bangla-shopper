import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CmsBlocksQueryVariables = Types.Exact<{
  identifiers?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>>;
}>;


export type CmsBlocksQuery = { __typename?: 'Query', cmsBlocks?: { __typename?: 'CmsBlocks', items?: Array<{ __typename?: 'CmsBlock', content?: string | null, identifier?: string | null, title?: string | null } | null> | null } | null };


export const CmsBlocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CmsBlocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifiers"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cmsBlocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifiers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifiers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CmsBlocksQuery, CmsBlocksQueryVariables>;