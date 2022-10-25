const mongoose = require("mongoose");

const countyScheme = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String },
    countyNumber: { type: String },
  },
  { collection: "county" }
);

module.exports = mongoose.model("county", countyScheme);
