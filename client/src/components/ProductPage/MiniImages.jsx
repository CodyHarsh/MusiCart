import React from "react";
import MiniImage from "./MiniImage";

const MiniImages = (props) => {
  console.log((props.otherImages))
  return (
    <>
      <div className="productimagecontainer">
        <img src={props.image} className="productimage" alt="product" />
      </div>
      <div className="miniimages">
      {Array.isArray(props.otherImages) && props.otherImages.map((item, index) => (
  <MiniImage key={index} miniImage={item} />
))}

      </div>
    </>
  );
};

export default MiniImages;
