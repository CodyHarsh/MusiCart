import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Logo from './Logo';
import GlobalContext from '../context/GlobalContext';
import CartContext from '../context/CartContext';
import '../css/Hero.css';

const dict = {
  '/login': 'Login',
  '/signup': 'Signup',
  '/product': 'Product',
  '/cart': 'View Cart',
  '/checkout': 'Checkout',
};

const Hero = () => {
  const { isAuthenticated, handleLogout } = useContext(GlobalContext);
  const { totalQuantity } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const title = useMemo(() => {
    let title = dict[location.pathname];
    if (location.pathname.charAt(1) === 'p') title = 'Product';
    return title;
  }, [location.pathname]);

  const isAtHome = location.pathname === '/';
  const showCart = isAuthenticated && location.pathname !== '/success';
  const showUserDetails = isAuthenticated && isAtHome && location.pathname !== '/success';

  return (
    <div className="hero">
      <div className="heroleft">
        <Logo />
        <span className="location">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Home
          </span>
          {title && '/ '}
          {title}
        </span>
        {showUserDetails && (
          <Link className="invoices" to="/invoices">
            <span>Invoices</span>
          </Link>
        )}
      </div>
      <div className="heroright">
        {showCart && (
          <Link className="cartbtn" to="/cart">
            <MdOutlineShoppingCart className="carticon" />
            View Cart {totalQuantity}
          </Link>
        )}
        {showUserDetails && (
          <div className="herorightDetails">
            <div onClick={() => setIsVisible(!isVisible)} className="name">
              {localStorage.getItem('userName')
                .split(' ')
                .map((word) => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
            {isVisible && (
              <div className="hero-drop-down">
                <div style={{ textTransform: 'capitalize' }}>
                  {localStorage.getItem('userName')
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
                </div>
                <hr />
                <div onClick={handleLogout} className="hero-logout">
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
