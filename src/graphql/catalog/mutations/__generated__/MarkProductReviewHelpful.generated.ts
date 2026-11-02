import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MarkProductReviewHelpfulMutationVariables = Types.Exact<{
  review_id: Types.Scalars['Int']['input'];
}>;


export type MarkProductReviewHelpfulMutation = { __typename?: 'Mutation', markProductReviewHelpful: { __typename?: 'ProductReviewHelpfulOutput', review_id: number, helpful_count: number, voted: boolean } };


export const MarkProductReviewHelpfulDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkProductReviewHelpful"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markProductReviewHelpful"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"review_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"review_id"}},{"kind":"Field","name":{"kind":"Name","value":"helpful_count"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}}]}}]}}]} as unknown as DocumentNode<MarkProductReviewHelpfulMutation, MarkProductReviewHelpfulMutationVariables>;