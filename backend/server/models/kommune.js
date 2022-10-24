const mongoose = require("mongoose");

const KommuneSchema = new mongoose.Schema(
  {
    _id: { type: String },
    kommuneNumber: { type: String },
    name: { type: String },
    population: { type: Number },
    areaInSquareKm: { type: Number },
    landAreaInSquareKm: { type: Number },
    populationByArea: { type: Number },
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
