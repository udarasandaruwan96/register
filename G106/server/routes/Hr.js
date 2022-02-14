const express = require("express");
const router = express.Router();
const validator = require("email-validator");
const Hr = require('../models/Hr');


router.get("/", async (req, res) => {
  const hrs = await Hr.find();
  res.status(200).json({
    message: "success",
    data: hrs,
  });
});

// router.post('/',(req,res) => {
//     const {  Name,Email,Address, ContactInfo} = req.body;

//     if(!Name || !Email || !Address || !ContactInfo){
//         return res.status(400).json({msg:'Fields are empty'});
//     }
//     const valid = validator.validate(req.body.mail);
//     if (!valid) {
//       throw new Error("Invalid email, please try again!");
//     }
//     const hr = new Hr(req.body);

//     hr.save().then(hr =>{
//         res.json(hr)
//     })
// })
router.post("/", async (req, res) => {
  try {
    const { Name,Email,Address, ContactInfo } =
      req.body;

    if (
      !Name ||
      !Email ||
      !Address ||
      !ContactInfo 
    
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }
    const valid = validator.validate(req.body.Email);
    if (!valid) {
      throw new Error("Invalid email, please try again!");
    }
    await Hr.create(req.body).then((hr) => {
      res.json({
        message: "success",
        data: hr,
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
  Hr.deleteOne({ _id: req.params.id }, (err, Hr) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});
router.post("/:id", (req, res) => {
  Hr.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:id", async (req, res) => {
  await Hr.find({ custId: req.params.id })
    .then((hr) => {
      res.json({
        message: "success",
        data: hr,
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
