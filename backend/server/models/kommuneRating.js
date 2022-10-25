const mongoose = require("mongoose");

const KommuneRatingSchema = new mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number },
    title: { type: String },
    description: { type: String },
    timestamp: { type: Date },
    kommuneId: { type: String },
  },
  { collection: "kommuneRating" }
);

module.exports = mongoose.model("kommuneRating", KommuneRatingSchema);
