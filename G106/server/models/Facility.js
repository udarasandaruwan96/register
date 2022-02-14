const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema({
  startingPoint: {
    type: String,
    required: true,
  },
  endingPoint: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true, 

  },
 
});

module.exports = mongoose.model("facilities", facilitySchema);
