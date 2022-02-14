import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import SupplierDetails from "./SupplierDeatails";
import SearchIcon from "@material-ui/icons/Search";

const GetSupplierDetails = (props) => {
  const [supplier, setSupplier] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});
  const [filterText, setFilterText] = useState("");

  const editData = (e, data) => {
    console.log();
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/order/${props.ID}").then((res) => {
      setSupplier(res.data.data);
    });
  });


  const filteredItems = supplier.filter((sup) =>
    sup.supplierName.toLocaleLowerCase().includes(filterText)
  );
  const itemsToDisplay = filterText ? filteredItems : supplier;
  
  
  return (
    <>
      <div className="titlee">Supplier Details</div>
      {edit ? (
        <SupplierDetails
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
                    <div className="headcolor1">Prod_Name</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Quantity</div>
                  </TableCell>
                  <TableCell align="center" className="cellColor3">
                    <div className="headcolor1">Total Price</div>
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
                        Pay
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
          <div onClick={() => props.onClick("suppliertable")} className="btnn1">
            Confirm Payment
          </div>
        </div>
      )}
    </>
  );
};

export default GetSupplierDetails;
