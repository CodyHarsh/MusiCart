import React, { useContext } from "react";
import ProductButtons from "./ProductButtons";
import MobileBuyNow from "./Mobile/MobileBuyNow";
import MobileImages from "./Mobile/MobileImages";
import GlobalContext from "../../context/GlobalContext";
import LoginToBuy from "./LoginToBuy";
import MobileProductDetails from "./Mobile/MobileProductDetails";
import { useNavigate } from "react-router-dom";

const MobileProduct = (props) => {
  const { isAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <div className="mobile">
      <div className="productcontainer">
        {isAuthenticated && <MobileBuyNow  id={props.product._id} />}
        <MobileImages image={props.product} />
        <MobileProductDetails product={props.product} />
        {isAuthenticated ? <ProductButtons id={props.product._id}/> : <LoginToBuy/>}
      </div>
    </div>
  );
};

export default MobileProduct;
