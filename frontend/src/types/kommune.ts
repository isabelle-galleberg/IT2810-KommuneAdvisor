import { Rating } from './rating';

export interface Kommune {
  _id: string;
  name: string;
  population: number;
  areaInSquareKm: number;
  mapUrl: string;
  logoUrl: string;
  writtenLanguage: string;
  county: { name: string };
  kommuneRating: Rating[];
  averageRating: number;
}
