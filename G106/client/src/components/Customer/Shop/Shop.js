import { useEffect, useState } from "react";
import "./Shop.css";
import Dresses from "./Dresses";
import Tops from "./Tops";
import Shorts from "./Shorts";
import Shirts from "./Shirts";
import Denims from "./Denims";
import imgUrl from "../../../assets/shopback.jpg";
import ProductDetails from "./ProductDetails";

const Shop = (props) => {
  const [component, setComponent] = useState("dresses");

  return (
    <>
      <div className="shopmain">
        <div className="leftcategory">
          <div className="categoryLinks">
            <ul className="cLinks">
              <li
                className="cLink"
                onClick={() => {
                  setComponent("dresses");
                }}
              >
                DRESS
              </li>
              <li
                className="cLink"
                onClick={() => {
                  setComponent("tops");
                }}
              >
                TOPS
              </li>
              <li
                className="cLink"
                onClick={() => {
                  setComponent("shorts");
                }}
              >
                SHORTS
              </li>
              <li
                className="cLink"
                onClick={() => {
                  setComponent("shirts");
                }}
              >
                T-SHIRTS
              </li>
              <li
                className="cLink"
                onClick={() => {
                  setComponent("denims");
                }}
              >
                DENIMS
              </li>
            </ul>
          </div>
        </div>
        <div className="right-category">
          {component === "dresses" && <Dresses cusid={props.cus._id} />}
          {component === "tops" && <Tops cusid={props.cus._id} />}
          {component === "shorts" && <Shorts cusid={props.cus._id} />}
          {component === "shirts" && <Shirts cusid={props.cus._id} />}
          {component === "denims" && <Denims cusid={props.cus._id} />}
          {component === "productdetails" && ( <ProductDetails onClick={setComponent} />
          )}
        </div>
      </div>
    </>
  );
};
export default Shop;
