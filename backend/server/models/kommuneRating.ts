import { model, Schema } from 'mongoose';
import { IKommune } from './kommune';
export interface IKommuneRating {
  _id: string;
  name: string;
  rating: number;
  title: string;
  description: string;
  timestamp: Date;
  kommune: string | IKommune;
}

const KommuneRatingSchema = new Schema<IKommuneRating>(
  {
    name: { type: String },
    rating: { type: Number },
    title: { type: String },
    description: { type: String },
    timestamp: { type: Date },
    kommune: { type: Schema.Types.String, ref: 'Kommuner' },
  },
  { collection: 'kommuneRating' }
);

export const KommuneRating = model<IKommuneRating>(
  'kommuneRating',
  KommuneRatingSchema
);
