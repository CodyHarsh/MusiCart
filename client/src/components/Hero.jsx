import React from 'react'
import "../css/Hero.css"
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const dict = {
  "/login": "Login",
  "/signup": "Signup",
  "/product": "Product",
  "/cart": "View Cart",
  "/checkout": "Checkout",
}

const Hero = () => {
  const location = useLocation();
  if(location.pathname === "/login" || location.pathname === "/signup") return null;

  let title = dict[location.pathname];
  if(location.pathname.charAt(1) === "p") title = "Product";

  const {isAuthenticated} = useContext(GlobalContext);

  return (
    <div className='hero'>
      <div className='heroleft'>
        <Logo />
        <span className='location'>Home{title&&"/ "}{title}</span>
      </div>
      <div className='heroright'>
        {isAuthenticated&& location.pathname != "/success" &&
          <Link className='cartbtn' to="/cart">
            <MdOutlineShoppingCart className='carticon' />
            View Cart
          </Link>}
      </div>
    </div>
  )
}

export default Hero