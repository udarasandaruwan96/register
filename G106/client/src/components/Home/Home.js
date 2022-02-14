import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";

const Home = () => {
  if (localStorage.getItem("user-info-admin")) {
    return <Redirect to="/dashboard" />;
  }
  if (localStorage.getItem("user-info-customer")) {
    return <Redirect to="/customer" />;
  }
  return (
    <>
      <Navbar />
      <div className="Home"></div>
      <Footer />
    </>
  );
};

export default Home;
