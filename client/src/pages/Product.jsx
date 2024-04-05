import React, { useContext, useState, useEffect } from "react";
import "../css/Product/Product.css";
import MiniImages from "../components/ProductPage/MiniImages";
import { TbFaceIdError } from "react-icons/tb";
import ProductDescription from "../components/ProductPage/ProductDescription";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import { IoMdArrowBack } from "react-icons/io";
import MobileProduct from "../components/ProductPage/MobileProduct";
import Spinner from "../components/ProductPage/Spinner";
import NotFound  from "./NotFound";
import PageNotFound from "./PageNotFound";

const Product = () => {
  const { getProductById,isProductStoreLoading } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
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
      {isProductStoreLoading ? (<Spinner/>) : 
      !product ? (
        <PageNotFound name={"Product Not Found"} />
            ) : (
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
      )
      }
      <MobileProduct product={product} /> 
    </div>
  );
};

export default Product;