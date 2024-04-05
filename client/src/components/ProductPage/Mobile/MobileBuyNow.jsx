import React from "react";
import { useNavigate } from "react-router-dom";

const MobileBuyNow = (props) => {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button
        onClick={() => navigate(`/checkout/${props._id}`)}
        className="buynow"
      >
        Buy Now
      </button>
    </div>
  );
};

export default MobileBuyNow;