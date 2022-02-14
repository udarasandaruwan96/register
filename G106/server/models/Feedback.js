const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  custId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedbacks", feedbackSchema);
