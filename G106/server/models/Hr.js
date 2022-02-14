const express = require("express");

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const hrSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  ContactInfo: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("hr", hrSchema);
