import React, { useEffect } from "react";
import "../css/Checkout.css";
import CheckoutDeliveryAddress from "../components/Checkout/CheckoutDeliveryAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReviewItems from "../components/Checkout/CheckoutReviewItems";
import CheckOutMiniOrder from "../components/Checkout/CheckOutMiniOrder";
import PlaceOrderWidget from "../components/Checkout/PlaceOrderWidget";
import { Link, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import { useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const { cart, total, checkout, buyNow } = useContext(CartContext);
  const { id } = useParams();

  const dummyCheckout = () => {};

  useEffect(() => {
    if (props.buyNow) {
      buyNow(id);
    }
  }, []);
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (total === 0) {
      navigate("/");
      return;
    }
    checkout();
    navigate("/success");
  };

  return (
    <div className="checkout">
      <div className="goback">
        <Link to="/cart" className="gobackbtn">
          <IoMdArrowBack className="gobackicon" />
          <span className="pc">Back to Products</span>
        </Link>
      </div>
      <div className="title">Checkout</div>
      <div className="checkoutdiv">
        <div className="checkoutleft">
          <CheckoutDeliveryAddress />
          <hr />
          <CheckoutPayment />
          <hr />
          <CheckoutReviewItems cart={cart} />
          <hr />
          <div className="pc">
            <CheckOutMiniOrder total={total} />
          </div>
        </div>
        <div className="mobile">
          <hr />
          <div className="">
            <div className="leftitem">
              <div className="ll">Order Total: ₹{total}</div>
            </div>
          </div>
          <div className="placeorderwidget">
            <button onClick={handleCheckout}>Place your order</button>
          </div>
        </div>

        <div className="checkoutright pc">
          <PlaceOrderWidget
            total={total}
            checkout={props.buyNow ? dummyCheckout : checkout}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
