import { CardActionArea } from "@material-ui/core";

import React, { useState } from "react";

import Cart from "./Cart";
import ProductDetails from "./ProductDetails";

const Details = (props) => {
  const [component, setComponent] = useState("form");

  const cusTable = (id) => {
    setComponent("table");
  };

  return (
    <>
      {component === "form" && (
        <ProductDetails
          onClick={cusTable}
          cusId={props.cus._id}
          cusName={props.cus.firstName}
          cusEmail={props.cus.email}
          cusAddress={props.cus.address}
          cusCity={props.cus.city}
          cusDis={props.cus.district}
        />
      )}
    </>
  );
};

export default Details;
