import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import SingleInvoice from "./SingleInvoice";
import GlobalContext from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/ProductPage/Spinner";
import { IoMdArrowBack } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import IconEdit from "../assets/IconEdit.svg";
import "../css/Invoices.css";
import LoadingBar from "react-top-loading-bar";

const Invoices = () => {
  const { findInvoices, totalInvoices } = useContext(CartContext);
  const { isAuthenticated } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    const getTheInvoices = async () => {
      setIsLoading(true); // Set loading state to true before fetching invoices
      try {
        await findInvoices();
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error gracefully, e.g., display an error message
      }
      setIsLoading(false); // Set loading state to false after fetching invoices
    };

    getTheInvoices();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spinner /> // Message while loading
      ) : (
        <>
          <div className="goback">
            <Link to="/" className="gobackbtn">
              <IoMdArrowBack className="gobackicon" />
              <span className="pc">Back to Products</span>
            </Link>
          </div>
          <div className="invoice-title">
            <h1>My Invoices</h1>
          </div>
          {totalInvoices?.invoices?.length > 0 ? (
            totalInvoices?.invoices.map((item, key) => (
              <>
              <div key ={key} className="invoice-data-wrapper" >
                <div className="invoice-data-items-icons-wrapper">
                  <div className="invoice-icon-edit">
                    <img src={IconEdit} alt="IconEdit" srcset="" />
                  </div>
                  <div className="invoice-data-actual-wrapper">
                    <p className="invoice-user-name">{item.name}</p>
                    <p>{item.address}</p>
                  </div>
                </div>

                <div>
                  
                    <Link to={`/invoices/${item._id}`} className="view-invoice-button">
                    <div className="goback">
                      <span>View Invoice</span>
                      </div>
                    </Link>
                  
                </div>
                
              </div>
              <hr />
              </>
            ))
          ) : (
            <div className="invoice-not-found">
              <TbFaceIdError size="5em" color="blue" />
              <h4>No invoices found.</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Invoices;
