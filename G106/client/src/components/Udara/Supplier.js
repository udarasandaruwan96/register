import React, { useState } from "react";
import "./Supplier.css";
import ManageSupplier from "./ManageSupplier";
import ManageOrder from "./ManageOrder";
import ManageNotice from "./ManageNotice";
import SupplierAddForm from "./SupplierAddForm";
import OrderAddForm from "./OrderAddForm";
import ReportGenarate from"./ReportGenarate";
import SupplierReport from"./SupplierReport";
import OrderReport from"./OrderReport";

const Supplier = () => {
  const [component, setComponent] = useState("supplier");

  return (
    <div>
      {component === "supplier" && <SupplierMain onClick={setComponent} />}

      {component === "managesupplier" && (<ManageSupplier onClick={setComponent} />)}
      {component === "manageorder" && <ManageOrder onClick={setComponent} />}
      {component === "managenotice" && <ManageNotice onClick={setComponent} />}
      {component === "supplieraddform" && (<SupplierAddForm onClick={setComponent} />)}
      { component === "orderaddform" && (<OrderAddForm onClick ={setComponent} />)}
      { component === "reportGenarate" && (<ReportGenarate onClick ={setComponent} />)}
      { component === "supplierReport" && (<SupplierReport onClick ={setComponent} />)}
      { component === "orderReport" && (<OrderReport onClick ={setComponent} />)}
    </div>
  );
};

const SupplierMain = (props) => {

 




  return (
    <div className="row">
      <div className="suppliermain">
        <div className="supplierbutton">
          <div
            className="addSupplier"
            onClick={() => props.onClick("managesupplier")}
          ></div>
          <h5>Add Supplier Deatials</h5>
        </div>

        <div className="addorderbutton">
          <div
            className="addOrder"
            onClick={() => props.onClick("manageorder")}
          ></div>
          <h5>Add Order Deatials</h5>
        </div>

        <div className="ViewNoticebutton">
          <div
            className="viewManagerNotice"
            onClick={() => props.onClick("managenotice")}
          ></div>
          <h5>View Manager Order Notice</h5>
        </div>

        <div className="supplierreportbutton">
          <div className="supplierreport" onClick={() => props.onClick("reportGenarate")}></div>
          <h5>Generate Report</h5>
        </div>

      </div>
    </div>
  );
};

export default Supplier;
