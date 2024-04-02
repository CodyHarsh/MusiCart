import React, { useEffect, useState } from "react";
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
import GlobalContext from "../context/GlobalContext";

const Checkout = (props) => {
    //userId, name, purchaseDate, address, paymentMethod, orderItems, orderDelivery, products
    const orderDelivery = 50;
  console.log("CHECKOUT.JSx: ", props);
  const { cart, total, checkout, buyNow, totalQuantity, getCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [productIds, setProductIds] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (total === 0) {
      navigate("/");
      return;
    }
   
    getCart();
  }, []);
  console.log(total);

  const handleCheckout = () => {
    if (total === 0) {
      navigate("/");
      return;
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    const purchaseDate = mm + '/' + dd + '/' + yyyy;
    setName(name);
    setAddress(address);
    setSelectedPaymentMethod(selectedPaymentMethod);
    setProductIds(productIds);
  
    console.log(name, purchaseDate, address, selectedPaymentMethod, total, orderDelivery, productIds);
    
    checkout(name, purchaseDate, address, selectedPaymentMethod, total, orderDelivery, productIds);
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
          <CheckoutDeliveryAddress name={name} setName={setName} address={address} setAddress={setAddress} />
          <hr />
          <CheckoutPayment selectedPaymentMethod= {selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
          <hr />
          <CheckoutReviewItems productIds={productIds} setProductIds={setProductIds} cart={cart} />
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
