import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import SalaryForm2 from "./SalaryForm2";
import SearchIcon from "@material-ui/icons/Search";

const GetSalaryDetails = (props) => {
  const [hrs, setHrs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");

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

  return (
    <>
      <div className="titlee">Salary Details</div>
      {edit ? (
        <SalaryForm2 onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (
        <div className="centerTable">
          <TableContainer component={Paper} className="salarygenarate1">
            <div>
              <SearchIcon className="searchBtn" />
              <input
                type="text"
                className="searchname"
                style={{}}
                placeholder="Search Employee Name"
                onChange={(e) =>
                  setFilterText(e.target.value.toLocaleLowerCase())
                }
              />
            </div>
            <div className="tt2"></div>
            <Table aria-label="caption table1">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Date</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">InTime</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">OutTime</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">OTHours</div>
                  </TableCell>
                  <TableCell align="center" className="deleteIconIcon">
                    <div className="headcolor1">Action</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsToDisplay.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cellColor1"
                    >
                      {row.Name}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.Date}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.InTime}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.OutTime}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.OTHours}
                    </TableCell>
                    <TableCell
                      itemType="button"
                      align="center"
                      className="deleteIconIcon"
                    >
                      <button
                        className="deleteIcontablr"
                        value={row._id}
                        onClick={(e) => editData(e, row)}
                      >
                        Pay
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            className="backBtnnnn21"
            onClick={() => props.onClick("salarydetails")}
          >
            View Salary
          </div>
          <div onClick={() => props.onClick("account")} className="backBtnnnn2">
            Back
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default GetSalaryDetails;
