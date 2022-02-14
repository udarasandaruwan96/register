const mongoose = require("mongoose");

const cateringSchema = mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("caterings", cateringSchema);
