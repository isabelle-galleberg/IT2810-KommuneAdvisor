import { gql } from '@apollo/client/core';

export const GET_KOMMUNE = gql`
    query Kommune($name: String!){
        kommune(name: $name) {
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
  query {
    kommuner {
      name
      logoUrl
      kommuneRating {
        rating
      }
    }
  }
`;

export const GET_KOMMUNE_ID = gql`
  query Kommune($name: String!){
    kommune(name: $name) {
      _id
    }
  }
`;
