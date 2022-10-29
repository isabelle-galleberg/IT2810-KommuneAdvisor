import { gql } from '@apollo/client/core';

export const GET_KOMMUNE = gql`
  query Kommune($kommuneName: String) {
    kommune(kommuneName: $kommuneName) {
      name
      county {
        name
      }
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
      averageRating
    }
  }
`;

export const GET_ALL_KOMMUNER = gql`
  query Kommuner(
    $sortBy: sort
    $sortDirection: sortDirection
    $pageSize: Int
    $county: String
  ) {
    kommuner(
      sortBy: $sortBy
      sortDirection: $sortDirection
      pageSize: $pageSize
      county: $county
    ) {
      name
      county {
        name
      }
      logoUrl
      areaInSquareKm
      kommuneRating {
        rating
      }
      averageRating
    }
  }
`;
