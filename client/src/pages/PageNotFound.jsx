import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/PageNotFound.module.css"
const PageNotFound = () => {
  return (
    <div className={styles.PageNotFoundWrapper}>
      <img className={styles.pageNotFoundImg} src="https://res.cloudinary.com/dp7faudgz/image/upload/v1712187897/Music%20cart/Logo%2C%20banner%2C%20success%20page%20logo%2C%20page%20not%20found/404-page_not_found_c0wauj.png" alt="Page Not Found Image" />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default PageNotFound
