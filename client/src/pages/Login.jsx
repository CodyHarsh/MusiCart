import React, { useEffect } from "react";
import Logo from "../components/Logo";
import "../css/Auth.css";
import LoginForm from "../components/AuthPages/LoginForm";
import Divider from "../components/AuthPages/Divider";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const handleGoto = () => {
    navigate("/signup");
  };
  
  const context = useContext(GlobalContext)
  const { login, isAuthenticated } = context;
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Already Loginned");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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
