import React, { useState, useEffect } from "react";
import "./Feedback.css";
import Dropdown from "react-dropdown";
import backGroundPhoto from "../../../assets/feedback_right.png";
import axios from "axios";
import swal from "sweetalert";

const FeedbackForm = (props) => {

  //variables (React hooks)
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
   const [options, setOptions] = useState([]);

  const [defaultOption, setDefaultOption] = useState("Please Choose an Item");

    //getting cart items and saving those to options varibale
   useEffect(() => {
     console.log(props.Id);
     axios
       .get(`http://localhost:5000/addcart`) //retrieving data from the database
       .then((res) => {
         var cartitems = res.data.data
           .filter(
             (cart) => cart.cusid.toLocaleLowerCase().includes(props.cusId) //id own data filter
           )
           .map((option) => option.itemName);
         setOptions(cartitems);
       });
   });

    //adding feedback to the database
  const addFeedback = () => {
    const feedback = {
      itemName: defaultOption === "Please Choose an Item" ? "" : defaultOption,
      rating: rating,
      description: description,
      custId: props.cusId,
    };
    axios
      .post("http://localhost:5000/feedback", feedback)
      .then((res) => {
        if (res.data.message === "success") {
          swal("Success", "Feedback created successfully", "success");
          setDescription("");
          setRating("");
          setDefaultOption("Please Choose an Item");
        } else {
          swal("Sorry", "Feedback creation failed", "error");
        }
      })
      .catch((error) => {
        swal("Sorry", error.response.data.msg, "error"); //validation showing code which is coming from backend
      });
  };
  return (
    <div className="feedbackcustomer">
      <img src={backGroundPhoto} alt="test" className="feedbackImage" />
      <div className="feedbackForm">
        <div className="customerId">
          <span>Customer ID</span>
          <input
            value={props.cusId}
            disabled="true"
            type="text"
            className="id"
            placeholder="Customer ID"
          />
        </div>

        <p className="p-text">How Satisfied were you with our service?</p>
        <ul className="rates">
          <div className="icon" onClick={() => setRating("excellent")}>
            <span className="circle">
              {rating === "excellent" ? <div className="selected"></div> : ""}
            </span>
            <li className="rate">Excellent</li>
          </div>
          <div className="icon" onClick={() => setRating("good")}>
            <span className="circle">
              {rating === "good" ? <div className="selected"></div> : ""}
            </span>
            <li className="rate">Good</li>
          </div>
          <div className="icon" onClick={() => setRating("neutral")}>
            <span className="circle">
              {rating === "neutral" ? <div className="selected"></div> : ""}
            </span>
            <li className="rate">Neutral</li>
          </div>
          <div className="icon" onClick={() => setRating("poor")}>
            <span className="circle">
              {rating === "poor" ? <div className="selected"></div> : ""}
            </span>
            <li className="rate">Poor</li>
          </div>
        </ul>
        <p className="ptext2">
          If you have satisfied feedback, please write to us..{" "}
        </p>
        <div className="dropdown"></div>
        <Dropdown
          options={options}
          value={defaultOption}
          placeholder="Select an option"
          className="dropDown"
          placeholderClassName="myPlaceholderClassName"
          arrowClassName="myArrowClassName"
          arrowClosed={<span className="arrow-closed" />}
          arrowOpen={<span className="arrow-open" />}
          menuClassName="myMenuClassName"          
          onFocus="onFocus"
          onChange={(index) => setDefaultOption(index.value)}
        />
        <textarea
          type="text"
          value={description}
          className="description"
          placeholder="Give your feedback"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttongroup">
          <button
            className="viewFeedback"
            onClick={() => props.onClick(props.cusId)}
          >
            View Feedback
          </button>
          <button className="submitFeedback" onClick={addFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
