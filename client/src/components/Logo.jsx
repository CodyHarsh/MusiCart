import React from "react";
import  "../css/Auth.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
      <Link to="/" className="logocomponent">
        <img src="logo.png" alt="logo" className="logo" />
        <span className="text">Musicart</span>
      </Link>
  );
};

export default Logo;
