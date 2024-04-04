import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";


const CartPriceDetails = (props) => {
  const navigate = useNavigate();
  const [conv, setConv] = useState(0);
  const {getCart} = useContext(CartContext);
  useEffect(() => {
    if (props.total > 0) {
      setConv(50);
    } else {
      setConv(0);
    }
  }, [props.total]);

  const handleCheckout = () => {
    if(props.total <= 0){
      toast.error("Add The Products In The Cart");
      return;
    }
    getCart();
    navigate("/checkout");
  }
  return (
    <div className="cartpricedetails">
      <h4>PRICE DETAILS</h4>
      <div className="cartvalueinfo">
        <div className="totalmrp">
          <span>Total MRP</span>
          <span>₹{props.total}</span>
        </div>
        <div className="discount">
          <span>Discount on MRP</span>
          <span>₹0</span>
        </div>
        <div className="conv">
          <span>Convenience Fee</span>
          <span>₹{conv}</span>
        </div>
      </div>
      <div className="total">
        <span>Total Amount</span>
        <span>₹{props.total+conv}</span>
      </div>
      <button onClick={handleCheckout} className="placeorder">PLACE ORDER</button>
    </div>
  );
};

export default CartPriceDetails;
