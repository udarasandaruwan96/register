import React, { useState } from "react";
import "./UpdateTransportFacilityDetails.css";
import axios from "axios";
import swal from "sweetalert";

const UpdateCateringFacilityDetails = ({ onClick, id, formData }) => {
  const [meal, setMeal] = useState(formData.meal);
  const [supplier, setSupplier] = useState(formData.supplier);
  const [time, setTime] = useState(formData.time);

  const updateCateringFacilityDetails = () => {
    const catering = {
      meal: meal,
      supplier: supplier,
      time: time,
    };

    axios

      .post(`http://localhost:5000/catering/${id}`, catering)
      .then((res) => {
        if (res.data.message === "success") {
          setMeal("");
          setSupplier("");
          setTime("");

          console.log(res.data);
          swal("Success", "update catering details successfully", "success");
          return onClick();
        } else {
          console.log(res.data);
          swal("Error", "update catering details unsuccessfully", "error");
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
      <div className="titleupdatetransportfacility">
        UPDATE CATERING FACILITY DETAILS
      </div>

      <div className="updatetransform2">
        <div type="text" value={formData.Id} disabled="true" />
        <label className="updatetransname1">
          Meal
          <input
            className="updatetransbox2"
            type="text"
            value={meal}
            onChange={(e) => {
              setMeal(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="updatetransname1">
          Supplier
          <input
            className="updatetransbox3"
            type="text"
            value={supplier}
            onChange={(e) => {
              setSupplier(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="updatetransname1">
          Time
          <input
            className="updatetransbox4"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </label>
        <br></br>

        <button
          className="updatetransBtn"
          onClick={updateCateringFacilityDetails}
        >
          SAVE
        </button>
      </div>

      {
        <button className="cancelupdatetransport" onClick={onClick}>
          Cancel
        </button>
      }
    </>
  );
};

export default UpdateCateringFacilityDetails;
