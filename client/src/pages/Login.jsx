import React from "react";
import Logo from "../components/Logo";
import "../css/Auth.css";
import LoginForm from "../components/AuthPages/LoginForm";
import Divider from "../components/AuthPages/Divider";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleGoto = () => {
    navigate("/signup");
  };
  const context = useContext(GlobalContext);
  const { login } = context;
  return (
    <div className="login">
      <div className="logincontainer">
        <Logo />
        <LoginForm meth={login} />
        <Divider />
        <button onClick={handleGoto} className="createaccount">
          Create your Musicart account
        </button>
      </div>
    </div>
  );
};

export default Login;
