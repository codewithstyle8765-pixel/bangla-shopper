import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SubscribeEmailToNewsletterMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type SubscribeEmailToNewsletterMutation = { __typename?: 'Mutation', subscribeEmailToNewsletter?: { __typename?: 'SubscribeEmailToNewsletterOutput', status?: Types.SubscriptionStatusesEnum | null } | null };


export const SubscribeEmailToNewsletterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubscribeEmailToNewsletter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeEmailToNewsletter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables>;