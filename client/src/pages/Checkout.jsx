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
import Spinner from "../components/ProductPage/Spinner";
import GlobalContext from "../context/GlobalContext";

const Checkout = (props) => {
  //userId, name, purchaseDate, address, paymentMethod, orderItems, orderDelivery, products
  const { isAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const orderDelivery = 50;
  const { cart, total, checkout, buyNow, totalQuantity, getCart } = useContext(CartContext);

  const dummyCheckout = () => {};
  console.log("CHECKOUT.JSx: ", props);
  console.log("CART: ", cart, " ");

  useEffect(() => {
    setIsLoading(true);
    const getTheData = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (props.buyNow) {
            console.log("HERE");
            const data = await buyNow(id);
        } else {
            console.log("GET CART");
            const data = await getCart();
        }
    };
    getTheData();
    setIsLoading(false);
}, []);


  let checkoutData = {
    name,
    address,
    selectedPaymentMethod,
    orderDelivery,
  };
  useEffect(() => {
    checkoutData = {
      name,
      address,
      selectedPaymentMethod,
      orderDelivery,
    };
  }, [name, address, selectedPaymentMethod, orderDelivery]);
  console.log(checkoutData);

  const handleCheckout = async () => {
    if (total === 0) {
      navigate("/");
      return;
    }

    const data = await checkout(checkoutData);
    console.log("CHECKOUT DATA RESPONSE", data);
    if (data) {
      navigate("/success");
    }
  };

  return (
    <div className="checkout">
      <div className="goback">
        <Link to="/" className="gobackbtn">
          <IoMdArrowBack className="gobackicon" />
          <span className="pc">Back to Products</span>
        </Link>
      </div>
      <div className="title">Checkout</div>
      <div className="checkoutdiv">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="checkoutleft">
              <CheckoutDeliveryAddress
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
              />
              <hr />
              <CheckoutPayment
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
              />
              <hr />
               <CheckoutReviewItems
                    buyNow = {props?.buyNow}
                cart={cart}
              />  
              <hr />
              <div className="pc">
                <CheckOutMiniOrder handleCheckout={handleCheckout} total={total} />
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
              <PlaceOrderWidget handleCheckout={handleCheckout} total={total} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
