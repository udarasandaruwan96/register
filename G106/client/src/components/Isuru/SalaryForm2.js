import React, { useState } from "react";
import "./Account.css";
import axios from "axios";
import swal from "sweetalert";

const SalaryForm2 = ({ onClick, formData }) => {
  const [employeeName, setEmployeeName] = useState(formData.Name);
  const [date, setDate] = useState(formData.Date);
  const [email, setEmail] = useState("");
  const [workDays, setWorkDay] = useState("");
  const [otHours, setOtHours] = useState(formData.OTHours);
  const [dayPay, setDayPay] = useState("1800");
  const [otPay, setOtPay] = useState("200");
  const [employeeSalary, setEmployeeSalary] = useState("");

  function cal() {
    setEmployeeSalary(workDays * dayPay + otHours * otPay);
  }

  const salarydetails = () => {
    const salary = {
      employeeName: employeeName,
      date: date,
      email: email,
      workDays: workDays,
      otHours: otHours,
      employeeSalary: employeeSalary,
    };

    axios
      .post("http://localhost:5000/salary", salary)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "salary genarate successfully", "success");
        } else {
          console.log(res.data);
          swal("Error", "salary genarate unsuccessfully", "error");
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
    <>
      <div className="form2">
        <div className="title1">Employee Details</div>

        <label className="name2">Employee Name</label>

        <input
          className="box1"
          type="text"
          onChange={(e) => {
            setEmployeeName(e.target.value);
          }}
          value={employeeName}
        />

        <br></br>

        <label className="name2">Date</label>

        <input
          className="box2"
          type="text"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />

        <br></br>

        <label className="name2">Email</label>

        <input
          className="box3"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <br></br>

        <label className="name2">Works Day</label>

        <input
          className="box4"
          value={workDays}
          type="text"
          onChange={(e) => {
            setWorkDay(+e.target.value);
          }}
        />

        <label className="name2">Day payment</label>

        <input
          className="box5"
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
          onChange={(e) => {
            setOtHours(+e.target.value);
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
          onChange={(e) => {
            setEmployeeSalary(e.target.value);
          }}
          readOnly
        />

        <br></br>

        <button className="Btn" onClick={salarydetails}>
          Save
        </button>

        <button className="Btn1n" onClick={cal}>
          Genarate
        </button>
      </div>

      <div onClick={() => onClick("account")} className="backBtnn">
        PREVIOUS
      </div>
    </>
  );
};

export default SalaryForm2;
