
import React, { useState }  from "react";
import "./EditSupplierAddForm.css";
import swal from "sweetalert";
import axios from "axios";



const EditSupplierAddForm = ({ onClick, id, formData }) => {

  const [country, setCountry] = useState(formData.country);
  const [supplierName, setSupplierName] = useState(formData.supplierName);
  const [companyName, setCompanyName] = useState(formData.companyName);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [email, setEmail] = useState(formData.email);
  const [description, setDescription] = useState(formData.description);

  const editSupplierAddForm = () => {

    const supplier = {
      country: country,
      supplierName: supplierName,
      companyName: companyName,
      phoneNumber: phoneNumber,
      email: email,
      description: description,
    };

    axios
    .post(`http://localhost:5000/supplier/${id}`, supplier)
      .then((res) => {
        if (res.data.message === "success") {
            setCountry("");
            setSupplierName("");
            setCompanyName("");
            setPhoneNumber("");
            setEmail("");
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
      <div className="ud_edit_add_Supplier_Form1">
        <div className="ud_edit_add_Supplier_title"> Add Supplier Details</div>

        <div className="ud_edit_add_Supplier_form2">

          <div className="ud_edit_add_Supplier_Photo"></div>

          <div type="text" value={formData.Id} disabled="true" />

          <label className="ud_edit_add_Supplier_name1"><b> Country</b></label>
          <br></br>
          <input className="ud_edit_add_Supplier_box1" type="text"    value={country}
          required
           onChange={(e) => {
            setCountry(e.target.value);
          }} />
          <br></br>

          <label className="ud_edit_add_Supplier_name2"><b>SUPPLIER NAME</b></label>
          <input className="ud_edit_add_Supplier_box2" type="text"    value={supplierName}
          required
           onChange={(e) => {
            setSupplierName(e.target.value);
          }} />
          <label className="ud_edit_add_Supplier_name3"><b>COMPANY NAME</b></label>
          <input className="ud_edit_add_Supplier_box3" type="text"    value={companyName}
          required
           onChange={(e) => {
            setCompanyName(e.target.value);
          }} />
          <br></br>
          <label className="ud_edit_add_Supplier_name4"><b>PHONE NUMBER</b></label>
          <input className="ud_edit_add_Supplier_box4" type="text"    value={phoneNumber}
          required
           onChange={(e) => {
            setPhoneNumber(e.target.value);
          }} />
          <label className="ud_edit_add_Supplier_name5"><b>EMAIL</b></label>
          <input className="ud_edit_add_Supplier_box5" type="text"    value={email}
          required
            onChange={(e) => {
            setEmail(e.target.value);
          }} />
          <br></br>
          <label className="ud_edit_add_Supplier_name6"><b>DESCRIPTION</b></label>
          <br></br>
          <input className="ud_edit_add_Supplier_box6" type="text"    value={description}
          required
           onChange={(e) => {
            setDescription(e.target.value);
          }}/>
          <br></br>
        </div>




        <button className="ud_edit_add_Supplier_Savebutton" onClick={editSupplierAddForm}>
          Save
        </button>

        <button className="ud_edit_add_Supplier_Backbutton" onClick={onClick}>
          Cancel
        </button>

      </div>
    </>
  );
};

export default EditSupplierAddForm;
