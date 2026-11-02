import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UploadProfilePicMutationVariables = Types.Exact<{
  width?: Types.InputMaybe<Types.Scalars['String']['input']>;
  mFactor?: Types.InputMaybe<Types.Scalars['String']['input']>;
  customerToken: Types.Scalars['String']['input'];
  imageEncoded: Types.Scalars['String']['input'];
  imageName: Types.Scalars['String']['input'];
}>;


export type UploadProfilePicMutation = { __typename?: 'Mutation', uploadProfilePic?: { __typename?: 'UploadBannerPic', message?: string | null, success?: boolean | null, url?: string | null } | null };


export const UploadProfilePicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadProfilePic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mFactor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageEncoded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadProfilePic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"Argument","name":{"kind":"Name","value":"mFactor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mFactor"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageEncoded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageEncoded"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadProfilePicMutation, UploadProfilePicMutationVariables>;