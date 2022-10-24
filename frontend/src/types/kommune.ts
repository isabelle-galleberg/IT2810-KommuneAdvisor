import { Rating } from "./rating";

export interface Kommune {
  kommuneNumber: string;
  name: string;
  population: number;
  areaInSquareKm: number;
  populationByArea: number;
  mapUrl: string;
  logoUrl: string;
  writtenLanguage: string;
  county: string;
  rating: Rating[];
}