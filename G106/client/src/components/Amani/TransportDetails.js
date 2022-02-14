import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import swal from "sweetalert";
import "./TransportDetails.css";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import UpdateTransportFacilityDetails from "./UpdateTransportFacilityDetails";
import SearchIcon from "@material-ui/icons/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const TransportDetails = (props) => {
  const [facilities, setFacilities] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");
  const columns = [
    { title: "STARTING POINT", field: "startingPoint" },
    { title: "ENDING POINT", field: "endingPoint" },
    { title: "TIME", field: "time" },
  ];

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/facility/${e.target.value}`) //retrieving data from the database
        .then((res) => {
          swal("Success", " Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };

  const editData = (e, data) => {
    console.log();
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/facility/${props.Id}`).then((res) => {
      setFacilities(res.data.data);
    });
  });

  const filteredItems = facilities.filter((trans) =>
    trans.endingPoint.toLocaleLowerCase().includes(filterText)
  );
  const itemsToDisplay = filterText ? filteredItems : facilities;

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvertica", "bold");
    doc.text("Transport Details", 90, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    // doc.text("Date", 200, 20);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: itemsToDisplay,
    });
    doc.save("transport.pdf");
  };

  return (
    <>
      {edit ? (
        <UpdateTransportFacilityDetails
          onClick={() => setEdit(false)}
          id={Id}
          formData={data}
        />
      ) : (
        <div className="caption table">
          <div className="titletransportfacility">
            TRANSPORT FACILITY DETAILS
          </div>
          <TableContainer component={Paper} className="facilitytransport">
            <div>
              <SearchIcon className="searchBtntrans" />
              <input
                type="text"
                className="searchnametrans"
                style={{}}
                placeholder="Search  endingPoint Name"
                onChange={(e) =>
                  setFilterText(e.target.value.toLocaleLowerCase())
                }
              />
            </div>

            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="transportCellColor2">
                    <div className="transportHeadcolor2">STARTING POINT</div>
                  </TableCell>
                  <TableCell align="center" className="transportCellColor2">
                    <div className="transportHeadcolor2">ENDING POINT</div>
                  </TableCell>
                  <TableCell align="center" className="transportCellColor2">
                    <div className="transportHeadcolor2">TIME</div>
                  </TableCell>
                  <TableCell align="center" className="transportCellColor2">
                    <div className="transportHeadcolor2">ACTION</div>
                  </TableCell>
                  <TableCell align="center" className="transportCellColor2">
                    <div className="transportHeadcolor2">ACTION</div>
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
                      className="transportCellColor2"
                    >
                      {row.startingPoint}
                    </TableCell>

                    <TableCell align="center" className="transportCellColor2">
                      {row.endingPoint}
                    </TableCell>
                    <TableCell align="center" className="transportCellColor2">
                      {row.time}
                    </TableCell>

                    <TableCell
                      itemType="button"
                      align="center"
                      className="transportdeleteIcon4"
                    >
                      <button
                        className="transportdeleteIcon4"
                        value={row._id}
                        onClick={deleteData}
                      >
                        DELETE
                      </button>
                    </TableCell>

                    <TableCell
                      itemType="button"
                      align="center"
                      className="transdeleteIcon"
                    >
                      <button
                        className="updatetrans"
                        value={row._id}
                        onClick={(e) => editData(e, row)}
                      >
                        EDIT
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            onClick={() => props.onClick("facility")}
            className="transportbackBtn2"
          >
            PREVIOUS
          </div>

          <div
            onClick={() => props.onClick("addtransportfacilitydetails")}
            className="addtransportdetailsbutton"
          >
            Add Details
          </div>

          <button className="BtnPrint1" onClick={downloadPdf}>
            Print PDF
          </button>
        </div>
      )}
    </>
  );
};

export default TransportDetails;
