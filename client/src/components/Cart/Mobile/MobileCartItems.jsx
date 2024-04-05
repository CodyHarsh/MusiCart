import React, { useContext, useEffect, useState } from "react";
import CartItem from "../CartItem";
import MobileCartItem from "./MobileCartItem";
import CartContext from "../../../context/CartContext";
import LoadingBar from "react-top-loading-bar";
import GlobalContext from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const MobileCartItems = (props) => {
  
//   let { cart, total } = props;
  const[isLoading, setIsloading] = useState(false);
  const {isAuthenticated} = GlobalContext
  const {cart, total, getCart} = useContext(CartContext);

  useEffect(() => {
   
    setIsloading(true);
    const fetchData = async () => {
       const data = await getCart();
    }
    fetchData();
    setIsloading(false);
  }, []);
  return (
    <>
      {isLoading ? <LoadingBar /> : (
      <div className="cartitems">
        <hr />
        {cart.map((item) => (
          <MobileCartItem key={item._id} item={item} />
        ))}
        <hr />
      </div>
      )}
    </>
  );
};

export default MobileCartItems;
