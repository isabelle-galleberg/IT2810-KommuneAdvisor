import { gql } from '@apollo/client/core';

export const getKommune = (kommuneNr: string) => {
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

export const getAllKommuner = () => {
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
};
