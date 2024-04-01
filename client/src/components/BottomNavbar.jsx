import React, {useContext} from 'react'
import "../css/BottomNavbar.css"
import { GoHome } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

const locationDict = {
    '/': 0,
    '/cart': 1,
    '/login': 2,
    '/signup': 2
}

const BottomNavbar = () => {
    const { handleLogout, isAuthenticated } = useContext(GlobalContext);
    const [active, setActive] = React.useState(0);

    const location = useLocation();
    React.useEffect(() => {
        setActive(locationDict[location.pathname]);
    }, [location])
  return (
    <div className='mobile bottomnavbar'>
        <Link to="/" className={`bottomnavbar-item ${active==0&&'active'}`}>
            <GoHome className='bottomnavbar-icon' />
            <p className='bottomnavbar-text'>Home</p>
        </Link>
        <Link to="/cart" className={`bottomnavbar-item ${active==1&&'active'}`}>
            <MdAddShoppingCart className='bottomnavbar-icon' />
            <p className='bottomnavbar-text'>Cart</p>
        </Link>
        {
            isAuthenticated ? (
                <div onClick={handleLogout} className={`bottomnavbar-item ${active==2&&'active'}`}>
                    <BsPerson className='bottomnavbar-icon' />
                    <p className='bottomnavbar-text'>Logout</p>
                </div>
            ) : (
                <Link to="/login" className={`bottomnavbar-item ${active==2&&'active'}`}>
                    <BsPerson className='bottomnavbar-icon' />
                    <p className='bottomnavbar-text'>Login</p>
                </Link>
            )
        }
    </div>
  )
}

export default BottomNavbar