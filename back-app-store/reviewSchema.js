const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  timestamp: {
    type: Date, 
    default: Date.now, 
  },
  gender: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Review', reviewSchema);
