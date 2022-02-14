import React, { useState } from "react";
import "./Facility.css";
import swal from "sweetalert";
import ViewDetails from "./ViewDetails";
import TransportDetails from "./TransportDetails";
import CateringDetails from "./CateringDetails";
import AddTransportFacilityDetails from "./AddTransportFacilityDetails";
import AddCateringFacilityDetails from "./AddCateringFacilityDetails";
const Facility = () => {
  const [component, setComponent] = useState("facility");

  return (
    <div>
      {component === "facility" && <FacilityMain onClick={setComponent} />}
      {component === "viewdetails" && <ViewDetails onClick={setComponent} />}
      {component === "transportdetails" && (
        <TransportDetails onClick={setComponent} />
      )}
      {component === "cateringdetails" && (
        <CateringDetails onClick={setComponent} />
      )}
      {component === "addtransportfacilitydetails" && (
        <AddTransportFacilityDetails onClick={setComponent} />
      )}
      {component === "addcateringfacilitydetails" && (
        <AddCateringFacilityDetails onClick={setComponent} />
      )}
    </div>
  );
};

const FacilityMain = (props) => {
  const generateReport = () => {
    swal("Sorry", "Function is under construction", "error");
  };
  return (
    <div className="row">
      <div className="facilitymain">
        <div className="facilitybuttongroup1">
          <div
            className="viewdetailsfacility"
            onClick={() => props.onClick("viewdetails")}
          ></div>
          <h2>VIEW DETAILS</h2>
        </div>
        <div className="facilitybuttongroup2">
          <div
            className="transportdetails"
            onClick={() => props.onClick("transportdetails")}
          ></div>
          <h2>TRANSPORT</h2>
        </div>
        <div className="facilitybuttongroup3">
          <div
            className="cateringdetails"
            onClick={() => props.onClick("cateringdetails")}
          ></div>
          <h2>CATERING</h2>
        </div>
        <div className="facilitybuttongroup4">
          <div
            className="facilityreportgroup1"
            onClick={() => generateReport()}
          ></div>
          <h2>GENERATE REPORT</h2>
        </div>
      </div>
    </div>
  );
};

export default Facility;
