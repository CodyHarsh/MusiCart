import React from "react";
import  "../css/Auth.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
      <Link to="/" className="logocomponent">
        <img src="https://res.cloudinary.com/dp7faudgz/image/upload/v1712187664/Music%20cart/Logo%2C%20banner%2C%20success%20page%20logo%2C%20page%20not%20found/logo_y6czjp.png " alt="logo" className="logo" />
        <span className="text">Musicart</span>
      </Link>
  );
};

export default Logo;
