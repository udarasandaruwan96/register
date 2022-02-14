import React, { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./ProductDetails.css";
import { CartContext } from "../../../Context/CartContext";
import bkBtn from "../../../assets/backbtn.png";

const ProductDetails = ({ formData, cusid, onClick }) => {
  const [imgUrl, readAsDataURLe] = useState(formData.imgUrl);
  const [itemName, setItemName] = useState(formData.itemName);
  const [price, setPrice] = useState(formData.price);
  const [discount] = useState(formData.discount);
  const [size, setSize] = useState("");
  const [colour, setColour] = useState(formData.colour);
  const [category, setCategory] = useState(formData.category);
  const [description, setDescription] = useState(formData.description);
  const [number, SetNumber] = useState(0);
  const [total, setTotal] = useState(price);

  const { count, setCount } = useContext(CartContext);

  const add = () => {
    const num = number + 1;
    SetNumber(num);
    setTotal(price * num);
  };
  const minus = () => {
    const num = number - 1;
    SetNumber(num);
    setTotal(price * num);
  };

  const submitadditem = () => {
    const productdetails = {
      itemName: itemName,
      cusid: cusid,
      price: price,
      size: size,
      colour: colour,
      category: category,
      description: description,
      number: number,
      total: total,
    };

    axios
      .post("http://localhost:5000/addcart", productdetails)
      .then((res) => {
        if (res.data.message === "success") {
          swal("Success", "Item added successfuly", "success");
          setItemName("");
          setPrice("");
          setSize("");
          setColour("");
          setCategory("");
          SetNumber("");
          setTotal("");
          setDescription("excellent");
          setCount(count + 1);
          return onClick();
        } else {
          console.log(res.data);
          swal("Sorry", "Item add failed", "error");
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Sorry", "Item add failed", "error");
      });
  };

  return (
    <div>
      <div type="text" value={formData.Id} disabled="true" />
      <div className="main001">
        <div className="leftMainoutline">
          <div className="leftMain">
            <img className="item-image" src={imgUrl} />
          </div>
        </div>

        <div className="ordoderform2">
          <label className="ordname1"> NAME</label>
          <br></br>
          <input
            className="ordbox1"
            value={itemName}
            onChange={(e) => setItemName(e.itemName)}
            type="text"
            readOnly
          />
          <br></br>

          <div className="group-info1">
            <div className="group1">
              <label className="ordname2">PRICE</label>
              <br></br>
              <input
                className="ordbox2"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.price)}
                readOnly
              />
            </div>
            <div className="group2">
              <label className="ordname3">DISCOUNT</label>
              <br></br>
              <input
                className="ordbox3"
                readOnly
                type="text"
                value={discount}
              />
            </div>
          </div>

          <div className="group-info2">
            <div className="nextgroup1">
              <label className="ordname4">SIZE</label>
              <br></br>
              <ul className="size-cart">
                <button className="size-btn" onClick={() => setSize("S")}>
                  S
                  <span>
                    {size === "S" ? <div className="mark"></div> : ""}
                  </span>
                </button>
                <button className="size-btn" onClick={() => setSize("M")}>
                  M
                  <span>
                    {size === "M" ? <div className="mark"></div> : ""}
                  </span>
                </button>
                <button className="size-btn" onClick={() => setSize("L")}>
                  L
                  <span>
                    {size === "L" ? <div className="mark"></div> : ""}
                  </span>
                </button>
                <button className="size-btn" onClick={() => setSize("XL")}>
                  XL
                  <span>
                    {size === "XL" ? <div className="mark"></div> : ""}
                  </span>
                </button>
                <button className="size-btn" onClick={() => setSize("2XL")}>
                  2XL
                  <span>
                    {size === "2XL" ? <div className="mark"></div> : ""}
                  </span>
                </button>
              </ul>
            </div>

            <div className="nextgroup2">
              <label className="ordname6">QUANTITY</label>

              <div className="qtyordbox5">
                <button className="plsbtn " onClick={add}>
                  +
                </button>
                <h3 className="form-control ">{number}</h3>
                <button className="minbtn " onClick={minus}>
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="group-info3">
            <div className="lastgroup1">
              <label className="ordname8" readOnly>
                COLOUR
              </label>
              <br></br>
              <input
                value={colour}
                // value={props.cusName}
                onChange={(e) => setColour(e.colour)}
                className="ordbox8"
                type="text"
                readOnly
              />
            </div>
            <br></br>

            <div className="lastgroup2">
              <label className="ordname9">CATEGORIES</label>
              <br></br>
              <input
                className="ordbox9"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.category)}
                readOnly
              />
            </div>
          </div>

          <label className="ordname10">
            TOTAL PRICE -<br></br>
            <input
              className="ordbox10"
              type="text"
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
              }}
              readOnly
            />
          </label>

          <br></br>
          <label className="ordname7"> DESCRIPTION</label>
          <br></br>
          <textarea
            className="ordbox7"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.description)}
            readOnly
          />
          <br></br>

          <br></br>
          <button className="add-cart-btn" onClick={submitadditem}>
            Add To Cart
          </button>


          <button class="btnback-cart">
          <span><img  onClick={onClick} src={bkBtn} alt=""  className="add-cart-cancel" /> </span> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
