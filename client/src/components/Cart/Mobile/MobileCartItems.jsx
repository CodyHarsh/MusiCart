import React, { useEffect, useState } from "react";
import CartItem from "../CartItem";
import MobileCartItem from "./MobileCartItem";

const MobileCartItems = (props) => {
  const { cart, total } = props;
  const [len, setLen] = useState(0);
  const findItems = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };
  useEffect(() => {
    setLen(findItems());
  }, [cart]);
  return (
    <>
      <div className="cartitems">
        <hr />
        {cart.map((item) => (
          <MobileCartItem key={item._id} item={item} />
        ))}
        <hr />
      </div>
    </>
  );
};

export default MobileCartItems;
