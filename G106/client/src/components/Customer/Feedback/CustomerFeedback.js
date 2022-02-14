import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import EditForm from "./EditForm";
import SearchIcon from "@material-ui/icons/Search";

const CustomerFeedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");

  //set relavant feedback data to the variable which we are going to edit 
  const editData = (e, data) => {
    setFeedbackId(e.target.value);
    setData(data);
    setEdit(true);
  };

  //get current customers all the feedbacks from the database
  useEffect(() => {
    console.log(props.Id);
    axios
      .get(`http://localhost:5000/feedback/${props.cusId}`) //retrieving data from the database
      .then((res) => {
        setFeedbacks(res.data.data);
      });
  });

  //search term items are saved in this filtered item variable
  const filteredItems = feedbacks.filter(
    (item) =>
      item.itemName.toLocaleLowerCase().includes(filterText) ||
      item.rating.toLocaleLowerCase().includes(filterText)
  );

    //item varible that displays items
  const itemsToDisplay = filterText ? filteredItems : feedbacks;

  return (
    <>
      {edit ? (
        <EditForm
          onClick={() => setEdit(false)}
          fid={feedbackId}
          formData={data}
        />
      ) : (
        <>
          <div className="table-center">
            <TableContainer
              component={Paper}
              style={{
                backgroundColor: "#1B1B1B",
                borderRadius: "15px",
                width: "60%",
              }}
            >
              {/* search function */}
              <div className="search">
                <SearchIcon className="searchIcon" />
                <input
                  type="text"
                  className="searchbar"
                  placeholder="Search an item"
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
                  {/* items retrieving from the varibale */}
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
            <div onClick={props.onClick} className="backBtn">
              PREVIOUS
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerFeedback;
