import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import axios from "axios";
import "./ViewItem.css";
import SearchIcon from "@material-ui/icons/Search";
import EditItem from "./EditItem";

const ViewItem = (props) => {
  const [shoppings, setShoppings] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});

  //search..........................
  const [filterText, setFilterText] = useState("");

  const deleteData = (e) => {
    console.log(e.target.value);
    try {
      axios
        .delete(`http://localhost:5000/shopping/${e.target.value}`) //retrieving data from the database
        .then((res) => {
          swal("Success", "Item Deleted Successfully", "success");
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
    axios
      .get(`http://localhost:5000/shopping/${props.Id}`) //retrieving data from the database
      .then((res) => {
        setShoppings(res.data.data);
      });
  });

  //search..........................
  const filteredItems = shoppings.filter((shop) =>
    shop.itemName.toLocaleLowerCase().includes(filterText)
  );
  const showshoppings = filterText ? filteredItems : shoppings;

  return (
    <>
      {edit ? (
        <EditItem onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (
        <div className="viewitem01">
          <div className="itemtitle">View Item</div>
          <div className="viewitem2">
            <div class="search-bar">
              <div action="">
                <input
                  className="search-bar-name"
                  type="text"
                  placeholder="SEARCH.."
                  name="search"
                  onChange={(e) =>
                    setFilterText(e.target.value.toLocaleLowerCase())
                  }
                />
                {/* <button
                  className="search-bar-Btn1"
                  type="submit"
                  value="search"
                >
                  <SearchIcon />
                </button> */}
              </div>{" "}
            </div>
            <TableContainer
              component={Paper}
              style={{
                maxHeight: 450,
                minHeight: 200,
                maxWidth: 850,

                backgroundColor: "#1B1B1B",
                borderRadius: "15px",
              }}
            >
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">ITEM NAME</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">CATEGORIES</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">PRICE</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">SIZE</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">COLOUR</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">Description</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">Action</div>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      <div className="headcolor">Action</div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showshoppings.map((row, index) => (
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
                        {row.category}
                      </TableCell>
                      <TableCell align="center" className="cellColor">
                        {row.price}
                      </TableCell>
                      <TableCell align="center" className="cellColor">
                        {row.size}
                      </TableCell>
                      <TableCell align="center" className="cellColor">
                        {row.colour}
                      </TableCell>
                      <TableCell align="center" className="cellColor">
                        {row.description}
                      </TableCell>
                      <TableCell
                        itemType="button"
                        align="center"
                        
                      >
                        <button
                        className="viewdeleteIcon"
                          value={row._id}
                          onClick={(e) => editData(e, row)}
                        >
                          Edit
                        </button>
                      </TableCell>

                      <TableCell
                        itemType="button"
                        align="center" 
                      >
                        <button className="viewdeleteIcon" onClick={deleteData} value={row._id}>
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
      <div
        onClick={() => props.onClick("shopping")}
        className="viewitembackbtn1"
      >
        PREVIOUS
      </div>
    </>
  );
};

export default ViewItem;
