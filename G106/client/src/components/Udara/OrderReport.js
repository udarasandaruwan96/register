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
import "./ManageOrder.css";
import EditOrderAddForm from "./EditOrderAddForm";
//--------------pdf-------------------------------------
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const OrderReport = (props) => {
  
  const [orders, setOrders] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});

//-----------------pdf----------
const columns = [
  { title: "SupplierName", field: "supplierName" },
  { title: "CompanyName", field: "companyName" },
  { title: "ProductName", field: "productName" },
  { title: "Quantity", field: "quantity" },
  { title: "TotalPrice", field: "totalPrice" },
  { title: "Description", field: "description" },
];

//search..........................
  const [filterText, setFilterText] = useState("");

  const deleteData = (e) => {
    try {
      axios
        .delete(`http://localhost:5000/order/${e.target.value}`)
        .then((res) => {
          swal("Success", "Item Deleted Successfully", "success");
        });
    } catch (error) {
      swal("Error", "Deletion Failed", "error");
    }

    console.log(e.target.value);
  };
 

  const editData = (e, data) => {
    
    setId(e.target.value);
    setData(data);
    setEdit(true);
  };



  useEffect(() => {
    axios.get("http://localhost:5000/order/${props.ID}").then((res) => {
      setOrders(res.data.data);
    });

  });

 //search..........................
  const filteredItems = orders.filter((ord) =>
  ord.supplierName.toLocaleLowerCase().includes(filterText)
  );
  const order = filterText ? filteredItems : orders;

//------------------Download PDF ---------

const downloadPdf = () => {
  const doc = new jsPDF();
  doc.setFont("Helvertica", "bold");
  doc.text("Order Details", 90, 10);
  doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
  // doc.text("Date", 200, 20);
  doc.autoTable({
    margin: { top: 80 },
    theme: "grid",
    columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    body: orders,
  });

  doc.save("Order Details.pdf");
};


  return (
    <>
        
        
        

        {edit ? (
        <EditOrderAddForm onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (



        <div className="ud_order_form1">
       <div className="ud_order_title"> Order Details</div>

        <div className="ud_order_form5">

          
          <TableContainer
            component={Paper}
            style={{ maxHeight: 450,
              minHeight: 200,
              maxWidth: 850,
               backgroundColor: "#1B1B1B", borderRadius: "15px" }}
          >
             <br></br>

          {/* //search.......................... */}
           <div class="search_order_container">
              <form action="">
                <input
                  className="search_order_name"
                  type="text"
                  // style={{}}
                  placeholder="Search By Supplier Name"
                  name="search"
                   onChange={(e) =>
                    setFilterText(e.target.value.toLocaleLowerCase())
                  }
                />

                {/* <button className="search_order_Button" type="submit" value="search">
                  <SearchIcon />
                </button> */}

              </form>{" "}
            </div>

            


            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Supplier_NAME</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Company_Name</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Product_Name</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Quantity</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Total_Price</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Description</div>
                  </TableCell>

                  {/* <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Action</div>
                  </TableCell>
                  <TableCell align="center" className="ud_order_cellColor">
                    <div className="ud_order_headcolor">Action</div>
                  </TableCell> */}

                </TableRow>
              </TableHead>

              <TableBody>
                {order.map((row, index) => (
                  <TableRow key={index}>

                    <TableCell
                      align="center"component="th"scope="row" className="ud_order_cellColor">
                      {row.supplierName}
                    </TableCell>

                    <TableCell align="center" className="ud_order_cellColor">
                      {row.companyName}
                    </TableCell>

                    <TableCell align="center" className="ud_order_cellColor">
                      {row.productName}
                    </TableCell>
                    <TableCell align="center" className="ud_order_cellColor">
                      {row.quantity}
                    </TableCell>
                    <TableCell align="center" className="ud_order_cellColor">
                      {row.totalPrice}
                    </TableCell>
                    <TableCell align="center" className="ud_order_cellColor">
                      {row.description}
                    </TableCell>

                    {/* <TableCell
                      itemType="button"
                      align="center"
                      className="ud_order_Edit_Icon3"
                    >
                      <button
                        className="ud_order_Edit_Icon4"
                        value={row._id}
                        onClick={deleteData}
                      >
                        Delete
                      </button>
                    </TableCell>

                    <TableCell
                      itemType="button"
                      align="center"
                      className="ud_order_delete_Icon1"
                    >
                      <button
                        className="ud_order_delete_Icon2"
                        value={row._id}
                        onClick={(e) => editData(e, row)}
                      >
                        Edit
                      </button>
                    </TableCell> */}


                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        

        {/* <div
          onClick={() => props.onClick("orderaddform")}
          className="ud_add_Order_Button">
          Add New Order
        </div> */}

        <div
          onClick={() => props.onClick("supplier")}
          className="ud_order_Back_Button"
        >
          PREVIOUS
        </div>

        <button className="ud_order_Pdf_Button" onClick={downloadPdf}>
            Downloard PDF
          </button>

      </div>
      
      </div>
      )}
    </>
    
  );
};

export default OrderReport 