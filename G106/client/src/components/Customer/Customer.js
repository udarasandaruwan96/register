import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Footer from "../Footer/Footer";
import Feedback from "./Feedback/Feedback";
import Shop from "./Shop/Shop";
import About from "./About/About";
import Cartcus from "./Shop/Cartcus";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import "./Customer.css";
import imgUrl from "../../assets/cart.png";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

const Customer = ({ location }) => {
  let history = useHistory();
  const [component, setComponent] = useState("home");
  const [count, setCount] = useState(0);

  const Logout = () => {
    localStorage.removeItem("user-info-customer");
    history.push("/");
  };

  useEffect(() => {
    if (location.state == null) {
      localStorage.removeItem("user-info-customer");
      history.push("/");
    }
    axios
    .get(`http://localhost:5000/addcart`) //retrieving data from the database
    .then((res) => {
      var cartitems = res.data.data.filter((cart) =>
        cart.cusid.toLocaleLowerCase().includes(location.state.currentUser._id)
      );
      setCount(cartitems.length);
    });
  });

  if (!localStorage.getItem("user-info-customer")) {
    return <Redirect to="/" />;
  }

  return (
    <CartContext.Provider value={{count,setCount}}>
    <div
      classname="customer"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="navbar">
        <div className="logowrapper">
          <div className="imgwrapper">
            <img src={Logo} alt="" className="logo"></img>
          </div>
          <h3 className="logoname">
            Hello,
            {location.state != null ? location.state.currentUser.firstName : ""}
          </h3>
        </div>
        <div className="navlink">
          <div className="links">
            <li
              onClick={() => {
                setComponent("home");
              }}
              className="link"
            >
              HOME
            </li>
            <li
              onClick={() => {
                setComponent("shop");
              }}
              className="link"
            >
              SHOP
            </li>
            <li
              onClick={() => {
                setComponent("about");
              }}
              className="link"
            >
              ABOUT
            </li>
            <li
              onClick={() => {
                setComponent("contact");
              }}
              className="link"
            >
              CONTACT
            </li>
            <li
              onClick={() => {
                setComponent("feedback");
              }}
              className="link"
            >
              FEEDBACK
            </li>
          </div>
        </div>
        <div className="btnwrapper">
           <div className="cartwrapper"><div className="circle-cart">{count}</div><img
            onClick={() => {
              setComponent("cart");
            }}
            src={imgUrl}
            alt=""
            className="cart-img"
          /></div>
          
          <button onClick={Logout} className="btn">
            LOGOUT
          </button>
        </div>
      </div>
      <div className="customer">
        {component === "home" && <Home />}
        {component === "shop" && <Shop cus={location.state.currentUser} />}
        {component === "about" && <About />}
        {component === "contact" && <Contact />}
        {component === "cart" && <Cartcus cus={location.state.currentUser} />}
        {component === "feedback" && (
          <Feedback cus={location.state.currentUser} />
          
        )}
      </div>
      <Footer />
    </div>
    </CartContext.Provider>
  );
};

export default Customer;
