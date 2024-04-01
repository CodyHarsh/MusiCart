import React from "react";
import Slider from "react-slick";
import MiniImage from "../MiniImage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileImages = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mobileimages">
      <Slider {...settings}>
        <div className="productimagecontainer">
          <img
            src={`data:image/png;base64, ${props.image}`}
            className="productimage"
            alt="product"
          />
        </div>
        <MiniImage />
        <MiniImage />
        <MiniImage />
      </Slider>
    </div>
  );
};

export default MobileImages;
