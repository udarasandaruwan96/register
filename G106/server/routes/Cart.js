const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json({
    message: "success",
    data: carts,
  });
});

router.post("/", async (req, res) => {
  try {
    const { cusname, cusMobile, orderid, carttotal, cusaddress, date } =
      req.body;

    if (!cusname || !cusMobile || !orderid || !carttotal || !cusaddress) {
      return res.status(400).json({ msg: "Fields are empty" });
    }

    body("cusMobile").isLength({ num: 5 }),
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      };
    Cart.create({
      cusMobile: req.body.cusMobile,
    }).then((user) => res.json(user));

    await Cart.create(req.body).then((cart) => {
      res.json({
        message: "success",
        data: cart,
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
  Cart.deleteOne({ _id: req.params.id }, (err, cart) => {
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
  Cart.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:cartid", async (req, res) => {
  await Cart.find({ Id: req.params.id })

    .then((cart) => {
      res.json({
        message: "success",
        data: cart,
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
