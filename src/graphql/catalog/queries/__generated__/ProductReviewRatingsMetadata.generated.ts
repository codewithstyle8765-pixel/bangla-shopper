import * as Types from '../../../../types/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ProductReviewRatingsMetadataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductReviewRatingsMetadataQuery = { __typename?: 'Query', productReviewRatingsMetadata: { __typename?: 'ProductReviewRatingsMetadata', items: Array<{ __typename?: 'ProductReviewRatingMetadata', id: string, name: string, values: Array<{ __typename?: 'ProductReviewRatingValueMetadata', value: string, value_id: string } | null> } | null> } };


export const ProductReviewRatingsMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductReviewRatingsMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productReviewRatingsMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"value_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductReviewRatingsMetadataQuery, ProductReviewRatingsMetadataQueryVariables>;