const mongoose = require("mongoose");

const KommuneSchema = new mongoose.Schema(
  {
    kommuneNumber: { type: String },
    name: { type: String },
    population: { type: String },
    areaInSquareKm: { type: String },
    landAreaInSquareKm: { type: String },
    populationByArea: { type: String },
    mapUrl: { type: String },
    logoUrl: { type: String },
    writtenLanguage: { type: String },
    kommuneRating: [
      { type: mongoose.Schema.Types.ObjectId, ref: "kommuneRating" },
    ],
  },
  { collection: "kommuner" }
);

module.exports = mongoose.model("Kommuner", KommuneSchema);
