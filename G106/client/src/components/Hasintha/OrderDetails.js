import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import swal from "sweetalert";
import axios from "axios";
import "./OrderDetails.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const ViewItem = (props) => {
  const [addcarts, setAddCarts] = useState([]);
//report
  const columns = [
    { title: "ORDERS ID", field: "_id" },
    { title: "ITEM NAME", field: "itemName" },
    { title: "CATEGORY", field: "category" },
    { title: "SIZE", field: "size" },
    { title: "PRICE", field: "price" },
    { title: "QUANTITY", field: "number" },
    { title: "TOTAL", field: "total" },
  ];


  //search..........................
  const [filterText, setFilterText] = useState("");

  //search..........................
  const filteredItems = addcarts.filter((shop) =>
    shop._id.toLocaleLowerCase().includes(filterText)
  );
  const showaddcarts = filterText ? filteredItems : addcarts;
  useEffect(() => {
    console.log(props.Id);
    axios
      .get(`http://localhost:5000/addcart/${props.cusId}`) //retrieving data from the database
      .then((res) => {
        setAddCarts(res.data.data);
      });
  });

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/addcart/${e.target.value}`)
        .then((res) => {
          swal("Success", " Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };

  const genOrderRepo = () => {
    const doc = new jsPDF();
    doc.text("Order Details", 90, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: showaddcarts,
    });
    doc.save("AllOrders.pdf");
  };

  return (
    <>
      <div className="vieworder">
        <div className="ordertitle">Order Details</div>

        <div className="vieworder2">
          <div class="search-bar">
            <div action="">
              <input
                className="search-bar-name"
                type="text"
                placeholder="Search Order ID.."
                name="search"
                onChange={(e) =>
                  setFilterText(e.target.value.toLocaleLowerCase())
                }
              />
            </div>{" "}
          </div>

          <TableContainer
            component={Paper}
            style={{
              maxHeight: 440,
              minHeight: 350,
              maxWidth: 850,
              backgroundColor: "#1B1B1B",
              borderRadius: "15px",
            }}
          >
            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">ORDER ID</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">ITEM NAME</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">CATEGORY</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">SIZE</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">PRICE</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">TOTAL</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">ORDER DATE</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">STATUS</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showaddcarts.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cellColorO1"
                    >
                      {" "}
                      {row._id}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.itemName}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.category}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {" "}
                      {row.size}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.number}*{row.total}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.total}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {" "}
                      {row.date}
                    </TableCell>
                    <TableCell
                      onClick={() => 0}
                      align="center"
                      className="ncellColor2"
                    >
                      <select className="orderstatus">
                        <option className="new">NEW</option>
                        <option className="del">DELIVERED</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div onClick={() => props.onClick("shopping")} className="backBtn2">
          PREVIOUS
        </div>
      </div>
      
      <div>
          {" "}
          <button className="repo-btn-cart" onClick={genOrderRepo}>
            ORDER PDF
          </button>
        </div>

      <button
        className="conform-order"
        onClick={() => props.onClick("confirmorder")}
      >
        CONFIRM ORDERS
      </button>
    </>
  );
};

export default ViewItem;
