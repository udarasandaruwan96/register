import React, { useState } from "react";
import "./Edit.css";
import axios from "axios";
import swal from "sweetalert";

const EditData = (props) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [ContactInfo, setContactInfo] = useState("");

  const EditData = () => {
    const post = {
      Name: Name,
      Email: Email,
      Address: Address,
      ContactInfo: ContactInfo,
    };

    axios
      .post("http://localhost:5000/hr", post)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "Employee details added successfully!", "success");
        } else {
          console.log(res.data);
          swal("Error", "", "error");
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
    <div className="main1">
      <div className="register">
        <center>
          <br />
          <h2>
            <i>ADD EMPLOYEE DETAILS</i>
          </h2>
        </center>
        <div className="register1">
          <label>
            <b> Name :</b>
          </label>
          <br />
          <input
            type="text"
            className="name"
            placeholder="Name"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label>
            <b>Email :</b>
          </label>
          <br />
          <input
            type="text"
            className="name"
            placeholder="Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>{}</div>
          <label>
            <b>Address :</b>
          </label>
          <br />
          <input
            type="text"
            className="name"
            placeholder="Address"
            value={Address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <label>
            <b>Contact Info :</b>
          </label>
          <br />
          <input
            type="text"
            className="name"
            placeholder="ContactInfo"
            value={ContactInfo}
            onChange={(e) => {
              setContactInfo(e.target.value);
            }}
          />
          <button onClick={EditData} className="Backbtn13">
            <i>Save</i>
          </button>

          <div onClick={() => props.onClick("hr")} className="Backbtn12">
            {" "}
            Previous
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditData;
