import React, { useState } from "react";
import "./Shopping.css";
import Notice from "./Notice";
import swal from "sweetalert";
import AddItem from "./AddItem";
import ViewItem from "./ViewItem";
import OrderDetails from "./OrderDetails";
import ConfirmOrder from "./ConfirmOrder";
// import axios from "axios";
// import { saveAs } from "file-saver";

const Shopping = () => {
  const [component, setComponent] = useState("shopping");

  return (
    <div>
      {component === "shopping" && <ShoppingMain onClick={setComponent} />}
      {component === "notice" && <Notice onClick={setComponent} />}
      {component === "additem" && <AddItem onClick={setComponent} />}
      {component === "viewitem" && <ViewItem onClick={setComponent} />}
      {component === "orderdetails" && <OrderDetails onClick={setComponent} />}
      {component === "confirmorder" && <ConfirmOrder onClick={setComponent} />}
    </div>
  );
};

const ShoppingMain = (props) => {
 

  return (
    <div className="row">
      <div className="shoppingmain">
        <div className="noticebutton">
          <div
            className="adminnotice"
            onClick={() => props.onClick("notice")}
          ></div>
          <h5>View Notice</h5>
        </div>
        <div className="itembutton">
          <div
            className="additemgroup"
            onClick={() => props.onClick("additem")}
          ></div>
          <h5>Add Item</h5>
        </div>
        <div className="additembutton">
          <div
            className="viewaddeditem"
            onClick={() => props.onClick("viewitem")}
          ></div>
          <h5>View Item</h5>
        </div>
        <div className="orderbutton">
          <div
            className="vieworderdetail"
            onClick={() => props.onClick("orderdetails")}
          ></div>
          <h5>Order Details</h5>
        </div>
       
      </div>
    </div>
  );
};

export default Shopping;
