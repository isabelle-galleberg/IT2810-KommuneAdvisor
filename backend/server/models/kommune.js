const mongoose = require('mongoose');

const KommuneSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String },
    population: { type: Number },
    areaInSquareKm: { type: Number },
    landAreaInSquareKm: { type: Number },
    populationByArea: { type: Number },
    mapUrl: { type: String },
    snlLink: { type: String },
    logoUrl: { type: String },
    writtenLanguage: { type: String },
    averageRating: { type: Number, default: 0 },
    kommuneRating: [
      { type: mongoose.Schema.Types.String, ref: 'kommuneRating' },
    ],
    county: { type: mongoose.Schema.Types.String },
  },
  { collection: 'kommuner' }
);

module.exports = mongoose.model('Kommuner', KommuneSchema);
