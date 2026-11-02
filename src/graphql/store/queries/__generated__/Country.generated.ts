import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CountryQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CountryQuery = { __typename?: 'Query', country?: { __typename?: 'Country', full_name_english?: string | null, full_name_locale?: string | null, id?: string | null, three_letter_abbreviation?: string | null, two_letter_abbreviation?: string | null, available_regions?: Array<{ __typename?: 'Region', code?: string | null, id?: number | null, name?: string | null } | null> | null } | null };


export const CountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Country"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available_regions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"full_name_english"}},{"kind":"Field","name":{"kind":"Name","value":"full_name_locale"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"three_letter_abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"two_letter_abbreviation"}}]}}]}}]} as unknown as DocumentNode<CountryQuery, CountryQueryVariables>;