const express = require("express");

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const HrAttendenceSchema = new schema({
    Name: {
        type: String,
        required: true,
      },
      Date: {
        type: String,
        default: Date.now,
      },
      InTime: {
        type: String,
        required: true,
      },
      OutTime: {
        type: String,
        required: true,
      },
      OTHours: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model("HrAttendence", HrAttendenceSchema);
