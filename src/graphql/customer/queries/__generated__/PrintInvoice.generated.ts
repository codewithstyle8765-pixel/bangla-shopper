import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PrintInvoiceQueryVariables = Types.Exact<{
  customerToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
  storeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  invoiceId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  incrementId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type PrintInvoiceQuery = { __typename?: 'Query', printInvoice?: { __typename?: 'PrintInvoice', message?: string | null, success?: boolean | null, url?: string | null } | null };


export const PrintInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrintInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"incrementId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"printInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"invoiceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"incrementId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"incrementId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<PrintInvoiceQuery, PrintInvoiceQueryVariables>;