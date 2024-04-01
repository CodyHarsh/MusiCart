import React, { useContext, useState, useEffect } from "react";
import "../css/Product/Product.css";
import MiniImages from "../components/ProductPage/MiniImages";

import ProductDescription from "../components/ProductPage/ProductDescription";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import { IoMdArrowBack } from "react-icons/io";
import MobileProduct from "../components/ProductPage/mobileProduct";

const Product = () => {
  const { getProductById } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  console.log("Product.jsx: ", product);
  useEffect(() => {
    console.log("HERE");
    const getProduct = async (id) => {
      const product = await getProductById(id);
      setProduct(product);
    };
    getProduct(id);
  }, []);

  return (
    <div className="product">
      <div className="goback">
        <Link to="/" className="gobackbtn">
          <IoMdArrowBack className="gobackicon" />
          <span className="pc">Back to Products</span>
        </Link>
      </div>
      <div className="pc">
        <div className="productcontainer">
          <div className="producttitle">{product.productTitle}</div>
          <div className="container">
            <div className="containerleft">
              <MiniImages image={product.imageLink} otherImages={product.otherImageLink} />
            </div>
            <div className="containerright">
              <ProductDescription item={product} />
            </div>
          </div>
        </div>
      </div>
      <MobileProduct product={product} /> 
    </div>
  );
};

export default Product;
