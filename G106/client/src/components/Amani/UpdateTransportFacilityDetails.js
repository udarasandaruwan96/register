import React, { useState } from "react";
import "./UpdateTransportFacilityDetails.css";
import axios from "axios";
import swal from "sweetalert";

const UpdateTransportFacilityDetails = ({ onClick, id, formData }) => {
  const [startingPoint, setStartingPoint] = useState(formData.startingPoint);
  const [endingPoint, setEndingPoint] = useState(formData.endingPoint);
  const [time, setTime] = useState(formData.time);

  const updateTransportFacilityDetails = () => {
    const facility = {
      startingPoint: startingPoint,
      endingPoint: endingPoint,
      time: time,
    };

    axios

      .post(`http://localhost:5000/facility/${id}`, facility)
      .then((res) => {
        if (res.data.message === "success") {
          setStartingPoint("");
          setEndingPoint("");
          setTime("");

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
      <div className="titleupdatetransportfacility">
        UPDATE TRANSPORT FACILITY DETAILS
      </div>

      <div className="updatetransform2">
        <div type="text" value={formData.Id} disabled="true" />
        <label className="updatetransname1">
          Starting Point
          <input
            className="updatetransbox2"
            type="text"
            value={startingPoint}
            onChange={(e) => {
              setStartingPoint(e.target.value);
            }}
          />
        </label>
        <br></br>

        <label className="updatetransname1">
          Ending Point
          <input
            className="updatetransbox3"
            type="text"
            required
            value={endingPoint}
            onChange={(e) => {
              setEndingPoint(e.target.value);
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
          onClick={updateTransportFacilityDetails}
        >
          SAVE
        </button>
      </div>
      <button className="cancelupdatetransport" onClick={onClick}>
        Cancel
      </button>
    </>
  );
};

export default UpdateTransportFacilityDetails;
