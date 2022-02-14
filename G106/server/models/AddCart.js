const mongoose = require("mongoose");

const addcartSchema = mongoose.Schema({
  
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }, 
  size: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cusid: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AddCart", addcartSchema);
