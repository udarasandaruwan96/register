const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  
  country: {
    type: String,
    required: true,
  },
  
  supplierName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Suppliers", supplierSchema);