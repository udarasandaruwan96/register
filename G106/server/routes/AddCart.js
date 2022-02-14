const express = require("express");
const router = express.Router();
const AddCart = require("../models/AddCart");

router.get("/", async (req, res) => {
  const addcarts = await AddCart.find();
  res.status(200).json({
    message: "success",
    data: addcarts,
  });
});

router.post("/", async (req, res) => {
  try {
    const {
      cusid,
      itemName,
      price,
      size,
      colour,
      category,
      description,
      number,
      total,
      date,
    } = req.body;

    if (
      !cusid||
      !itemName ||
      !category ||
      !price ||
      !size ||
      !colour ||
      !number ||
      !total ||
      !description
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await AddCart.create(req.body).then((addcart) => {
      res.json({
        message: "success",
        data: addcart,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error: error.message,
    });
  }
});

/*-----------------delet part--------------------------- */
router.delete("/:id", (req, res) => {
  AddCart.deleteOne({ _id: req.params.id }, (err, addcart) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});

/*------------edit---------------------- */
router.post("/:id", (req, res) => {
  AddCart.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:addcartid", async (req, res) => {
  await AddCart.find({ Id: req.params.id })

    .then((addcart) => {
      res.json({
        message: "success",
        data: addcart,
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
