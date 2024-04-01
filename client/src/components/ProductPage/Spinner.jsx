import React from "react";
import { HashLoader } from "react-spinners";
import "../../css/Product/Spinner.css";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <HashLoader color="#2E0052" size={50} />
      </div>
    </>
  );
};

export default Spinner;
