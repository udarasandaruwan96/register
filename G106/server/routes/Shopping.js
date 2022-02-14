const express = require("express");
const router = express.Router();
const Shopping = require("../models/Shopping");

router.get("/", async (req, res) => {
  const shoppings = await Shopping.find();
  res.status(200).json({
    message: "success",
    data: shoppings,
  });
});

router.post("/", async (req, res) => {
  try {
    const {
      imgUrl,
      itemName,
      price,
      discount,
      size,
      colour,
      category,
      description,
    } = req.body;

    if (
      !imgUrl ||
      !itemName ||
      !discount ||
      !category ||
      !price ||
      !size ||
      !colour ||
      !description
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    await Shopping.create(req.body).then((shopping) => {
      res.json({
        message: "success",
        data: shopping,
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
  Shopping.deleteOne({ _id: req.params.id }, (err, shopping) => {
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
  Shopping.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:shoppingid", async (req, res) => {
  await Shopping.find({ Id: req.params.id })

    .then((shopping) => {
      res.json({
        message: "success",
        data: shopping,
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
