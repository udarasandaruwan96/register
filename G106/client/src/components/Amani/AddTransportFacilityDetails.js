import React, { useState } from "react";
import "./AddTransportFacilityDetails.css";
import axios from "axios";
import swal from "sweetalert";

const AddTransportFacilityDetails = (props) => {
  const [startingPoint, setStartingPoint] = useState("");
  const [endingPoint, setEndingPoint] = useState("");
  const [time, setTime] = useState("");

  const addTransportFacilityDetails = () => {
    const facility = {
      startingPoint: startingPoint,
      endingPoint: endingPoint,
      time: time,
    };

    axios
      .post("http://localhost:5000/facility", facility)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "add transport details successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "add transport details unsuccessfully", "error");
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
      <div className="titleaddtransportfacility">
        ADD TRANSPORT FACILITY DETAILS
      </div>

      <div className="addtransform2">
        <label className="addtransname1">
          {" "}
          Starting Point
          <input
            className="addtransbox2"
            type="text"
            onChange={(e) => {
              setStartingPoint(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="addtransname1">
          {" "}
          Ending Point
          <input
            className="addtransbox3"
            type="text"
            onChange={(e) => {
              setEndingPoint(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="addtransname1">
          {" "}
          Time
          <input
            className="addtransbox4"
            type="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </label>
        <br></br>

        <button className="addtransBtn" onClick={addTransportFacilityDetails}>
          SAVE
        </button>
      </div>

      <div
        onClick={() => props.onClick("transportdetails")}
        className="addtransbackBtnn"
      >
        PREVIOUS
      </div>
    </>
  );
};

export default AddTransportFacilityDetails;
