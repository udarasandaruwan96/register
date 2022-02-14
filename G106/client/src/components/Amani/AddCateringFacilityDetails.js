import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./AddCateringFacilityDetails.css";
import axios from "axios";
import swal from "sweetalert";

const AddCateringFacilityDetails = (props) => {
  const [meal, setMeal] = useState("");
  const [supplier, setSupplier] = useState("");
  const [time, setTime] = useState("");

  const addCateringFacilityDetails = () => {
    const catering = {
      meal: meal,
      supplier: supplier,
      time: time,
    };

    axios
      .post("http://localhost:5000/catering", catering)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "add catering details successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "add catering details unsuccessfully", "error");
        }
      })
      .catch((error) => {
        try {
          swal("Error", error.response.data.msg, "error");
        } catch (error) {
          swal("Error", "server error", "error");
        }
      });
  };
  return (
    <>
      <div className="titleaddcateringfacility">
        ADD CATERING FACILITY DETAILS
      </div>

      <div className="addcateringform2">
        <label className="addcateringname1">
          {" "}
          Meal
          <input
            className="addcateringbox2"
            type="text"
            onChange={(e) => {
              setMeal(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="addcateringname1">
          {" "}
          Supplier
          <input
            className="addcateringbox3"
            type="text"
            onChange={(e) => {
              setSupplier(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="addcateringname1">
          {" "}
          Time
          <input
            className="addcateringbox4"
            type="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </label>
        <br></br>

        <button className="addcateringBtn" onClick={addCateringFacilityDetails}>
          SAVE
        </button>
      </div>

      <div
        onClick={() => props.onClick("cateringdetails")}
        className="addcateringbackBtnn"
      >
        PREVIOUS
      </div>
    </>
  );
};

export default AddCateringFacilityDetails;
