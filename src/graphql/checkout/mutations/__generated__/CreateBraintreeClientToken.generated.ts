import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateBraintreeClientTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateBraintreeClientTokenMutation = { __typename?: 'Mutation', createBraintreeClientToken: string };


export const CreateBraintreeClientTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBraintreeClientToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBraintreeClientToken"}}]}}]} as unknown as DocumentNode<CreateBraintreeClientTokenMutation, CreateBraintreeClientTokenMutationVariables>;