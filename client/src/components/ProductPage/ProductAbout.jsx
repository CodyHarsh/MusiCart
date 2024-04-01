import React from "react";

const ProductAbout = (props) => {
  console.log(props.about);
  return (
    <div className="about">
      <p className="title">About this item</p>
      <ul className="items">
      {Array.isArray(props.about) && props.about.map((item, index) => (
  <li key={index}>{item}</li>
))}

      </ul>
    </div>
  );
};

export default ProductAbout;
