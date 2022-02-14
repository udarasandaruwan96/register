import { useContext, useEffect, useState } from "react";
import "./Cart.css";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import axios from "axios";
import { CartContext } from "../../../Context/CartContext";

const Cart = (props) => {
  const [addcarts, setAddCarts] = useState([]);
  const [cusname, setCusName] = useState("");
  const [cusaddress, setCusAddress] = useState("");
  const [cuscity, setCusCity] = useState("");
  const [cusdistrict, setCusDistrict] = useState("");
  const [cusemail, setCusEmail] = useState("");
  const [orderid, setOrderID] = useState("");
  const [cusmobile, setCusMobile] = useState("");
  const [carttotal, setCarttotal] = useState("");
  const { setCount } = useContext(CartContext);

  const caltotal = () => {
    var prices = 0;
    addcarts.forEach((item) => {
      prices += +item.total;
    });
    setCarttotal(prices);
  };

  const submitOrder = () => {
    const orderconfirm = {
      cusname: cusname,
      cusMobile: cusmobile,
      orderid: orderid,
      carttotal: carttotal,
    };  
    

    axios
      .post("http://localhost:5000/cart", orderconfirm)
      .then((res) => {
        if (res.data.message === "success") { 
          swal("Success", "Item add Success", "success");
          setCusName("");
          setCusAddress("");
          setCusCity("");
          setCusDistrict("");
          setCusEmail("");
          setOrderID("");
          setCarttotal("");
        } else {
          swal("Sorry", "Item add failed", "error");
        }
      })
      .catch((error) => {
        try {
          swal("Error", error.response.data.error, "error");
        } catch (error) {
          swal("Error", "fields are empty", "error");
        }
      });
  };

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

  useEffect(() => {
    console.log(props.Id);
    axios
      .get(`http://localhost:5000/addcart`) //retrieving data from the database
      .then((res) => {
        var cartitems = res.data.data.filter((cart) =>
          cart.cusid.toLocaleLowerCase().includes(props.cusId) //id own data filter
        );
        setAddCarts(cartitems);
        setCount(cartitems.length);
      });
  });

  return (
    <>
      <div className="mainrow2">
        <div className="leftmanagecart">
          <div className="addcarttitle">Shopping Cart</div>

          <TableContainer
            component={Paper}
            style={{
              maxHeight: 300,
              minHeight: 200,
              maxWidth: 850,
              backgroundColor: "#1B1B1B",
              borderRadius: "1px",
            }}
          >
            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">ORDER ID</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">PRODUCT</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">ORDER DETAILS</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">QUANTITY</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">PRICE</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">ORDER DATE</div>
                  </TableCell>
                  <TableCell align="center" className="cart1cellColor">
                    <div className="cartheadcolor">DELETE</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addcarts.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="cartcellColor"
                    >
                      {row._id}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      {row.itemName}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      {row.category}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      {row.number}*{row.price}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      {row.total}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      {row.date}
                    </TableCell>
                    <TableCell align="center" className="cartcellColor">
                      <button
                        className="deletecart"
                        value={row._id}
                        onClick={deleteData}
                      >
                        DELETE
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/*-----------------------Cart total price-------------------- */}
        <div>
          <div className="bottompricecart">
            <div className="carttotal1">CART TOTAL :</div>
            <input className="tprice" type="text" value={carttotal} />
          <button onClick={caltotal} className="cartdone">
            GET TOTAL
          </button>
          </div>
        </div>
        {/*-----------------------Customer details form-------------------- */}
        <div className="cust-info-details">
          <div className="cust-info-format">
            <div className="cust-info-group">
              <label>
                NAME -
                <input
                  className="name1-box1"
                  placeholder="Enter Name"
                  // value={props.cusName}
                  onChange={(e) => setCusName(e.target.value)}
                  type="text"
                />
              </label>
              <br></br>
            </div>

            <div className="cust-info-group">
              <label>
                EMAIL -
                <input
                  className="name2-box2"
                  value={props.cusEmail}
                  placeholder="Enter Receiver Email"
                  type="text"
                />
              </label>
              <br></br>
            </div>

            <div className="cust-info-group">
              <label>
                CITY -
                <input
                  className="name3-box3"
                  placeholder="Enter City"
                  // value={props.cusCity}
                  onChange={(e) => setCusCity(e.target.value)}
                  type="text"
                />
              </label>
              <br></br>
            </div>

            <div className="cust-info-group">
              <label>
                MOBILE -
                <input
                  className="name4-box4"
                  placeholder="Enter Receiver mobile number"
                  onChange={(e) => setCusMobile(e.target.value)}
                  type="text"
                />
              </label>
              <br></br>
            </div>
            <div className="cust-info-group">
              <label>
                ORDERS ID -
                <input
                  className="name4-box4"
                  onChange={(e) => setOrderID(e.target.value)}
                  type="text"
                  placeholder="Enter conform order ID"
                />
              </label>
              <br></br>
            </div>
            <div className="cust-info-group">
            <label>
            MOBILE -
            <input
              className="name4-box4"
              placeholder="Enter Receiver mobile number"
               onChange={(e) => setCusMobile(e.target.value)}
               type="text"
               />
               </label>
               <br></br>
               </div>
            <div className="cust-info-group">
              <label>
                ADDRESS -
                <textarea
                  className="name5-box5"
                  placeholder="Enter Receiver Address"
                  onChange={(e) => setCusAddress(e.target.value)}
                  type="text"
                />
              </label>
              <br></br>
            </div>
          </div>
          <br></br>
        <div className="final-Cart-submit">
        <div className="btn-discrip">
        <label className="dis-btn">Before you enter "ORDER SUBMIT" button,
          Get total and enter your details in the form.
          YOU CAN SUBMIT YOUR ORDERS THIS BUTTON.</label>
          
          <label  className="dis-btn">THANK YOU....</label>
          </div>
        <button onClick={submitOrder} className="cart-submit-btn">
          ORDER SUBMIT
        </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
