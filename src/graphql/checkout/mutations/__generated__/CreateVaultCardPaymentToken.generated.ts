import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateVaultCardPaymentTokenMutationVariables = Types.Exact<{
  input: Types.CreateVaultCardPaymentTokenInput;
}>;


export type CreateVaultCardPaymentTokenMutation = { __typename?: 'Mutation', createVaultCardPaymentToken?: { __typename?: 'CreateVaultCardPaymentTokenOutput', vault_token_id: string, payment_source: { __typename?: 'PaymentSourceOutput', card: { __typename?: 'CardPaymentSourceOutput', brand?: string | null, expiry?: string | null, last_digits?: string | null } } } | null };


export const CreateVaultCardPaymentTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVaultCardPaymentToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVaultCardPaymentTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVaultCardPaymentToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payment_source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"last_digits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault_token_id"}}]}}]}}]} as unknown as DocumentNode<CreateVaultCardPaymentTokenMutation, CreateVaultCardPaymentTokenMutationVariables>;