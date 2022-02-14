import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import axios from "axios";
import EditSalary from "./EditSalary";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const SalaryDetails = (props) => {
  const [salarys, setSalarys] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [amount, setAmount] = useState("");
  const columns = [
    { title: "Employee Name", field: "employeeName" },
    { title: "Date", field: "date" },
    { title: "Email", field: "email" },
    { title: "Work Days", field: "workDays" },
    { title: "Ot Hours", field: "otHours" },
    { title: "Salary", field: "employeeSalary" },
  ];

  const cal = () => {
    var price = 0;
    salarys.forEach((item) => {
      price += item.employeeSalary;
    });
    setAmount(price);
  };
  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/salary/${e.target.value}`)
        .then((res) => {
          swal("Success", " Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };
  // function editData(id) {
  //   console.log(id);
  //   props.history.push("/EditSalary" + id);
  // }

  const editData = (e, data) => {
    console.log();
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/salary/${props.Id}`).then((res) => {
      setSalarys(res.data.data);
    });
  });

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvertica", "bold");
    doc.text("Salary Details", 90, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    // doc.text("Date", 200, 20);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: salarys,
    });

    doc.save("salary.pdf");
  };


  return (
    <>
      <div className="titlee">Salary Details</div>
      {edit ? (
        <EditSalary onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (
        <div className="centerTable">
          <TableContainer component={Paper} className="salarygenarate1">
            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Employee Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Date</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Email</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Works Days</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Works OT</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Salary</div>
                  </TableCell>
                  <TableCell align="center" className="deleteIconIcon">
                    <div className="headcolor1">Action</div>
                  </TableCell>
                  <TableCell align="center" className="deleteIconIcon">
                    <div className="headcolor1">Action</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salarys.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cellColor1"
                    >
                      {row.employeeName}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.date}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.email}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.workDays}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.otHours}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.employeeSalary}
                    </TableCell>
                    <TableCell
                      itemType="button"
                      align="center"
                      className="deleteIconIcon"
                    >
                      <button
                        className="deleteIcontablr"
                        value={row._id}
                        onClick={deleteData}
                      >
                        Delete
                      </button>
                    </TableCell>
                    <TableCell
                      itemType="button"
                      align="center"
                      className="deleteIconIcon"
                    >
                      <button
                        className="uptadeIcontablr"
                        value={row._id}
                        onClick={(e) => editData(e, row)}
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            onClick={() => props.onClick("getsalarydetails")}
            className="backBtnnnn"
          >
            PREVIOUS
          </div>
          <button className="Btn10" onClick={cal}>
            Total
          </button>
          
          <button className="Btn9" onClick={downloadPdf}>
            Print PDF
          </button>

          <div className="submitsales">
            <lable className="totalName">
              Monthly salary total
              <input className="total" type="text" value={amount} />
            </lable>
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryDetails;
