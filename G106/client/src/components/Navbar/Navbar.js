import React from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">    
      <div className="logowrapper">
        <div className="imgwrapper">
          <img src={Logo} alt="" className="logo"></img>
        </div>
        <h3 className="logoname">ROMAKA</h3>
      </div>

      <div className="navlink">
        <div className="links">
          <li>
            <Link to="/" className="link active">HOME</Link>
          </li>
          <li>
            <Link to="/about" className="link">ABOUT</Link>
          </li>
          <li>
            <Link to="/contact" className="link">CONTACT</Link>
          </li>
        </div>
      </div>

      <div className="btnwrapper">
        <Link to="login">
          <button className="btn">LOG IN</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
