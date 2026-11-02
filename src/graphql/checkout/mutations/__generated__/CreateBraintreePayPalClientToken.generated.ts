import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateBraintreePayPalClientTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateBraintreePayPalClientTokenMutation = { __typename?: 'Mutation', createBraintreePayPalClientToken: string };


export const CreateBraintreePayPalClientTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBraintreePayPalClientToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBraintreePayPalClientToken"}}]}}]} as unknown as DocumentNode<CreateBraintreePayPalClientTokenMutation, CreateBraintreePayPalClientTokenMutationVariables>;