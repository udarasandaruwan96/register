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
import "./view.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditEmp from "./EditEmp";
import Editattendence from "./Editattendence";
import SearchIcon from "@material-ui/icons/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const Atendtable = (props) => {
  const [hrs, setHrs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");

  const columns = [
    { title: " Name", field: "Name" },
    { title: "Date", field: "Date" },
    { title: "InTime", field: "InTime" },
    { title: "OutTime", field: "OutTime" },
    { title: "OThours", field: "OTHours" },
  ];
  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/hrAttendence/${e.target.value}`) //retrieving data from the database
        .then((res) => {
          swal("Success", "Item Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };

  const editData = (e, data) => {
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/hrAttendence/${props.Id}") //retrieving data from the database
      .then((res) => {
        setHrs(res.data.data);
      });
  });
  const filteredItems = hrs.filter((sup) =>
  sup.Name.toLocaleLowerCase().includes(filterText)
);
const itemsToDisplay = filterText ? filteredItems : hrs;

const downloadPdf = () => {
  const doc = new jsPDF();
  doc.text("Employee Attendence Details", 20, 10);
  doc.setFont("Helvertica", "bold");
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
  doc.autoTable({
    margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: itemsToDisplay,
  });
  doc.save("table.pdf");
};
  return (
    <>
      {edit ? (
        <Editattendence onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (
        <div className="ejs">
          <div className="title">Employee Attendence</div>

          <div className="search">
            <SearchIcon className="searchIcon1" />
              <input
              type="text"
              className="searchbar2"
              placeholder ="Enter Employee Name"
              onChange={(e) =>
                setFilterText(e.target.value.toLocaleLowerCase())
              }
              />
            </div>
          <TableContainer
            component={Paper}
            
            style={{ backgroundColor: "#002e2e", borderRadius: "0px"  }}
          >
            <div className="tt2"></div>
            <Table aria-label="caption table1">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor111">Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor122">Date</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor133">InTime</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor144">OutTime</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor155">OTHours</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor155">Action</div>
                  </TableCell>
                
                  {/* <TableCell align="center" className="cellColor11">
                  <div className="headcolor155">Action</div>
                </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {hrs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cellColor"
                    >
                      {row.Name}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.Date}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.InTime}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.OutTime}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.OTHours}
                    </TableCell>
                    <TableCell itemType="button" align="center">


                      <button
                        className="Backbtn179"
                        value={row._id}
                         onClick={deleteData}
                        
                      >
                        Delete
                      </button>

                      <button
                        className="Backbtn176"
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
          <div onClick={() => props.onClick("hr")} className="buttond">
            Back
          </div>
          <button className="Backbtn133" onClick={downloadPdf}>PDF</button>
        </div>
      )}
      ;
    </>
  );
};

export default Atendtable;
