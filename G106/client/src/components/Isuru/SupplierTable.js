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
import EditSupplierPay from "./EditSupplierPay";
import SearchIcon from "@material-ui/icons/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const SupplierTable = (props) => {
  const [supplierPays, setSupplierPays] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [amount, setAmount] = useState("");
  const [filterText, setFilterText] = useState("");
  const columns = [
    { title: "Supplier Name", field: "supplierName" },
    { title: "Company Name", field: "companyName" },
    { title: "Product Name", field: "productName" },
    { title: "Quantity", field: "quantity" },
    { title: "Total", field: "totalPrice" },
    { title: "Date", field: "date" },
  ];
  const cal = () => {
    var price = 0;
    supplierPays.forEach((item) => {
      price += item.totalPrice;
    });
    setAmount(price);
  };

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/supplierPay/${e.target.value}`)
        .then((res) => {
          swal("Success", " Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };
  // function editData(id) {
  //   console.log(id);
  //   props.history.push("/EditSalary" + id);
  // }

  const editData = (e, data) => {
    console.log();
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/supplierPay/${props.Id}`).then((res) => {
      setSupplierPays(res.data.data);
    });
  });
  const filteredItems = supplierPays.filter((sup) =>
    sup.supplierName.toLocaleLowerCase().includes(filterText)
  );
  const itemsToDisplay = filterText ? filteredItems : supplierPays;
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Supplier Payment", 90, 10);
    doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
    doc.autoTable({
      margin: { top: 80 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: itemsToDisplay,
    });
    doc.save("Supplier.pdf");
  };
  return (
    <>
      <div className="titlee">Supplier Payment </div>
      {edit ? (
        <EditSupplierPay
          onClick={() => setEdit(false)}
          id={Id}
          formData={data}
        />
      ) : (
        <div className="centerTable">
          <TableContainer component={Paper} className="salarygenarate1">
            <div>
              <SearchIcon className="searchBtn" />
              <input
                type="text"
                className="searchname"
                style={{}}
                placeholder="Search Supplier Name"
                onChange={(e) =>
                  setFilterText(e.target.value.toLocaleLowerCase())
                }
              />
            </div>
            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Supplier Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Company Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Product Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Quantity</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Total Price</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Payment Date</div>
                  </TableCell>
                  <TableCell align="center" className="deleteIconIcon">
                    <div className="headcolor1">Action</div>
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
                      {row.supplierName}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.companyName}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.productName}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.quantity}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.totalPrice}
                    </TableCell>
                    <TableCell align="center" className="cellColor1">
                      {row.date}
                    </TableCell>
                    <TableCell
                      itemType="button"
                      align="center"
                      className="deleteIconIcon"
                    >
                      <button
                        className="deleteIcontablr"
                        value={row._id}
                        onClick={deleteData}
                      >
                        Delete
                      </button>
                    </TableCell>
                    <TableCell
                      itemType="button"
                      align="center"
                      className="deleteIconIcon"
                    >
                      <button
                        className="uptadeIcontablr"
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
              Monthly total payment
              <input className="total" type="text" value={amount} />
            </lable>
          </div>
        </div>
      )}
    </>
  );
};

export default SupplierTable;
