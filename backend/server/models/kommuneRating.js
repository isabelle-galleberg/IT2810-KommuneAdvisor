const mongoose = require('mongoose');
const KommuneRatingSchema = new mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number },
    title: { type: String },
    description: { type: String },
    timestamp: { type: Date },
    kommune: { type: mongoose.Types.ObjectId, ref: 'Kommuner' },
  },
  { collection: 'kommuneRating' }
);

module.exports = mongoose.model('kommuneRating', KommuneRatingSchema);
