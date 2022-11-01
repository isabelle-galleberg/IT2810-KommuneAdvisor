import { gql } from '@apollo/client/core';

export const GET_KOMMUNE = gql`
  query Kommune($id: String) {
    kommune(id: $id) {
      _id
      name
      snlLink
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
    $search: String
    $sortBy: sort
    $sortDirection: sortDirection
    $pageSize: Int
    $county: String
  ) {
    kommuner(
      search: $search
      sortBy: $sortBy
      sortDirection: $sortDirection
      pageSize: $pageSize
      county: $county
    ) {
      _id
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

export const GET_KOMMUNER_COUNT = gql`
  query kommunerCount($county: String, $search: String) {
    kommunerCount(search: $search, county: $county)
  }
`;
