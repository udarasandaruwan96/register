const express = require("express");
const router = express.Router();
const SupplierPay = require("../models/SupplierPay");

router.get("/", async (req, res) => {
  const supplierPays = await SupplierPay.find();
  res.status(200).json({
    message: "success",
    data: supplierPays,
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
      date,
    } = req.body;

    if (
      !supplierName ||
      !companyName ||
      !productName ||
      !quantity ||
      !totalPrice ||
      !date
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await SupplierPay.create(req.body).then((supplierPay) => {
      res.json({
        message: "success",
        data: supplierPay,
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
  SupplierPay.deleteOne({ _id: req.params.id }, (err, supplierPay) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});

router.post("/:id", (req, res) => {
  SupplierPay.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:supplierPayid", async (req, res) => {
  await SupplierPay.find({ Id: req.params.id })

    .then((supplierPay) => {
      res.json({
        message: "success",
        data: supplierPay,
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
