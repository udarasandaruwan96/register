import React, { useState } from "react";
import "./OrderAddForm.css";
import swal from "sweetalert";
import axios from "axios";

const OrderAddForm = (props) => {
  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [description, setDescription] = useState("");

  const manageorder = () => {
    const order = {
      supplierName: supplierName,
      companyName: companyName,
      productName: productName,
      quantity: quantity,
      totalPrice: totalPrice,
      description: description,
    };

    axios
      .post("http://localhost:5000/order", order)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "order genarate successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "order genarate unsuccessfully", "error");
        }
      })

      .catch((error) => {
        try {
          swal("Error", error.response.data.msg, "error");
        } catch (error) {
          swal("Error", "Please Cheak Quantity or Total Price (Can't used lettering)", "error");//validation
        }
      });  
  };

  return (
    <>
      <div className="ud_add_Order_Formm1">
        <div className="ud_add_Order_title"> Add Order Details</div>

        <div className="ud_add_Order_form2">
          <div className="ud_add_Order_Photo"></div>

          <label className="ud_add_Order_name1"> <b>Supplier Name</b></label>
          <br></br>
          <input
            className="ud_add_Order_box1"
            type="text"
            onChange={(e) => {
              setSupplierName(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_add_Order_name2">
            <b> Company Name</b>
          </label>
          <input
            className="ud_add_Order_box2"
            type="text"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
          <label className="ud_add_Order_name3"><b>Product Name</b></label>
          <input
            className="ud_add_Order_box3"
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_add_Order_name4"><b>Quantity</b></label>
          <input
            className="ud_add_Order_box4"
            type="text"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <label className="ud_add_Order_name5"> <b>Total Price</b> </label>
          <input
            className="ud_add_Order_box5"
            type="text"
            onChange={(e) => {
              setTotalPrice(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_add_Order_name6"><b>Description</b></label>
          <br></br>
          <input
            className="ud_add_Order_box6"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br></br>
        </div>

        <button className="ud_add_Order_Savebutton" onClick={manageorder}>
          Save
        </button>

        <div
          onClick={() => props.onClick("manageorder")}
          className="ud_add_Order_Backbutton "
        >
          Cancel
        </div>
      </div>
    </>
  );
};

export default OrderAddForm;
