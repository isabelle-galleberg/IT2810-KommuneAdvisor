import { gql } from '@apollo/client/core';

/**
 * Fetch data for a kommune with given id
 * @param id id of the kommune to fetch
 * @returns array with id, name, county, area, population,
 * written language, mapUrl, logoUrl, link to SNL website, average rating and array of ratings
 */
export const GET_KOMMUNE = gql`
  query Kommune($id: String) {
    kommune(id: $id) {
      _id
      name
      county {
        name
      }
      snlLink
      population
      areaInSquareKm
      mapUrl
      logoUrl
      writtenLanguage
      averageRating
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

/**
 * Fetch data for kommuner that fulfill the given criterias
 * @param search search string to filter kommuner by
 * @param county county to filter kommuner by
 * @param sortBy sort kommuner by this field (name, population, area, averageRating)
 * @param sortDirection direction to sort kommuner by (ascending or descending)
 * @param pageSize number of kommuner to fetch
 * @param page page number to fetch
 * @returns array with id, name, county, logoUrl, area, ratings and average rating
 */
export const GET_ALL_KOMMUNER = gql`
  query Kommuner(
    $search: String
    $sortBy: sort
    $sortDirection: sortDirection
    $pageSize: Int
    $page: Int
    $county: String
  ) {
    kommuner(
      search: $search
      sortBy: $sortBy
      sortDirection: $sortDirection
      pageSize: $pageSize
      page: $page
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

/**
 * Fetch number of kommuner that fulfill the given criterias
 * @param county county to filter kommuner by
 * @param search search string to filter kommuner by
 * @returns the number of kommuner that fulfill the given criterias
 */
export const GET_KOMMUNER_COUNT = gql`
  query kommunerCount($county: String, $search: String) {
    kommunerCount(search: $search, county: $county)
  }
`;
