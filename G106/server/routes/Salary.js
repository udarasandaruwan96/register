const express = require("express");
const router = express.Router();
const validator = require("email-validator");
const Salary = require("../models/Salary");

router.get("/", async (req, res) => {
  const salarys = await Salary.find();
  res.status(200).json({
    message: "success",
    data: salarys,
  });
});

router.post("/", async (req, res) => {
  try {
    const { employeeName, date, email, workDays, otHours, employeeSalary } =
      req.body;

    if (
      !employeeName ||
      !date ||
      !email ||
      !workDays ||
      !otHours ||
      !employeeSalary
    ) {
      return res.status(400).json({ msg: "Fields are empty" });
    }
    const valid = validator.validate(req.body.email);
    if (!valid) {
      throw new Error("Invalid email, please try again!");
    }
    await Salary.create(req.body).then((salary) => {
      res.json({
        message: "success",
        data: salary,
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
  Salary.deleteOne({ _id: req.params.id }, (err, salary) => {
    if (err) res.json(err);
    else
      res.status(200).json({
        message: "success",
        data: "Item Deleted Successfully",
      });
  });
});

router.post("/:id", (req, res) => {
  Salary.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    if (err) res.send("error");
    res.json({
      message: "success",
      data: "Item has been updated successfully",
    });
  });
});

router.get("/:salaryid", async (req, res) => {
  await Salary.find({ Id: req.params.id })

    .then((salary) => {
      res.json({
        message: "success",
        data: salary,
      });
    })
    .catch((err) => {
      res.json({
        message: "fail",
        data: null,
      });
    });
});
// router.route("/:salaryid").put(async (req, res) => {
//   let Id = req.params.id;

//   const { employeeName, date, email, workDays, otHours, employeeSalary } =
//     req.body;

//   const updateSalary = {
//     employeeName,

//     date,

//     email,

//     workDays,

//     otHours,

//     employeeSalary,
//   };

//   const update = await Salary.findByIdAndUpdate(Id, updateSalary)

//     .then(() => {
//       res.status(200).send({ status: "salary updated" });
//     })

//     .catch((err) => {
//       console.log(err);

//       res.status(500).send({ status: "Error", error: err.message });
//     });
// });
module.exports = router;
