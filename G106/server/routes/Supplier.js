const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");

router.get("/", async(req, res) => {
  const suppliers = await Supplier.find();
  res.status(200).json({
    message: "success",
    data: suppliers,
  });
});



router.post("/", async (req, res) => {
  try {
    const {
      country,
      supplierName,
      companyName,
      phoneNumber,
      email,
      description,
    } = req.body;



    if (
      !country ||
      !supplierName ||
      !companyName ||
      !phoneNumber ||
      !email ||
      !description
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await Supplier.create(req.body).then((supplier) => {
      res.json({
        message: "success",
        data: supplier,
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
  Supplier.deleteOne({ _id: req.params.id }, (err, supplier) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});


router.post("/:id", (req, res) => {
  Supplier.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:supplierid", async (req, res) => {
  await Supplier.find({ Id: req.params.id })

    .then((supplier) => {
      res.json({
        message: "success",
        data: supplier,
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
