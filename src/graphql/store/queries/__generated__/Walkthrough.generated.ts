import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WalkthroughQueryVariables = Types.Exact<{
  width?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type WalkthroughQuery = { __typename?: 'Query', walkthrough?: { __typename?: 'WalkThrough', message?: string | null, success?: boolean | null, walkthroughVersion?: number | null, walkthroughData?: Array<{ __typename?: 'WalkThroughData', colorCode?: string | null, content?: string | null, image?: string | null, imageDominantColor?: string | null, title?: string | null } | null> | null } | null };


export const WalkthroughDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Walkthrough"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walkthrough"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"walkthroughData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colorCode"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageDominantColor"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"walkthroughVersion"}}]}}]}}]} as unknown as DocumentNode<WalkthroughQuery, WalkthroughQueryVariables>;