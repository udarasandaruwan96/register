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
import EditEmp from "./EditEmp";
import SearchIcon from "@material-ui/icons/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const View = (props) => {
  const [hrs, setHrs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");
  
  const columns = [
    { title: "Employe Name", field: "Name" },
    { title: "Email", field: "Email" },
    { title: "Address", field: "Address" },
    { title: "Contact Info", field: "ContactInfo" },
  ];
  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/hr/${e.target.value}`) //retrieving data from the database
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
      .get("http://localhost:5000/hr/${props.Id}") //retrieving data from the database
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
        <EditEmp onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (
        <div className="ejs">
          <div className="title">Employee List</div>

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
            style={{
              maxHeight: 300,
              minHeight: 200,
              maxWidth: 850,
              
            }}
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
                    <div className="headcolor122">Email</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor133">Address</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor11">
                    <div className="headcolor144">ContactInfo</div>
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
                {itemsToDisplay.map((row, index) => (
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
                      {row.Email}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.Address}
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      {row.ContactInfo}
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

export default View;
