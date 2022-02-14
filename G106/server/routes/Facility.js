const express = require("express");
const router = express.Router();
const Facility = require("../models/Facility");

router.get("/", async (req, res) => {
  const facilities = await Facility.find();
  res.status(200).json({
    message: "success",
    data: facilities,
  });
});

router.post("/", async (req, res) => {
  try {
    const { startingPoint, endingPoint, time } =
      req.body;

    if (
      !startingPoint ||
      !endingPoint ||
      !time

    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await Facility.create(req.body).then((facility) => {
      res.json({
        message: "success",
        data: facility,
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
  Facility.deleteOne({ _id: req.params.id }, (err, facility) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: " Deleted Successfully",
      });
  });
});


router.post("/:id", (req, res) => {
  Facility.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "updated successfully",
    });
  });
});

router.get("/:id", async (req, res) => {
  await Facility.find({ Id: req.params.id })

    .then((facility) => {
      res.json({
        message: "success",
        data: facility,
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
