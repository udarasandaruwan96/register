import React, { useEffect, useState }  from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import axios from "axios";
import "./ManageSupplier.css";
import EditSupplierAddForm from "./EditSupplierAddForm";
//--------------pdf-------------------------------------
import jsPDF from "jspdf";
import "jspdf-autotable";
import imageUrl from "../../assets/romaka2.jpg";

const SupplierReport = (props) => {
  
  const [suppliers, setSuppliers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});

//-----------------pdf----------
const columns = [
  { title: "Country", field: "country"},
  { title: "SupplierName", field: "supplierName" },
  { title: "CompanyName", field: "companyName" },
  { title: "PhoneNumber", field: "phoneNumber" },
  { title: "Email", field: "email" },
  { title: "Description", field: "description" },
];

 //search..........................
 const [filterText, setFilterText] = useState("");

  // const deleteData = (e) => {
  //   try {
  //     axios
  //       .delete(`http://localhost:5000/supplier/${e.target.value}`)
  //       .then((res) => {
  //         swal("Success", "Item Deleted Successfully", "success");
  //       });
  //   } catch (error) {
  //     swal("Error", "Deletion Failed", "error");
  //   }

  //   console.log(e.target.value);
  // };
 

  // const editData = (e, data) => {
    
  //   setId(e.target.value);
  //   setData(data);
  //   setEdit(true);
  // };



  useEffect(() => {
    axios.get("http://localhost:5000/supplier/${props.ID}").then((res) => {
      setSuppliers(res.data.data);
    });

  });

  //search..........................
  const filteredItems = suppliers.filter((supp) =>
  supp.supplierName.toLocaleLowerCase().includes(filterText)
  );
  const supplierss = filterText ? filteredItems : suppliers;



//------------------Download PDF ---------

const downloadPdf = () => {
  const doc = new jsPDF();
  doc.setFont("Helvertica", "bold");
  doc.text("Supplier Details", 90, 10);
  doc.addImage(imageUrl, "PNG", 20, 20, 50, 50);
  // doc.text("Date", 200, 20);
  doc.autoTable({
    margin: { top: 80 },
    theme: "grid",
    columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    body: suppliers,
  });

  doc.save("Supplier Details.pdf");
};


  return (
    <>

{edit ? (
        <EditSupplierAddForm onClick={() => setEdit(false)} id={Id} formData={data} />
      ) : (


      <div className="ud_Msupplier_Form1">
        <div className="ud_Msupplier_title">Supplier Details</div>
       
        <div className="ud_Msupplier_Form2">

          <TableContainer
            component={Paper}
            style={{ maxHeight: 450,
              minHeight: 200,
              maxWidth: 850,
             backgroundColor: "#1B1B1B", borderRadius: "15px" }}
          >
            <br></br>

            {/* //search.......................... */}
            <div class="ud_Msupplier_Search">
              <form action="">
                <input
                  className="ud_Msupplier_Search_name "
                  type="text"
                  placeholder="Search By Supplier Name"
                  name="search"
                  onChange={(e) =>
                    setFilterText(e.target.value.toLocaleLowerCase())
                  }
                />

                {/* <button className="ud_Msupplier_search_Button" type="submit" value="search">
                  <SearchIcon />
                </button> */}
              </form>{" "}
            </div>




            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Country</div>
                  </TableCell>
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Supplier_Name</div>
                  </TableCell>
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Company_Name</div>
                  </TableCell>
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Phone_Number</div>
                  </TableCell>
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Email</div>
                  </TableCell>

                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Description</div>
                  </TableCell>

                  {/* <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Action</div>
                  </TableCell>
                  
                  <TableCell align="center" className="ud_Msupplier_cellColor">
                    <div className="ud_Msupplier_headcolor">Action</div>
                  </TableCell> */}

                </TableRow>
              </TableHead>


              <TableBody>
                {supplierss.map((row, index) => (
              <TableRow key={index}>

                    <TableCell
                      align="center" component="th" scope="row" className="ud_Msupplier_cellColor">
                      {row.country}
                    </TableCell>

                    <TableCell align="center" className="ud_Msupplier_cellColor">
                      {row.supplierName}
                    </TableCell>

                    <TableCell align="center" className="ud_Msupplier_cellColor">
                      {row.companyName}

                    </TableCell>
                    <TableCell align="center" className="ud_Msupplier_cellColor">
                      {row.phoneNumber}

                    </TableCell>
                    <TableCell align="center" className="ud_Msupplier_cellColor">
                      {row.email}
                      
                    </TableCell>
                    <TableCell align="center" className="ud_Msupplier_cellColor">
                      {row.description}
                    </TableCell>

                    {/* <TableCell
                      itemType="button"
                      align="center"
                      className="ud_Msupplier_Edit_Icon5"
                    >
                      <button
                        className="ud_Msupplier_Edit_Icon6"
                        value={row._id}
                        onClick={deleteData}
                      >
                        Delete
                      </button>
                    </TableCell>


                    <TableCell
                      itemType="button"
                      align="center"
                      className="ud_Msupplier_deleteIcon7"
                    >
                      <button
                        className="ud_Msupplier_deleteIcon8"
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
          onClick={() => props.onClick("supplieraddform")}className="ud_Msupplier_addbutton">
          Add New Supplier
        </div> */}

        <div
          onClick={() => props.onClick("supplier")}className="ud_Msupplier_back_button">
          Previous
        </div>
        
        <button className="ud_Msupplier_Pdf_Button" onClick={downloadPdf}>
            Downloard PDF
          </button>
        
        </div>
      </div>
      )}
    </>
  );
};

export default SupplierReport;