const express = require("express");
const HrAttendence = require("../models/HrAttendence");
const router = express.Router();

const hrAttendence = require("../models/HrAttendence");

router.get("/", async (req, res) => {
  const Attendence = await hrAttendence.find();
  res.status(200).json({
    message: "success",
    data: Attendence,
  });
});

router.post("/", async (req, res) => {
  try {
    const { Name, Date, InTime, OutTime, OTHours } = req.body;

    if (!Name || !Date || !InTime || !OutTime || !OTHours) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await hrAttendence.create(req.body).then((hrAttendence) => {
      res.json({
        message: "success",
        data: hrAttendence,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  HrAttendence.deleteOne({ _id: req.params.id }, (err, hrAttendence) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});

router.post("/:id", (req, res) => {
  HrAttendence.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:id", async (req, res) => {
  await HrAttendence.find({ custId: req.params.id })
    .then((hrAttendence) => {
      res.json({
        message: "success",
        data: hrAttendence,
      });
    })
    .catch((err) => {
      res.json({
        message: "fail",
        data: null,
      });
    });
});

module.exports = router;
