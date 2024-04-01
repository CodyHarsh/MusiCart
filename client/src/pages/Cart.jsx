import React, {useContext, useEffect} from "react";
import "../css/Cart/Cart.css";
import CartTitle from "../components/Cart/CartTitle";
import CartItems from "../components/Cart/CartItems";
import CartPriceDetails from "../components/Cart/CartPriceDetails";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import GlobalContext from "../context/GlobalContext";
import { IoMdArrowBack } from "react-icons/io";
import MobileCartItems from "../components/Cart/Mobile/MobileCartItems";

const Cart = () => {
  const {cart,total, getCart} = useContext(CartContext);
  const {isAuthenticated} = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login');
      return;
    }
    getCart();
  }, []);

  return (
    <div className="cart">
      <div className="goback">
        <Link to="/" className="gobackbtn">
          <IoMdArrowBack className="gobackicon" />
          <span className="pc">Back to Products</span>
        </Link>
      </div>
      <CartTitle />
      <div className="pc">
      <div className="cartdiv">
        <div className="cartleft">
          <CartItems cart={cart} total={total} />
        </div>
        <div className="cartright">
          <CartPriceDetails total={total} />
        </div>
      </div>
      </div>
      <div className="mobile">
        <MobileCartItems cart={cart} total={total} />
        <CartPriceDetails total={total} />
      </div>
    </div>
  );
};

export default Cart;
