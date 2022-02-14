import React, { useState } from "react";
import "./Edit.css";
import "./Attend.css";
import axios from "axios";
import swal from "sweetalert";
import Atendtable from "./Atendtable";

const Attend = (props) => {
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [InTime, setInTime] = useState("");
  const [OutTime, setOutTime] = useState("");
  const [OTHours, setOTHours] = useState("");

  const Attend = () => {
    const post = {
      Name: Name,
      Date: Date,
      InTime: InTime,
      OutTime: OutTime,
      OTHours: OTHours,
    };
    axios
      .post("/HrAttendence", post)
      .then((res) => {
        swal("Success", "Employee Details Added successfully!", "success");
      })
      .catch((err) => {
        swal("Error", "Fields are empty", "error");
      });
  };

  return (
    <div>
      <div className="main1">
        <div className="register">
          <center>
            <h2>Add Attendence</h2>
          </center>
          <div className="register1">
            <label>
              <b>First Name :</b>
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
              <b>Date :</b>
            </label>
            <br />
            <input
              type="text"
              className="name"
              placeholder="Add the Date"
              value={Date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <label>
              <b>InTime:</b>
            </label>
            <br />
            <input
              type="text"
              className="name"
              placeholder="InTime"
              value={InTime}
              onChange={(e) => {
                setInTime(e.target.value);
              }}
            />
            <label>
              <b>OutTime :</b>
            </label>
            <br />
            <input
              type="text"
              className="name"
              placeholder="OutTime"
              value={OutTime}
              onChange={(e) => {
                setOutTime(e.target.value);
              }}
            />
            <label>
              <b>OT Hours :</b>
            </label>
            <br />
            <input
              type="text"
              className="name"
              placeholder="OutTime"
              value={OTHours}
              onChange={(e) => {
                setOTHours(e.target.value);
              }}
            />
            <div onClick={() => props.onClick("hr")} className="Backbtn130">
              {" "}
              Previous
            </div>
            <button onClick={Attend} className="Backbtn131">
              Save
            </button>

            <div
              onClick={() => props.onClick("atendtable")}
              className="Backbtn132"
            >
              View
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
