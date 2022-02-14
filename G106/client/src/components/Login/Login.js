import React, { useState } from "react";
import "./Login.css";
import LoginImg from "../../assets/login_left.png";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/auth/login", user)
      .then((res) => {
        if (res.data.message === "success") {
          var currentUser = res.data.data;
          if (currentUser.type === "admin") {
            localStorage.setItem("user-info-admin", currentUser);
            history.push("/dashboard");
          } else {
            localStorage.setItem("user-info-customer", currentUser);
            history.push("/customer", { currentUser });
          }
        } else {
          swal("Sorry", "Login Failed", "error");
        }
      })
      .catch((error) => {
        swal("Sorry", "Login Failed", "error");
      });
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="login">
          <div className="left">
            <img src={LoginImg} alt="" className="loginTitle" />
            <div className="form">
              <h3 className="email">Email</h3>
              <input
                type="text"
                className="emailInput"
                onChange={(e) => setEmail(e.target.value)}
              />
              <h3 className="password">Password</h3>
              <input
                type="password"
                className="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btngroup">
              <button className="btn" onClick={Login}>
                Login
              </button>
              <h3 className="loginlink">
                Don't have an account?
                <Link to="/signup" className="link">
                  <span>SIGNUP</span>
                </Link>
              </h3>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
