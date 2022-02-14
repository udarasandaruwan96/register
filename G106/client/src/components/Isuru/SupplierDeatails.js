import React, { useState } from "react";
import "./Account.css";
import axios from "axios";
import swal from "sweetalert";
import suppliertable from "./SupplierTable";

const SupplierDetails = ({ onClick, id, formData }) => {
  const [supplierName, setSupplierName] = useState(formData.supplierName);
  const [companyName, setCompanyName] = useState(formData.companyName);
  const [productName, setProductName] = useState(formData.productName);
  const [quantity, setQuantity] = useState(formData.quantity);
  const [totalPrice, setTotalPrice] = useState(formData.totalPrice);
  const [date, setDate] = useState();

  const supplierPay = () => {
    const supplierPay = {
      supplierName: supplierName,
      companyName: companyName,
      productName: productName,
      quantity: quantity,
      totalPrice: totalPrice,
      date: date,
    };
    axios
      .post("http://localhost:5000/supplierPay", supplierPay)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "supplier payment successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "supplier payment unsuccessfully", "error");
        }
      })
      .catch((error) => {
        try {
          swal("Error", error.response.data.error, "error");
        } catch (error) {
          swal("Error", "fields are empty", "error");
        }
      });
  };

  return (
    <>
      <div className="supformedit">
        <div className="suptitle1">Supplier Payment</div>

        <div type="text" value={formData.Id} disabled="true" />
        <br></br>

        <label className="supname2">Supplier Name</label>

        <input
          className="supbox1"
          type="text"
          value={supplierName}
          required
          onChange={(e) => {
            setSupplierName(e.target.value);
          }}
        />
        <br></br>

        <label className="supname2">Company Name</label>

        <input
          className="supbox2"
          type="text"
          value={companyName}
          required
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />

        <label className="name2">Product Name</label>

        <input
          className="supbox3"
          type="text"
          value={productName}
          required
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />

        <label className="name2">Quantity</label>

        <input
          className="supbox4"
          type="text"
          value={quantity}
          required
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />

        <label className="name2">Total Price</label>

        <input
          className="supbox6"
          type="text"
          value={totalPrice}
          required
          onChange={(e) => {
            setTotalPrice(e.target.value);
          }}
        />

        <label className="name2">Payment Date</label>

        <input
          className="supbox8"
          type="text"
          value={date}
          placeholder="Enter Payment Date"
          required
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <br></br>

        <button className="supBtn" onClick={supplierPay}>
          Confirm
        </button>
        <button className="supBtnBtn" onClick={onClick}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default SupplierDetails;
