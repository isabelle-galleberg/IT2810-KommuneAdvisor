import { gql } from '@apollo/client/core';

export const GET_KOMMUNE = gql`
  query Kommune($kommuneName: String) {
    kommune(kommuneName: $kommuneName) {
      name
      population
      areaInSquareKm
      mapUrl
      logoUrl
      writtenLanguage
      kommuneRating {
        name
        rating
        title
        description
        timestamp
      }
    }
  }
`;

export const GET_ALL_KOMMUNER = gql`
  query Kommuner(
    $search: String
    $sortBy: sort
    $sortDirection: sortDirection
    $pageSize: Int
  ) {
    kommuner(
      search: $search
      sortBy: $sortBy
      sortDirection: $sortDirection
      pageSize: $pageSize
    ) {
      name
      logoUrl
      kommuneRating {
        rating
      }
    }
  }
`;
