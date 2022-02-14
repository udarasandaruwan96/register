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
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const DailySales = (props) => {
  const [carts, setCarts] = useState([]);
  const [amount, setAmount] = useState("");
  const columns = [
    { title: "Customer Name", field: "cusname" },
    { title: "Email", field: "cusemail" },
    { title: "City", field: "cuscity" },
    { title: "Address", field: "cusaddress" },
    { title: "Total", field: "carttotal" },
    { title: "Date", field: "date" },
  ];
  const cal = () => {
    var price = 0;
    carts.forEach((item) => {
      price += +item.carttotal;
    });
    setAmount(price);
  };

  useEffect(() => {
    console.log(props.Id);
    axios
      .get(`http://localhost:5000/cart/${props.cusId}`) //retrieving data from the database
      .then((res) => {
        setCarts(res.data.data);
      });
  });
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Sales", 100, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: carts,
    });
    doc.save("Sales.pdf");
  };

  return (
    <>
      <div className="titlee">Monthly Sales</div>
      <div className="centerTable">
        <TableContainer component={Paper} className="salarygenarate1">
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">NAME</div>
                </TableCell>
                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">EMAIL</div>
                </TableCell>
                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">CITY DISTRICT </div>
                </TableCell>

                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">ADDRESS </div>
                </TableCell>
                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">TOTAL PAYMENT</div>
                </TableCell>
                <TableCell align="center" className="cellColor3">
                  <div className="headcolor1">CONFIRM DATE</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    className="cellColor1"
                  >
                    {" "}
                    {row.cusname}
                  </TableCell>
                  <TableCell align="center" className="cellColor1">
                    {row.cusemail}
                  </TableCell>
                  <TableCell align="center" className="cellColor1">
                    {row.cuscity}
                  </TableCell>

                  <TableCell align="center" className="cellColor1">
                    {row.cusaddress}
                  </TableCell>
                  <TableCell align="center" className="cellColor1">
                    {row.carttotal}
                  </TableCell>
                  <TableCell align="center" className="cellColor1">
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div onClick={() => props.onClick("account")} className="backBtnnnn">
          PREVIOUS
        </div>
        <button className="Btn10" onClick={cal}>
          Total
        </button>
        <button className="Btn9" onClick={downloadPdf}>
          Print PDF
        </button>
        <div className="submitsales">
          <lable className="totalName">
            Monthly sale total
            <input className="total" type="text" value={amount} />
          </lable>
        </div>
      </div>
    </>
  );
};

export default DailySales;
