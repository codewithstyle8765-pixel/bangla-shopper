import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CheckoutAgreementsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckoutAgreementsQuery = { __typename?: 'Query', checkoutAgreements?: Array<{ __typename?: 'CheckoutAgreement', agreement_id: number, checkbox_text: string, content: string, content_height?: string | null, is_html: boolean, mode: Types.CheckoutAgreementMode, name: string } | null> | null };


export const CheckoutAgreementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckoutAgreements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkoutAgreements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agreement_id"}},{"kind":"Field","name":{"kind":"Name","value":"checkbox_text"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"content_height"}},{"kind":"Field","name":{"kind":"Name","value":"is_html"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CheckoutAgreementsQuery, CheckoutAgreementsQueryVariables>;