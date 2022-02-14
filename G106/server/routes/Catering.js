const express = require("express");
const router = express.Router();
const Catering = require("../models/Catering");

router.get("/", async (req, res) => {
  const caterings = await Catering.find();
  res.status(200).json({
    message: "success",
    data: caterings,
  });
});

router.post("/", async (req, res) => {
  try {
    const { meal, supplier, time } = req.body;

    if (!meal || !supplier || !time) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await Catering.create(req.body).then((catering) => {
      res.json({
        message: "success",
        data: catering,
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
  Catering.deleteOne({ _id: req.params.id }, (err, catering) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: " Deleted Successfully",
      });
  });
});

router.post("/:id", (req, res) => {
  Catering.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "updated successfully",
    });
  });
});

router.get("/:id", async (req, res) => {
  await Catering.find({ Id: req.params.id })

    .then((catering) => {
      res.json({
        message: "success",
        data: catering,
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
