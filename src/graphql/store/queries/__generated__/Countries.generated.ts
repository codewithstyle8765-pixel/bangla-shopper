import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CountriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries?: Array<{ __typename?: 'Country', full_name_english?: string | null, full_name_locale?: string | null, id?: string | null, three_letter_abbreviation?: string | null, two_letter_abbreviation?: string | null, available_regions?: Array<{ __typename?: 'Region', code?: string | null, id?: number | null, name?: string | null } | null> | null } | null> | null };


export const CountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available_regions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"full_name_english"}},{"kind":"Field","name":{"kind":"Name","value":"full_name_locale"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"three_letter_abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"two_letter_abbreviation"}}]}}]}}]} as unknown as DocumentNode<CountriesQuery, CountriesQueryVariables>;