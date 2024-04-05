import React, { useContext, useEffect, useState } from 'react';
import "../css/BottomNavbar.css";
import { GoHome } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import CartContext from '../context/CartContext';

const BottomNavbar = () => {
    const { handleLogout, isAuthenticated } = useContext(GlobalContext);
    const {totalQuantity} = useContext(CartContext) 
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className='mobile bottomnavbar'>
            <Link to="/" className={`bottomnavbar-item ${activeLink === '/' && 'active'}`}>
                <GoHome className='bottomnavbar-icon' />
                <p className='bottomnavbar-text'>Home</p>
            </Link>
            <Link to="/cart" className={`bottomnavbar-item ${activeLink === '/cart' && 'active'}`}>
                <MdAddShoppingCart className='bottomnavbar-icon' />
                <p className='bottomnavbar-text'>Cart</p>
                <div className='bottomnavbar-totalQuantity'>{totalQuantity || 0}</div>
            </Link>
            {isAuthenticated ? (
                <div onClick={() => navigate('/invoices')} className={`bottomnavbar-item ${activeLink === '/invoices' && 'active'}`}>
                    <LiaFileInvoiceDollarSolid height="20px" width="20px" className='bottomnavbar-icon' />
                    <p className='bottomnavbar-text'>Invoices</p>
                </div>
            ) : null}
            {isAuthenticated ? (
                <div onClick={handleLogout} className={`bottomnavbar-item ${activeLink === '/logout' && 'active'}`}>
                    <BsPerson className='bottomnavbar-icon' />
                    <p className='bottomnavbar-text'>Logout</p>
                </div>
            ) : (
                <Link to="/login" className={`bottomnavbar-item ${activeLink === '/login' && 'active'}`}>
                    <BsPerson className='bottomnavbar-icon' />
                    <p className='bottomnavbar-text'>Login</p>
                </Link>
            )}
        </div>
    );
}

export default BottomNavbar;
