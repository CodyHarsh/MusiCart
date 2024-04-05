import React, { useEffect, useState } from "react";
import "../css/Checkout.css";
import { Link, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import { useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Spinner from "../components/ProductPage/Spinner";
import { toast } from "react-toastify";
import { InvoiceImage } from "./InvoiceImage";
import PageNotFound from "./PageNotFound";
import LoadingBar from "react-top-loading-bar";
let url = import.meta.env.VITE_URL;

const SingleInvoice = () => {
  const [isLoading , setIsLoading] = useState(false);
  const { isAuthenticated } = useContext(GlobalContext);
  const [singleInvoiceData, setSingleInvoiceData] = useState([]);
  const [cart , setCart] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProductName , setCurrentProductName] = useState("");
  const [currentColor, setCurrentColor] = useState("")

  
  const handleUpdatedName = (color, productname) => {
    setCurrentColor(() => color);
    setCurrentProductName(() => productname);
  }

  useEffect(() => {
   
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    const getSingleInvoice = async (invoiceId) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/user/getInvoice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({ 
            invoiceId
           }),
        });
        const data = await response.json();
        if (data.success) {
          setInvoiceDetails(data.data.invoiceData)
          setSingleInvoiceData(data.data);
          setCart(data.data.productData)
          setCurrentColor(data.data.productData[0].color);
          setCurrentProductName(data.data.productData[0].productName);
          setIsLoading(false);
          return true;
        } else {
          //toastMessage(data.message, "warning");

          setIsLoading(false);
          return false;
        }
      } catch (error) {
        setIsLoading(false);
        setIsLoading(false);
        console.log(error);
        return false;
      }
    };
    getSingleInvoice(id);

    
  }, []);



  return (
    <>
    {isLoading ? ( <Spinner />) : ( 
    <>
        <div className="checkout">
          <div className="goback">
            <Link to="/" className="gobackbtn">
              <IoMdArrowBack className="gobackicon" />
              <span className="pc">Back to Products</span>
            </Link>
          </div>
          <div className="title">Invoices</div>
          <div className="checkoutdiv">
            <div className="checkoutleft">
            
              <div className="leftitem">
                <div className="ll">1. Delivery address</div>
                <div className="lr invoice-product-data">
                  <div style={{ fontSize: "18px", textTransform: 'capitalize', fontWeight: "bold" }}>
                    {invoiceDetails?.name}
                  </div>
                  <div style={{ fontSize: "16px", textTransform: 'capitalize' }}>{invoiceDetails?.address}</div>
                </div>
              </div>
              <hr />
              <div className="leftitem">
                <div className="ll">2. Payment method</div>
                <div className="lr">
                  <div className="paymentmethods" style={{ fontSize: "1.2rem", textTransform: 'capitalize' }}>
                    {invoiceDetails?.paymentMethod}
                  </div>
                </div>
              </div>{" "}
              <hr />
              {/* ERROR IS HERE */}
              <div className="leftitem">
                <div className="ll">3. Review items and delivery</div>
                <div className="lr citems">
                {cart.length >= 1 ? (
                    cart.map((item, index) => {
                      return (
                        <InvoiceImage handleUpdatedName= {handleUpdatedName}  color={item.color} productName = {item.productName} imageLink ={item.imageLink} />
                      );
                    })
                  ) : (
                    (null)
                  )}
                  <div className="ciitemsDetails">
                    <h1>{currentProductName}</h1>
                    <h3>Clour : {currentColor}</h3>
                    <h3>In Stock</h3>
                    <h2>Estimated delivery :</h2>
                    <h2>Monday — Standard Delivery</h2>
                  </div>
                </div>
              </div>  
              <hr />
            
            </div>
            <div className="mobile">
              <hr />
              <div className="">
                <div className="leftitem">
                  <div className="ll">Order Total: ₹{invoiceDetails?.orderItems}</div>
                </div>
              </div>
            </div>

            <div className="checkoutright pc">
              <div className="placeorderwidget">
                <h1>Order Summary</h1>
                <div className="orderrow">
                  <span>Items</span>
                  <span>
                    ₹
                    {invoiceDetails?.orderItems }
                    .00
                  </span>
                </div>
                <div className="orderrow">
                  <span>Delivery</span>
                  <span>₹{invoiceDetails?.orderDelivery}.00</span>
                </div>
                <hr />
                <div className="orderrow">
                  <h1>Order Total</h1>
                  <h1>
                    ₹
                    {invoiceDetails?.orderItems + invoiceDetails?.orderDelivery}
                    .00
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    )}
    </>
  );
};

export default SingleInvoice;
