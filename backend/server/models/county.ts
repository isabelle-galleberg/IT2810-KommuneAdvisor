import { model, Schema } from 'mongoose';

export interface ICounty {
  _id: string;
  name: string;
}

const countySchema = new Schema<ICounty>(
  {
    _id: { type: Schema.Types.String },
    name: { type: String },
  },
  { collection: 'county' }
);

export const County = model<ICounty>('County', countySchema);
