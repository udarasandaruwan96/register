const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Orders", orderSchema);