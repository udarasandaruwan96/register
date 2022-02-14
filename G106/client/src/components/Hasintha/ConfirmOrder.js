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

const ConfirmOrder = (props) => {
  const [carts, setCarts] = useState([]);

  const columns = [
    { title: "ORDERS ID", field: "orderid" },
    { title: "NAME", field: "cusname" },
    { title: "NUMBER", field: "cusMobile" },
    { title: "DESTINATION", field: "cusaddress" },
    { title: "TOTAL PAYMENT ($)", field: "carttotal" },
    // { title: "Salary", field: "employeeSalary" },
  ];

  //search..........................
  const [filterText, setFilterText] = useState("");

  //search..........................
  const filteredItems = carts.filter((shop) =>
    shop.orderid.toLocaleLowerCase().includes(filterText)
  );
  const showcarts = filterText ? filteredItems : carts;
  useEffect(() => {
    console.log(props.Id);
    axios
      .get(`http://localhost:5000/cart`) //retrieving data from the database
      .then((res) => {
        setCarts(res.data.data);
      });
  });
  const genOrderRepo = () => {
    const doc = new jsPDF();
    doc.text("Order Details", 20, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: carts,
    });
    doc.save("confirmOrders.pdf");
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
                placeholder="SEARCH.."
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
              maxHeight: 450,
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
                    <div className="headcolorO">ORDERS ID</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">NAME</div>
                  </TableCell>

                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">DESTINATION</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">NUMBER</div>
                  </TableCell>

                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">PAYMENT</div>
                  </TableCell>
                  <TableCell align="center" className="cellColorO">
                    <div className="headcolorO">CONFIRM DATE</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showcarts.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cellColorO1"
                    >
                      {row.orderid}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.cusname}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.cusaddress}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.cusMobile}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.carttotal}
                    </TableCell>
                    <TableCell align="center" className="cellColorO1">
                      {row.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div onClick={() => props.onClick("orderdetails")} className="backBtn2">
          PREVIOUS
        </div>
        <div>
          {" "}
          <button className="repo-btn-order" onClick={genOrderRepo}>
            ORDER PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
