import React, { useState,useEffect } from "react";
import "./Feedback.css";
import ManageFeedback from "./ManageFeedback";
// import swal from "sweetalert";
import axios from "axios";
import { saveAs } from "file-saver";
import swal from "sweetalert";
import jsPDF from 'jspdf';
import logo from "../../assets/feedback.png";
import home from "../../assets/Home.png";

const Feedback = () => {
  const [component, setComponent] = useState("feedback");
  

  return (
    <div>
      {component === "feedback" && <FeedbackMain onClick={setComponent} />}
      {component === "manageFeedback" && (
        <ManageFeedback onClick={setComponent} />
      )}
    </div>
  );
};

const FeedbackMain = (props) => {

  const [count, setCount] = useState([]);
  var myCurrentDate = new Date();

  useEffect(() => {
    axios
      .get("http://localhost:5000/feedback") //retrieving data from the database
      .then((res) => {
        setCount(res.data.data);
      });
  });

  //generate report code
  var date =
    myCurrentDate.getFullYear() +
    "-" +
    (myCurrentDate.getMonth() + 1) +
    "-" +
    myCurrentDate.getDate() +
    " " +
    myCurrentDate.getHours() +
    ":" +
    myCurrentDate.getMinutes() +
    ":" +
    myCurrentDate.getSeconds();
 

  const createAndDownloadPdf = () => {
    var number = 80;
    var doc = new jsPDF('landscape','px','a4','false');
    doc.addImage(logo,'png',65,20,400,400);
    doc.addPage();
    doc.text(60,60,'COMPANY:');
    doc.text(60,80,'EMAIL:');
    doc.text(60,100,'MOB.NO:');
    doc.text(60,120,'REPORT:');
    doc.text(135, 60, "Romaka Garment Factory");
    doc.text(115, 80, "romaka@gmail.com");
    doc.text(120, 100, "0774571278");
    doc.text(120, 120, "Feedback Report");
    doc.addImage(home, "png", 150, 160, 300, 200);

    doc.addPage();
    doc.text(20, 60, "ITEM NAME");
    doc.text(220, 60, "DESCRIPTION");
    doc.text(380, 60, "RATING");
    doc.text(470, 60, "DATE");
    for (const item of count){
      doc.text(20, number, item.itemName);
      doc.text(220, number, item.description);
      doc.text(380, number, item.rating);
      doc.text(470, number, item.date);
      number = number + 20;
    }   
    

    doc.save(`Feedback-${date}.pdf`);
  };
  
  return (
    <div className="row">
      <div className="feedbackmain">
        <div className="buttongroup">
          <div
            className="feedbackgroup"
            onClick={() => props.onClick("manageFeedback")}
          ></div>
          <h5>Manage Feedback</h5>
        </div>
        <div className="buttongroup" onClick={() => createAndDownloadPdf()}>
          <div className="reportgroup"></div>
          <h5>Generate Report</h5>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
