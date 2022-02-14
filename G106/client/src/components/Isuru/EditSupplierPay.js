import React, { useState } from "react";
import "./Account.css";
import axios from "axios";
import swal from "sweetalert";

const EditSupplierPay = ({ onClick, id, formData }) => {
  const [supplierName, setSupplierName] = useState(formData.supplierName);
  const [companyName, setCompanyName] = useState(formData.companyName);
  const [productName, setProductName] = useState(formData.productName);
  const [quantity, setQuantity] = useState(formData.quantity);
  const [totalPrice, setTotalPrice] = useState(formData.totalPrice);
  const [date, setDate] = useState(formData.date);

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
      .post(`http://localhost:5000/supplierPay/${id}`, supplierPay)
      .then((res) => {
        if (res.data.message === "success") {
          setSupplierName("");
          setCompanyName("");
          setProductName("");
          setQuantity("");
          setTotalPrice("");
          setDate("");

          swal("Success", "Edit Success", "success");

          return onClick();
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
        <div className="title1">Edit Payment</div>

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

        <label className="name2">Company Name</label>

        <input
          className="supbox2"
          type="text"
          value={companyName}
          required
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />

        <br></br>

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

        <br></br>

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
          required
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <br></br>

        <button className="supBtn" onClick={supplierPay}>
          SAVE
        </button>
        <button className="supBtnBtn" onClick={onClick}>
          PREVIOUS
        </button>
      </div>
    </>
  );
};

export default EditSupplierPay;
