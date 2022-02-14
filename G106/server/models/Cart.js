const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cusname: {
    type: String,
    required: true,
  },
  cusMobile: {
    type: String,
    maxlength: 10,
    minlength: 9,
    required: [true, "A user must have ......"],
  },
  orderid: {
    type: String,
    required: true,
  },
  carttotal: {
    type: String,
    required: true,
  },
  cusaddress: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
