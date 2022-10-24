import { gql } from '@apollo/client/core';

export function getKommune(kommuneNr: string) {
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
}

export function getAllKommuner() {
  return gql`
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
}
