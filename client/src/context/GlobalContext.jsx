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
        console.log(data);
        setUser({
          userId: data.data.user._id,
          name: data.data.user.name,
          email: data.data.user.email,
          mobile: data.data.user.mobile,
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userName",data.data.user.name)
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

  const signup = async (name, email, password, mobile) => {
    console.log("HERE");
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
      console.log(data);
      setProgress(60);
      if (data.success) {
        toastMessage(data.message, "success");
        setUser({
          userId: data.data.response._id,
          name: data.data.response.name,
          email: data.data.response.email,
          mobile: data.data.response.mobile,
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userName",data.data.response.name)

        setIsAuthenticated(true);
        setProgress(100);
        window.location.pathname = "/";
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

  const getUserDetails = async () => {
    setProgress(20);
    console.log("TOKEN: ", localStorage.getItem("token"));
    try {
      const response = await fetch(`${url}/user/getUserDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        }
      });
      setProgress(40);
      const data = await response.json();
      console.log(data);
      setProgress(60);
      if (data.success) {
        console.log(data);
        toastMessage(data.message, "success");
        setUser({
          userId: data.data._id,
          name: data.data.name,
          email: data.data.email,
          mobile: data.data.mobile,
        });
        setIsAuthenticated(true);
        setProgress(100);
        window.location.pathname = "/";
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
      value={{ login, signup, progress, setProgress, user, handleLogout, isAuthenticated ,getUserDetails}}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalState };

export default GlobalContext;
