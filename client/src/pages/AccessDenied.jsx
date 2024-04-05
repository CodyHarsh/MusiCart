import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/PageNotFound.module.css"
const AccessDenied = () => {
  return (
    <div className={styles.PageNotFoundWrapper}>
      <img className={styles.pageNotFoundImg} src="https://res.cloudinary.com/dp7faudgz/image/upload/v1712325311/Music%20cart/Logo%2C%20banner%2C%20success%20page%20logo%2C%20page%20not%20found/access_denied_image_k5k8ss.png" />
      <h1>Acess Denied</h1>
      <p>Login or Signup To Get Aceess to This Page</p>
      <Link className="button-page" to="/login">
        <div className={styles.buttonpage} > 
          Go To Login Page
        </div>
      </Link>
    </div>
  );
};

export default AccessDenied
