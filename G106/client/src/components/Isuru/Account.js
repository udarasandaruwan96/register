import React, { useState } from "react";
import "./Account.css";
import swal from "sweetalert";
import SalaryDetails from "./SalaryDetails";
import SupplierTable from "./SupplierTable";
import SalaryForm2 from "./SalaryForm2";
import EditSalary from "./EditSalary";
import SupplierDetails from "./SupplierDeatails";
import GetSupplierDetails from "./GetSupplierDetails";
import GetSalaryDetails from "./GetSalaryDetails";
import DailySales from "./DailySales";

const Account = () => {
  const [component, setComponent] = useState("account");

  return (
    <div>
      {component === "account" && <AccountMain onClick={setComponent} />}
      {component === "salarydetails" && (
        <SalaryDetails onClick={setComponent} />
      )}
      {component === "supplierdetails" && (
        <SupplierDetails onClick={setComponent} />
      )}
      {component === "getSupplierDetails" && (
        <GetSupplierDetails onClick={setComponent} />
      )}
      {/* {component === "dailysales" && <DailySales onClick={setComponent} />} */}
      {component === "suppliertable" && (
        <SupplierTable onClick={setComponent} />
      )}
      {component === "editsalary" && <EditSalary onClick={setComponent} />}
      {component === "salaryform2" && <SalaryForm2 onClick={setComponent} />}
      {component === "getsalarydetails" && (
        <GetSalaryDetails onClick={setComponent} />
      )}
      {component === "dailysales" && <DailySales onClick={setComponent} />}
    </div>
  );
};

const AccountMain = (props) => {
  const generateReport = () => {
    swal("Sorry", "Function is under construction", "error");
  };

  return (
    <div className="row">
      <div className="accountmain">
        <div className="buttongroup1">
          <div
            className="salarygenarate"
            onClick={() => props.onClick("getsalarydetails")}
          ></div>
          <h2>Salary Genarate</h2>
        </div>
        <div className="buttongroup2">
          <div
            className="supplierpayment"
            onClick={() => props.onClick("getSupplierDetails")}
          ></div>
          <h2>Supplier Payment</h2>
        </div>
        <div className="buttongroup3">
          <div
            className="supplierpayment"
            onClick={() => props.onClick("dailysales")}
          ></div>
          <h2>Sales</h2>
        </div>
        <div className="buttongroup4">
          <div className="reportgroup1" onClick={() => generateReport()}></div>
          <h2>Genarate Report</h2>
        </div>
      </div>
    </div>
  );
};

export default Account;
