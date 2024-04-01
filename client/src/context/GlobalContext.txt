import { createContext } from "react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const GlobalContext = createContext();
let url = import.meta.env.VITE_URL;

const GlobalState = (props) => {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toastMessage = (message, type) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };



  const login = async (login, password) => {
    setProgress(20);
    try {
      const responsesData = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: login, password }),
      });
      setProgress(40);
      const data = await responsesData.json();
      console.log(data);
      //const data = response.data
      
      setProgress(60);
      if (data.success) {
        setUser({
          name: data.data.name,
          email: data.data.email,
          mobile: data.data.mobile,
        });
        localStorage.setItem("token", data.token);
        toastMessage(data.info, "success");
        setIsAuthenticated(true);
        setProgress(100);
        return true;
      } else {
        console.log("Here");
        toastMessage(data.message, "warning");
        setProgress(100);
        return false;
      }
    } catch (error) {
      setProgress(100);
      console.log(error);
      return false;
    }
  };

  const signup = async (name, email, mobile, password) => {
    setProgress(20);
    try {
      const response = await fetch(`${url}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, mobile }),
      });
      setProgress(40);
      const data = await response.json();
      setProgress(60);
      if (data.success) {
        toastMessage(data.message, "success");
        setProgress(100);
        return true;
      } else {
        toastMessage(data.message, "warning");
        setProgress(100);
        return false;
      }
    } catch (error) {
      console.log(error);
      setProgress(100);
      return false;
    }
  };

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser({ name: "", email: "", mobile: "" });
  };

  return (
    <GlobalContext.Provider
      value={{ login, signup, progress, setProgress, user, handleLogout, isAuthenticated }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalState };

export default GlobalContext;
