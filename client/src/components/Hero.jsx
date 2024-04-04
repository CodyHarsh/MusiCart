import React, { useEffect, useState } from 'react'
import "../css/Hero.css"
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import CartContext from '../context/CartContext';

const dict = {
  "/login": "Login",
  "/signup": "Signup",
  "/product": "Product",
  "/cart": "View Cart",
  "/checkout": "Checkout",
}

const Hero = () => {
  const {isAuthenticated,handleLogout} = useContext(GlobalContext);
  const {getCart, totalQuantity} = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  if(location.pathname === "/login" || location.pathname === "/signup") return null;
  //Check for the homepage or not
  let title = dict[location.pathname];
  if(location.pathname.charAt(1) === "p") title = "Product";
  const alpha = "harsh bharat madhusudhan Kailash Kumar"
  const isAtHome = location.pathname === "/";

  return (
    <div className='hero'>
      <div className='heroleft'>
        <Logo />
        <span className='location'>Home{title&&"/ "}{title}</span>
        {isAuthenticated && isAtHome && location.pathname != "/success" &&
          <Link className='invoices' to="/invoices">
            <span>Invoices</span>
          </Link> 
        }
      </div>
      <div className='heroright'>
        {isAuthenticated&& location.pathname != "/success" &&
          <Link className='cartbtn' to="/cart">
            <MdOutlineShoppingCart className='carticon' />
            View Cart {totalQuantity}
          </Link> 
        }
        {
          isAuthenticated && isAtHome && location.pathname != "/success" &&
          <div className='herorightDetails'>
            <div onClick={() => setIsVisible(!isVisible) } className='name'>{localStorage.getItem("userName").split(" ").map((word)=> word[0]).join("").substring(0,2).toUpperCase()}</div>

            {
              isVisible && 
              <div className='hero-drop-down'>
                <div style={{textTransform: 'capitalize'}}>{localStorage.getItem("userName").split(' ').slice(0, 2).join(' ')}</div>
                <hr />
                <div onClick={handleLogout} className='hero-logout'>
                  Logout
                </div>
              </div>
            }
            
          </div>
        }
      </div>
    </div>
  )
}

export default Hero