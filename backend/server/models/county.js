const mongoose = require('mongoose');

const countyScheme = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Number },
    name: { type: String },
  },
  { collection: 'county' }
);

module.exports = mongoose.model('county', countyScheme);
