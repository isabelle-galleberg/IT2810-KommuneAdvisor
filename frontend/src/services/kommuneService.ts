import { gql } from '@apollo/client/core';

export const GET_KOMMUNE = (kommuneNr: string) => {
  return gql`
        query {
            kommune(kommuneNumber: "${kommuneNr}") {
                kommuneNumber
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
};

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
