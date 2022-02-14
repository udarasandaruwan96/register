const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running ");
});

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

mongoose
  .connect(process.env.mongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Successfully Connected"))
  .catch((error) => console.log(error));

app.use("/auth", require("./routes/Login"));
app.use("/feedback", require("./routes/Feedback"));
app.use("/hr", require("./routes/Hr"));
app.use("/salary", require("./routes/Salary"));
app.use("/shopping", require("./routes/Shopping"));
app.use("/order", require("./routes/Order"));
app.use("/facility", require("./routes/Facility"));
app.use("/catering", require("./routes/Catering"));
app.use("/supplier", require("./routes/Supplier"));
app.use("/supplierPay", require("./routes/SupplierPay"));
app.use("/cart", require("./routes/Cart"));
app.use("/addcart", require("./routes/AddCart"));
app.use("/hrAttendence",require("./routes/HrAttendence"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
});
