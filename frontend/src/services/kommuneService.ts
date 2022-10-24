import { gql } from '@apollo/client/core';

export function getKommune(kommuneNr: string) {
  return gql`
        query {
            kommune(kommuneNr: "${kommuneNr}") {
                kommuneNumber
                name
                population
                areaInSquareKm
                populationByArea
                mapUrl
                logoUrl
                writtenLanguage
        }
    `;
}