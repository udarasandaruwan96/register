import React, { useState } from "react";
import "./AddItem.css";
import axios from "axios";
import swal from "sweetalert";
import Dropdown from "react-dropdown";

const AddItem = (props) => {
  const [imgUrl, readAsDataURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const uploadIcon = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "romaka123");

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/romaka123/image/upload",
      { method: "post", body: data }
    );
    const file = await res.json();
    console.log(file);
    readAsDataURL(file.secure_url);
  };

  const options2 = [
    "BLACK",
    "RED",
    "WHITE",
    "GRAY",
    "GREEN",
    "YELLOW",
    "NAVY",
    "PINK",
  ];
  const options3 = ["DRESS", "SHORTS", "T-SHIRTS", "DENIMS", "TOPS"];
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const defaultOption2 = options2[0];
  const defaultOption3 = options3[0];

  const submitadditem = () => {
    const additem = {
      imgUrl: imgUrl,
      itemName: itemName,
      price: price,
      discount: discount,
      size: size,
      colour: colour,
      category: category,
      description: description,
    };

    axios
      .post("http://localhost:5000/shopping", additem)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          swal("Success", "Item add Success", "success");
          readAsDataURL("");
          setItemName("");
          setPrice("");
          setDiscount("");
          setSize("");
          setColour("");
          setCategory("");
          setDescription("excellent");
        } else {
          console.log(res.data);
          swal("Sorry", "Item add unsuccessfully", "error");
        }
      })
     
      .catch((error) => {
        try {
          swal("Error", error.response.data.error, "error");
        } catch (error) {
          swal("Error", "fields are empty", "error");
        }
      });
  };

  return (
    <>
      <div div className="itemform2">
        <div className="itemtitle1">PRODUCT INFO </div>
        <div className="itemform02">
          <div className="page01">
            <div className="page01">
              <div className="container">
                <div className="img-holder">
                  <img src={imgUrl} alt="" id="img" className="img" />
                </div>
                <input
                  type="file"
                  name="file"
                  placeholder="uploda image"
                  onChange={uploadIcon}
                />
              </div>
            </div>
          </div>

          <label className="additemname1">NAME - </label>
          <br></br>
          <input
            placeholder="Add a product name"
            className="item-box1"
            onChange={(e) => setItemName(e.target.value)}
            type="text"
            required
          />

          <div className="add-item-group01">
            <div>
              <label className="additemname2"> PRICE -</label>
              <br></br>
              <input
                placeholder="Rs."
                className="item-box2"
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                required
              />
            </div>

            <div className="semi-group-2">
              <label className="additemname3"> DISCOUNT - </label>
              <br></br>
              <input
                placeholder="%"
                className="item-box3"
                onChange={(e) => setDiscount(e.target.value)}
                type="text"
                required
              />
            </div>
          </div>

          <label className="additemname4"> SIZE - </label>
          <br></br>
          <input
            placeholder="S/M/L/XL/2XL"
            className="item-box4"
            onChange={(e) => setSize(e.target.value)}
            type="text"
            required
          />

          <br></br>

          <div className="add-item-group01">
            <div>
              <label className="additemname5"> COLOUR -</label>
              <Dropdown
                options={options2}
                value={defaultOption2}
                placeholder="Select an option"
                className="item-box5"
                placeholderClassName="placename2"
                arrowClassName="sizemyArrow2"
                arrowClosed={<span className="arrowclosed2" />}
                arrowOpen={<span className="arrow-open" />}
                menuClassName="colourMenuClass"
                onChange={(index) => setColour(index.value)}
              />{" "}
            </div>

            <div className="semi-group-2">
              <label className="additemname6"> CATEGOTIES -</label>
              <br></br>
              <Dropdown
                options={options3}
                value={defaultOption3}
                placeholder="Select an option"
                className="item-box6"
                placeholderClassName="placename2"
                arrowClassName="sizemyArrow2"
                arrowClosed={<span className="arrow-closed2" />}
                arrowOpen={<span className="arrow-open" />}
                menuClassName="categoryMenuClass"
                onChange={(index) => setCategory(index.value)}
              />
            </div>
          </div>
          <br></br>
          <label className="additemname7"> DESCRIPTION - </label>
          <br></br>
          <textarea
            placeholder="Add a product name"
            className="item-box7"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            rows="4"
            required
          />

          <br></br>

          <button className="submit-btn" onClick={submitadditem}>
            Submit
          </button>
          <div
            onClick={() => props.onClick("shopping")}
            className="submit-btn2"
          >
            PREVIOUS
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
