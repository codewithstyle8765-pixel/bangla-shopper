import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetNotificationCountQueryVariables = Types.Exact<{
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
  storeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetNotificationCountQuery = { __typename?: 'Query', getNotificationCount?: { __typename?: 'NotificationCountResponse', message?: string | null, notificationCount?: number | null, success?: boolean | null } | null };


export const GetNotificationCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotificationCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotificationCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"notificationCount"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<GetNotificationCountQuery, GetNotificationCountQueryVariables>;