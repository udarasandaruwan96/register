import React, { useState } from "react";
import "./Account.css";
import axios from "axios";
import swal from "sweetalert";

const EditSalary = ({ onClick, id, formData }) => {
  const [employeeName, setEmployeeName] = useState(formData.employeeName);
  const [date, setDate] = useState(formData.date);
  const [email, setEmail] = useState(formData.email);
  const [workDays, setWorkDay] = useState(formData.workDays);
  const [otHours, setOtHours] = useState(formData.otHours);
  const [employeeSalary, setEmployeeSalary] = useState(formData.employeeSalary);
  const [dayPay, setDayPay] = useState("1200");
  const [otPay, setOtPay] = useState("200");

  function cal() {
    setEmployeeSalary(workDays * dayPay + otHours * otPay);
  }

  const editsalary = () => {
    const salary = {
      employeeName: employeeName,
      date: date,
      email: email,
      workDays: workDays,
      otHours: otHours,
      employeeSalary: employeeSalary,
    };
    axios
      .post(`http://localhost:5000/salary/${id}`, salary)
      .then((res) => {
        if (res.data.message === "success") {
          setEmployeeName("");
          setDate("");
          setEmail("");
          setWorkDay("");
          setOtHours("");
          setEmployeeSalary("");

          swal("Success", "Edit Success", "success");

          return onClick();
        } else {
          swal("Sorry", " edit failed", "error");
        }
      })
      .catch((err) => {
        try {
          swal("Error", err.response.data.err, "error");
        } catch (err) {
          swal("Error", "fields are empty", "error");
        }
      });
  };

  return (
    <>
      <div className="titlee"> EDIT SALARY</div>
      <div className="formedit">
        <div className="title1">Employee Details</div>

        <div type="text" value={formData.Id} disabled="true" />
        <br></br>

        <label className="name2">Employee Name</label>

        <input
          className="box1"
          type="text"
          value={employeeName}
          required
          onChange={(e) => {
            setEmployeeName(e.target.value);
          }}
        />

        <br></br>

        <label className="name2">Date</label>

        <input
          className="box2"
          type="text"
          value={date}
          required
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <br></br>

        <label className="name2">Email</label>

        <input
          required
          className="box3"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <br></br>

        <label className="name2">Works Day</label>

        <input
          className="box4"
          type="text"
          value={workDays}
          required
          onChange={(e) => {
            setWorkDay(e.target.value);
          }}
        />

        <label className="name2">Day payment</label>

        <input
          className="box7"
          type="text"
          value={dayPay}
          onChange={(e) => {
            setDayPay(+e.target.value);
          }}
          readOnly
        />

        <label className="name2">OT Hours</label>

        <input
          className="box6"
          type="text"
          value={otHours}
          required
          onChange={(e) => {
            setOtHours(e.target.value);
          }}
        />

        <label className="name2">OT Hours Pay</label>

        <input
          className="box7"
          type="text"
          value={otPay}
          onChange={(e) => {
            setOtPay(+e.target.value);
          }}
          readOnly
        />

        <br></br>
        <label className="name2">Employee Salary</label>

        <input
          className="box8"
          type="text"
          value={employeeSalary}
          required
          onChange={(e) => {
            setEmployeeSalary(e.target.value);
          }}
          readOnly
        />

        <br></br>

        <button className="Btn" onClick={editsalary}>
          Save Salary
        </button>
        <button className="BtnBtn" onClick={onClick}>
          Cancel
        </button>
        <button className="Btn1n" onClick={cal}>
          Genarate
        </button>
      </div>
    </>
  );
};

export default EditSalary;
