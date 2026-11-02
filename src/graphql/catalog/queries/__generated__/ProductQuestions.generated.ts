import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ProductQuestionsQueryVariables = Types.Exact<{
  sku: Types.Scalars['String']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  currentPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ProductQuestionsQuery = { __typename?: 'Query', productQuestions?: { __typename?: 'ProductQuestions', total_count: number, items: Array<{ __typename?: 'ProductQuestion', question: string, answer?: string | null, author?: string | null, created_at: string } | null> } | null };


export const ProductQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sku"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sku"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sku"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuestionsQuery, ProductQuestionsQueryVariables>;