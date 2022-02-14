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
import "./CateringDetails.css";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import UpdateCateringFacilityDetails from "./UpdateCateringFacility Details";
import SearchIcon from "@material-ui/icons/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const CateringDetails = (props) => {
  const [caterings, setCaterings] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");
  const columns = [
    { title: "MEAL", field: "meal" },
    { title: "SUPPLIER", field: "supplier" },
    { title: "TIME", field: "time" },
  ];

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/catering/${e.target.value}`) //retrieving data from the database
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
    axios.get(`http://localhost:5000/catering/${props.Id}`).then((res) => {
      setCaterings(res.data.data);
    });
  });

  const filteredItems = caterings.filter((cate) =>
    cate.time.toLocaleLowerCase().includes(filterText)
  );
  const itemsToDisplay = filterText ? filteredItems : caterings;

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvertica", "bold");
    doc.text("Catering Details", 90, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    // doc.text("Date", 200, 20);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: itemsToDisplay,
    });
    doc.save("catering.pdf");
  };

  return (
    <>
      {edit ? (
        <UpdateCateringFacilityDetails
          onClick={() => setEdit(false)}
          id={Id}
          formData={data}
        />
      ) : (
        <div className="caption table">
          <div className="titlecateringfacility">CATERING FACILITY DETAILS</div>
          <TableContainer component={Paper} className="facilitycatering">
            <div>
              <SearchIcon className="searchBtnCate" />
              <input
                type="text"
                className="searchnamecate"
                style={{}}
                placeholder="Search  time"
                onChange={(e) =>
                  setFilterText(e.target.value.toLocaleLowerCase())
                }
              />
            </div>

            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cateringCellColor2">
                    <div className="cateringHeadcolor2">MEAL</div>
                  </TableCell>
                  <TableCell align="center" className="cateringCellColor2">
                    <div className="cateringHeadcolor2">SUPPLIER</div>
                  </TableCell>
                  <TableCell align="center" className="cateringCellColor2">
                    <div className="cateringHeadcolor2">TIME</div>
                  </TableCell>
                  <TableCell align="center" className="cateringCellColor2">
                    <div className="cateringHeadcolor2">ACTION</div>
                  </TableCell>
                  <TableCell align="center" className="cateringCellColor2">
                    <div className="cateringHeadcolor2">ACTION</div>
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
                      className="cateringCellColor2"
                    >
                      {row.meal}
                    </TableCell>

                    <TableCell align="center" className="cateringCellColor2">
                      {row.supplier}
                    </TableCell>
                    <TableCell align="center" className="cateringCellColor2">
                      {row.time}
                    </TableCell>

                    <TableCell
                      itemType="button"
                      align="center"
                      className="cateringdeleteIcon3"
                    >
                      <button
                        className="cateringdeleteIcon3"
                        value={row._id}
                        onClick={deleteData}
                      >
                        DELETE
                      </button>
                    </TableCell>

                    <TableCell
                      itemType="button"
                      align="center"
                      className="catedeleteIcon"
                    >
                      <button
                        className="updatecate"
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
            className="cateringbackBtn2"
          >
            PREVIOUS
          </div>

          <div
            onClick={() => props.onClick("addcateringfacilitydetails")}
            className="addcateringdetailsbutton"
          >
            Add Details
          </div>
          <button className="BtnPrint2" onClick={downloadPdf}>
            Print PDF
          </button>
        </div>
      )}
    </>
  );
};

export default CateringDetails;
