import React, { useState } from "react";
import "./Dashboard.css";
import { Redirect, useHistory } from "react-router-dom";
import Feedback from "../Pamudhi/Feedback";
import Production from "../Yapa/Production";
import Supplier from "../Udara/Supplier";
import Account from "../Isuru/Account";
import Administration from "../Malsha/Administration";
import Facility from "../Amani/Facility";
import HumanResource from "../Dileesha/HumanResource";
import Shopping from "../Hasintha/Shopping";

const Dashboard = ({ authorized }) => {
  const [component, setComponent] = useState("production");
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("user-info-admin");
    history.push("/");
  };

  if (!localStorage.getItem("user-info-admin")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboardMain">
      <div className="leftLinks">
        <div className="photogroup">
          <div className="photo"></div>
          <h1 className="profileName">admin</h1>
        </div>
        <div className="dashLinks">
          <ul className="links">
            <li
              onClick={() => {
                setComponent("production");
              }}
              className="link"
              id={component === "production" ? "active" : ""}
            >
              Production Management
            </li>
            <li
              onClick={() => {
                setComponent("shopping");
              }}
              className="link"
              id={component === "shopping" ? "active" : ""}
            >
              Shopping Management
            </li>
            <li
              onClick={() => {
                setComponent("supplier");
              }}
              className="link"
              id={component === "supplier" ? "active" : ""}
            >
              Supplier Management
            </li>
            <li
              onClick={() => {
                setComponent("account");
              }}
              className="link"
              id={component === "account" ? "active" : ""}
            >
              Account & Finance Management
            </li>
            <li
              onClick={() => {
                setComponent("administration");
              }}
              className="link"
              id={component === "administration" ? "active" : ""}
            >
              Administration Management
            </li>
            <li
              onClick={() => {
                setComponent("facility");
              }}
              className="link"
              id={component === "facility" ? "active" : ""}
            >
              Facility Management
            </li>
            <li
              onClick={() => {
                setComponent("hr");
              }}
              className="link"
              id={component === "hr" ? "active" : ""}
            >
              Human Resource Management
            </li>
            <li
              onClick={() => {
                setComponent("feedback");
              }}
              className="link"
              id={component === "feedback" ? "active" : ""}
            >
              Feedback Management
            </li>
          </ul>
        </div>
        <div className="lgoutbtn" onClick={logout}>
          LOGOUT
        </div>
      </div>
      <div className="hero">
        {component === "production" && <Production />}
        {component === "shopping" && <Shopping />}
        {component === "supplier" && <Supplier />}
        {component === "account" && <Account />}
        {component === "administration" && <Administration />}
        {component === "facility" && <Facility />}
        {component === "hr" && <HumanResource />}
        {component === "feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default Dashboard;
