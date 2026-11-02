import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetWatchQrQueryVariables = Types.Exact<{
  firebaseId?: Types.InputMaybe<Types.Scalars['String']['input']>;
  os?: Types.InputMaybe<Types.Scalars['String']['input']>;
  width?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetWatchQrQuery = { __typename?: 'Query', getWatchQr?: { __typename?: 'WatchQr', message?: string | null, qr_url?: string | null, success?: boolean | null } | null };


export const GetWatchQrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWatchQr"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"os"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWatchQr"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firebaseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"os"},"value":{"kind":"Variable","name":{"kind":"Name","value":"os"}}},{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"qr_url"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<GetWatchQrQuery, GetWatchQrQueryVariables>;