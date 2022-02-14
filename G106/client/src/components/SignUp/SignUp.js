import React, { useState } from "react";
import "./SignUp.css";
import SignupImg from "../../assets/signup_right.png";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import swal from "sweetalert";

const Signup = () => {
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    var userData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      district: district,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/auth/register", userData)
      .then((res) => {
        if (res.data.message === "success") {
          // var currentUser = res.data.data;

          // localStorage.setItem("user-info-customer", currentUser);
          history.push("/login");
        } else {
          swal("Sorry", "Registration Failed", "error");
        }
      })
      .catch((error) => {
        swal("Sorry", error.response.data.error, "error");
      });
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="signup">
          <div className="leftSignup"></div>
          <div className="rightSignup">
            <img src={SignupImg} alt="" className="signupTitle" />
            <div className="signupform">
              <div className="inputgroup">
                <div className="inputgroupfirstname">
                  <h3 className="email">First Name</h3>
                  <input
                    type="text"
                    className="firstnameInput"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="inputgroupsecond">
                  <h3 className="email">Last Name</h3>
                  <input
                    type="text"
                    className="lastnameInput"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <h3 className="address">Address</h3>
              <input
                type="text"
                className="addressInput"
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="inputgroup">
                <div className="inputgroupfirstname">
                  <h3 className="city">City</h3>
                  <input
                    type="text"
                    className="cityInput"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="inputgroupsecond">
                  <h3 className="district">District</h3>
                  <input
                    type="text"
                    className="districtInput"
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              </div>
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
              <h3 className="signuplink">
                Already have an account?
                <Link to="/login" className="link">
                  <span>LOGIN</span>
                </Link>
              </h3>
            </div>
            <div className="btngroup">
              <button className="btn" onClick={signUp}>
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
