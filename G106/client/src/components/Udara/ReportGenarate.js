import React, { useState } from "react";
import "./Supplier.css";


const Supplier = (props) => {
return (
    <div className="row">
      <div className="suppliermain">
        <div className="supplierbutton">
          <div
            className="supplierreport"
            onClick={() => props.onClick("supplierReport")}
          ></div>
          <h5>Genarate Supplier Report</h5>
        </div>


        <div className="ViewNoticebutton">
          <div
            className="supplierreport"
            onClick={() => props.onClick("orderReport")}
          ></div>
          <h5>Genarate Order Report</h5>
        </div>

        <div
          onClick={() => props.onClick("supplier")}className="ud_Gr_back_button ">
          Previous
        </div>

        </div>
    </div>
  );
};

export default Supplier;