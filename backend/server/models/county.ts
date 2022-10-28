import { model, Schema } from 'mongoose';

export interface ICounty {
  _id: number;
  name: string;
}

const countySchema = new Schema<ICounty>(
  {
    _id: { type: Schema.Types.Number },
    name: { type: String },
  },
  { collection: 'county' }
);

export const County = model<ICounty>('County', countySchema);
