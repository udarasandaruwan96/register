const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
  },
  workDays: {
    type: Number,
    required: true,
  },
  otHours: {
    type: Number,
    required: true,
  },
  employeeSalary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("salarys", salarySchema);
