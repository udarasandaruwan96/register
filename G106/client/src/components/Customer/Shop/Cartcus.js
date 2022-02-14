import { CardActionArea } from "@material-ui/core";

import React, { useState } from "react";

import Cart from "./Cart";

const Cartcus = (props) => {
  const [component, setComponent] = useState("form");

  const cusTable = (id) => {
    setComponent("table");
  };

  return (
    <>
      {component === "form" && (
        <Cart
          onClick={cusTable}
          cusId={props.cus._id}
          cusEmail={props.cus.email}
        />
      )}
    </>
  );
};

export default Cartcus;
