import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "../../css/Home/Products.css";
import ProductItemListView from "./ProductItemListView";
import ProductContext from "../../context/ProductContext";
import Spinner from "../ProductPage/Spinner";
import NotFound from "../../pages/NotFound";
import CartContext from "../../context/CartContext";
import LoadingBar from "../LoadingBar"

const Products = () => {
  const { isList, getAllProducts, products, isProductStoreLoading } = useContext(ProductContext);
  const {getCart} = useContext(CartContext)
  useEffect(() => {
    getAllProducts();
    getCart();
  }, []);

  return (
    <>
      {isProductStoreLoading ? (
        <Spinner />
      ) : (
        products.length === 0 ? (<NotFound name={"Products Not Found For this"} />) :
        <>
          <div
            className={`${isList ? "productlist" : "productsgrid"} products `}
          >
            {products.map((item, index) => {
              if (isList)
                return <ProductItemListView item={item} key={index} />;
              else return <ProductItem item={item} key={index} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
