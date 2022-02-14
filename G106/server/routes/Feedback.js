const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.status(200).json({
    message: "success",
    data: feedbacks,
  });
});

router.post("/", async (req, res) => {
  try {
    const { itemName, rating, description, custId, date } = req.body;

    if (!itemName || !rating || !description || !custId) {
      return res.status(400).json({ msg: "Fields are empty" });
    } //validations

    await Feedback.create(req.body).then((feedback) => {
      res.json({
        message: "success",
        data: feedback,
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
  Feedback.deleteOne({ _id: req.params.id }, (err, feedback) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});

router.post("/:id", (req, res) => {
  Feedback.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:customerid", async (req, res) => {
  await Feedback.find({ custId: req.params.customerid })
    .then((feedback) => {
      res.json({
        message: "success",
        data: feedback,
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
