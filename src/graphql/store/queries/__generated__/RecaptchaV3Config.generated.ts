import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RecaptchaV3ConfigQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RecaptchaV3ConfigQuery = { __typename?: 'Query', recaptchaV3Config?: { __typename?: 'ReCaptchaConfigurationV3', badge_position: string, failure_message: string, forms: Array<Types.ReCaptchaFormEnum | null>, is_enabled: boolean, language_code?: string | null, minimum_score: number, theme: string, website_key: string } | null };


export const RecaptchaV3ConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecaptchaV3Config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recaptchaV3Config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badge_position"}},{"kind":"Field","name":{"kind":"Name","value":"failure_message"}},{"kind":"Field","name":{"kind":"Name","value":"forms"}},{"kind":"Field","name":{"kind":"Name","value":"is_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"language_code"}},{"kind":"Field","name":{"kind":"Name","value":"minimum_score"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"website_key"}}]}}]}}]} as unknown as DocumentNode<RecaptchaV3ConfigQuery, RecaptchaV3ConfigQueryVariables>;