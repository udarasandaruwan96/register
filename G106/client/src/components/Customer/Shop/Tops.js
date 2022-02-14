import { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import ProductDetails from "./ProductDetails";

const Tops = (props) => {
  const [shoppings, setShoppings] = useState(["DRESS"]);
  const [view, setView] = useState(false);
  const [Id, setId] = useState("");
  const [data, setData] = useState({});

  const viewData = (e, data) => {
    console.log();
    setId(e.target.value);
    setData(data);
    setView(true);
  };
  useEffect((e) => {
    axios
      .get(`http://localhost:5000/shopping`) //retrieving data from the database
      .then((res) => {
        setShoppings(res.data.data);
      });
  });

  return (
    <>
      {view ? (
        <ProductDetails
          cusid={props.cusid}
          onClick={() => setView(false)}
          id={Id}
          formData={data}
        />
      ) : (
        <div className="products">
        {shoppings.map((shopping) => (
          <div className="card">
            <div>
              <img
                className="product-image"
                src={shopping.imgUrl}
                alt={shopping.name}
              />
            </div>
            <div className="cart-box-dtl">
              <div className="cart-name-box11">
                <h3 className="product-name01">{shopping.itemName}</h3>
              </div>
              {/* <div> */}
              <h3 className="product-price">${shopping.price}</h3>  </div>
            {/* </div> */}
            <div>
              <button
                className="product-add-button"
                value={shopping._id}
                onClick={(e) => viewData(e, shopping)}
              >
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default Tops;
