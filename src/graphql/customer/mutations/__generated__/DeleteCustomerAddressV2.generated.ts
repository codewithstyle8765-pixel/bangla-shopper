import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type DeleteCustomerAddressV2MutationVariables = Types.Exact<{
  uid: Types.Scalars['ID']['input'];
}>;


export type DeleteCustomerAddressV2Mutation = { __typename?: 'Mutation', deleteCustomerAddressV2?: boolean | null };


export const DeleteCustomerAddressV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCustomerAddressV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCustomerAddressV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]} as unknown as DocumentNode<DeleteCustomerAddressV2Mutation, DeleteCustomerAddressV2MutationVariables>;