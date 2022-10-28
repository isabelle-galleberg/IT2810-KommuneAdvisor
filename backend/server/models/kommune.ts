import { Schema, model } from 'mongoose';
import { ICounty } from './county';
import { IKommuneRating } from './kommuneRating';

export interface IKommune {
  _id: string;
  name: string;
  kommuneNumber: string;
  population: number;
  areaInSquareKm: number;
  landAreaInSquareKm: number;
  populationByArea: number;
  mapUrl: string;
  logoUrl: string;
  writtenLanguage: string;
  averageRating: number;
  kommuneRating: IKommuneRating[];
  county: ICounty;
}

const KommuneSchema = new Schema<IKommune>(
  {
    kommuneNumber: { type: String },
    name: { type: String },
    population: { type: Number },
    areaInSquareKm: { type: Number },
    landAreaInSquareKm: { type: Number },
    populationByArea: { type: Number },
    mapUrl: { type: String },
    logoUrl: { type: String },
    writtenLanguage: { type: String },
    averageRating: { type: Number, default: 0 },
    kommuneRating: [{ type: Schema.Types.String, ref: 'kommuneRating' }],
    county: { type: Schema.Types.Number },
  },
  { collection: 'kommuner' }
);

export const Kommune = model<IKommune>('Kommune', KommuneSchema);
