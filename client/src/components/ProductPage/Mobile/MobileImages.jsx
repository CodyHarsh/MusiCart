import React from "react";
import Slider from "react-slick";
import MiniImage from "../MiniImage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileImages = (props) => {
  const product = props.image;
  console.log("Props: ", props);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(product.otherImages);
  // console.log(Array.isArray(product.otherImages));
  return (
    <div className="mobileimages">
      <Slider {...settings}>
        <div className="productimagecontainer">
          <img src={product.imageLink} className="productimage" alt="product" />
        </div>
  
         {Array.isArray(product.otherImageLink) &&
          product.otherImageLink.map((item, index) => (
            <MiniImage key={index} miniImage={item} />
          ))}
        
      </Slider>
    </div>
  );
};

export default MobileImages;
