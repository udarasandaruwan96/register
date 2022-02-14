import React, { useState } from "react";
import "./SupplierAddForm.css";
import swal from "sweetalert";
import axios from "axios";
import validator from "validator";//validation email

const SupplierAddForm = (props) => {
  const [country, setCountry] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const valid = validator.isEmail(email);//validation email

  const managesupplier = () => {
    const supplier = {
      country: country,
      supplierName: supplierName,
      companyName: companyName,
      phoneNumber: phoneNumber,
      email: email,
      description: description,
    };

    if (phoneNumber.length < 10 || phoneNumber.length > 10 || phoneNumber < 0) {
      swal("Error", "Invalid Phone Number", "error");//validation PhoneNumber
      return;
    }

    if (!valid) {
      swal("Error", "Invalid Email", "error");//validation email
      return;
    }

    axios
      .post("http://localhost:5000/supplier", supplier)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "supplier genarate successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "supplier genarate unsuccessfully", "error");
        }
      })

      .catch((error) => {
        try {
          swal("Error", error.response.data.msg, "error");
        } catch (error) {
          swal(
            "Error",
            "Server error Please Cheak Phone Number (Can't used lettering) or Email  (Can't used same Email) ",//validation
            "error"
          );
        }
      });
  };

  return (
    <>
      <div className="ud_add_Supplier_Form1">
        <div className="ud_add_Supplier_title"> Add Supplier Details</div>

        <form className="ud_add_Supplier_form2">
          <div className="ud_add_Supplier_Photo"></div>

          <label className="ud_add_Supplier_name1">
            <b> COUNTRY</b>
          </label>
          <br></br>
          <input
            className="ud_add_Supplier_box1"
            type="text"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <br></br>

          <label className="ud_add_Supplier_name2">
            <b>SUPPLIER NAME</b>
          </label>
          <input
            className="ud_add_Supplier_box2"
            type="text"
            onChange={(e) => {
              setSupplierName(e.target.value);
            }}
          />
          <label className="ud_add_Supplier_name3">
            <b>COMPANY NAME</b>
          </label>
          <input
            className="ud_add_Supplier_box3"
            type="text"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_add_Supplier_name4">
            <b>PHONE NUMBER</b>
          </label>
          <input
            className="ud_add_Supplier_box4"
            type="number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <label className="ud_add_Supplier_name5">
            <b>EMAIL</b>
          </label>
          <input
            className="ud_add_Supplier_box5"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_add_Supplier_name6">
            <b>DESCRIPTION</b>
          </label>
          <br></br>
          <input
            className="ud_add_Supplier_box6"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br></br>
        </form>

        <button className="ud_add_Supplier_Savebutton" onClick={managesupplier}>
          Save
        </button>

        <div
          onClick={() => props.onClick("managesupplier")}
          className="ud_add_Supplier_Backbutton"
        >
          Cancel
        </div>
      </div>
    </>
  );
};

export default SupplierAddForm;
