const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({
    message: "success",
    data: orders,
  });
});

router.post("/", async (req, res) => {
  try {
    const {
      supplierName,
      companyName,
      productName,
      quantity,
      totalPrice,
      description,
    } = req.body;

    if (
      !supplierName ||
      !companyName ||
      !productName ||
      !quantity ||
      !totalPrice ||
      !description
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await Order.create(req.body).then((order) => {
      res.json({
        message: "success",
        data: order,
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
  Order.deleteOne({ _id: req.params.id }, (err, order) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});


router.post("/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:orderid", async (req, res) => {
  await Order.find({ Id: req.params.id })

    .then((order) => {
      res.json({
        message: "success",
        data: order,
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
