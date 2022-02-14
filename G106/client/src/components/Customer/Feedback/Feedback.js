import React, { useState } from "react";
import CustomerFeedback from "./CustomerFeedback";
import "./Feedback.css";
import FeedbackForm from "./FeedbackForm";

const Feedback = (props) => {
  const [component, setComponent] = useState("form");

  const cusTable = (id) => {
    setComponent("table");
  };

  return (
    <>
      {component === "form" && (
        <FeedbackForm onClick={cusTable} cusId={props.cus._id} />
      )}
      {component === "table" && (
        <CustomerFeedback
          onClick={() => setComponent("form")}
          cusId={props.cus._id}
        />
      )}
    </>
  );
};

export default Feedback;
