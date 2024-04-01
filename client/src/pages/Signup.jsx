import React, { useContext } from "react";
import Logo from "../components/Logo";
import "../css/Auth.css";
import SignupForm from "../components/AuthPages/SingupForm";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Signup = () => {

  const context = useContext(GlobalContext);
  const {signup} = context;

  return (
    <div className="login">
      <div className="logincontainer">
        <Logo />
        <SignupForm meth={signup} />
        <div className="alreadyhaveanaccount">
          Already have an account? <Link to="/login" className="signin"> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
