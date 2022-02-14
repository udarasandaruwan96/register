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
import SearchIcon from "@material-ui/icons/Search";

const ManageFeedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterText, setFilterText] = useState("");

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/feedback/${e.target.value}`) //retrieving data from the database
        .then((res) => {
          swal("Success", "Item Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/feedback") //retrieving data from the database
      .then((res) => {
        setFeedbacks(res.data.data);
      });
  });

  const filteredItems = feedbacks.filter(
    (item) =>
      item.itemName.toLocaleLowerCase().includes(filterText) ||
      item.rating.toLocaleLowerCase().includes(filterText)
  );

  const itemsToDisplay = filterText ? filteredItems : feedbacks;

  return (
    <>
      <div className="centerTable">
        <div className="title">Manage Feedback</div>
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#1B1B1B", borderRadius: "15px" }}
        >
          <div className="search">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              className="searchbar"
              placeholder="Search Name"
              onChange={(e) =>
                setFilterText(e.target.value.toLocaleLowerCase())
              }
            />
          </div>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="cellColor">
                  <div className="headcolor">Item Name</div>
                </TableCell>
                <TableCell align="center" className="cellColor">
                  <div className="headcolor">Description</div>
                </TableCell>
                <TableCell align="center" className="cellColor">
                  <div className="headcolor">Rating</div>
                </TableCell>
                <TableCell align="center" className="cellColor">
                  <div className="headcolor">Date</div>
                </TableCell>
                <TableCell align="center" className="cellColor">
                  <div className="headcolor">Action</div>
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
                    className="cellColor"
                  >
                    {row.itemName}
                  </TableCell>
                  <TableCell align="center" className="cellColor">
                    {row.description}
                  </TableCell>
                  <TableCell align="center" className="cellColor">
                    {row.rating}
                  </TableCell>
                  <TableCell align="center" className="cellColor">
                    {row.date}
                  </TableCell>
                  <TableCell itemType="button" align="center">
                    <button
                      className="deleteIcon"
                      value={row._id}
                      onClick={deleteData}
                    >
                      delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div onClick={() => props.onClick("feedback")} className="backBtn">
          PREVIOUS
        </div>
      </div>
    </>
  );
};

export default ManageFeedback;
