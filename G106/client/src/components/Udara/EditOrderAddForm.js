import React, { useState } from "react";
import "./EditOrderAddForm.css";
import swal from "sweetalert";
import axios from "axios";

const EditOrderAddForm = ({ onClick, id, formData }) => {
  const [supplierName, setSupplierName] = useState(formData.supplierName);
  const [companyName, setCompanyName] = useState(formData.companyName);
  const [productName, setProductName] = useState(formData.productName);
  const [quantity, setQuantity] = useState( formData.quantity);
  const [totalPrice, setTotalPrice] = useState(formData.totalPrice);
  const [description, setDescription] = useState(formData.description);

  const editOrderAddForm = () => {
    const order = {
      supplierName: supplierName,
      companyName: companyName,
      productName: productName,
      quantity: quantity,
      totalPrice: totalPrice,
      description: description,
    };

    axios
      .post(`http://localhost:5000/order/${id}`, order)
      .then((res) => {
        if (res.data.message === "success") {
          setSupplierName("");
          setCompanyName("");
          setProductName("");
          setQuantity("");
          setTotalPrice("");
          setDescription("");

          swal("Success", "Edit Success", "success");

          return onClick();
        } else {
          swal("Sorry", " edit failed", "error");
        }
      })
      .catch((error) => {
        swal("Sorry", "edit failed", "error");
      });
  };

  return (
    <>
      <div className="ud_Edit_add_Order_Formm1">
        <div className="ud_Edit_add_Order_title"> Add Order Details</div>
    
        <div className="ud_Edit_add_Order_form2">
          <div className="ud_Edit_add_Order_Photo"></div>

          <div type="text" value={formData.Id} disabled="true" />

          <label className="ud_Edit_add_Order_name1"> <b>Supplier Name</b></label>
          <br></br>
          <input
            className="ud_Edit_add_Order_box1"
            type="text"
            value={supplierName}
          required
            onChange={(e) => {
              setSupplierName(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_Edit_add_Order_name2">
            <b> Company NAME</b>
          </label>
          <input
            className="ud_Edit_add_Order_box2"
            type="text"
            value={companyName}
            required
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
          <label className="ud_Edit_add_Order_name3"><b>Product Name</b></label>
          <input
            className="ud_Edit_add_Order_box3"
            type="text"
            value={productName}
            required
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_Edit_add_Order_name4"><b>Quantity</b></label>
          <input
            className="ud_Edit_add_Order_box4 "
            type="text"
            value={quantity}
            required
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <label className="ud_Edit_add_Order_name5"> <b>Total Price</b> </label>
          <input
            className="ud_Edit_add_Order_box5"
            type="text"
            value={totalPrice}
            required
            onChange={(e) => {
              setTotalPrice(e.target.value);
            }}
          />
          <br></br>
          <label className="ud_Edit_add_Order_name6 "><b>Description</b></label>
          <br></br>
          <input
            className="ud_Edit_add_Order_box6"
            type="text"
            value={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br></br>
        </div>

        <button className="ud_Edit_add_Order_Savebutton " onClick={editOrderAddForm}>
          Save 
        </button>
        
        <button className="ud_Edit_add_Order_Backbutton" onClick={onClick}>
          Cancel
        </button>



        {/* <div
          onClick={() => props.onClick("manageorder")}
          className="ud_Edit_add_Order_Backbutton "
        >
          Cancel
        </div> */}
        
      </div>
    </>
  );
};

export default EditOrderAddForm;
