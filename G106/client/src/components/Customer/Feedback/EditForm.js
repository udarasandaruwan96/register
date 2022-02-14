import React, { useState } from "react";
import "./Feedback.css";
import backGroundPhoto from "../../../assets/feedback_right.png";
import axios from "axios";
import swal from "sweetalert";

const EditForm = ({ onClick, fid, formData }) => {
  const [rating, setRating] = useState(formData.rating);
  const [description, setDescription] = useState(formData.description);

  const editFeedback = () => {
    const feedback = {
      rating: rating,
      description: description,
    };
    axios
      .post(`http://localhost:5000/feedback/${fid}`, feedback)
      .then((res) => {
        if (res.data.message === "success") {
          swal("Success", "Feedback edited", "success");
          setDescription("");
          setRating("excellent");
          return onClick();
        } else {
          swal("Sorry", "Feedback edit failed", "error");
        }
      })
      .catch((error) => {
        swal("Sorry", "Feedback edit failed", "error");
      });
  };

  return (
    <div className="feedbackcustomer">
      <img src={backGroundPhoto} alt="test" className="feedbackImage" />
      <div className="feedbackForm">
        <div className="customerId">
          <span>Customer ID</span>
          <input
            type="text"
            className="id"
            placeholder="Customer ID"
            value={formData.custId}
            disabled="true"
          />
        </div>

        <>
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
            If you have satisfied feedback, please write to us..
          </p>
          <textarea
            type="text"
            className="description"
            placeholder="Give your feedback"
            style={{ marginTop: "2%" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="buttongroup">
            <button className="submitFeedback" onClick={onClick}>
              Cancel
            </button>
            <button
              className="viewFeedback"
              style={{ marginLeft: "5%" }}
              onClick={editFeedback}
            >
              Edit Feedback
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default EditForm;
