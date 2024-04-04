import React, {useContext} from "react";
import "../../css/Home/ProductItem.css";
import { MdAddShoppingCart } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import CartContext from "../../context/CartContext";



const ProductItem = (props) => {
  const product = props.item;
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(`/product/${product._id}`);
  }

  const {isAuthenticated} = useContext(GlobalContext);
  const {addToCart} = useContext(CartContext);

  return (
    <div className="productitemcontainer">
      <div className="productitem">
        <img onClick={handleClick}  src={product.imageLink} alt="product" className="productimage" />
        {isAuthenticated && (
          <div onClick={()=>addToCart(product._id)} className="carticoncontainer">
            <MdAddShoppingCart className="carticon" />
          </div>
        )}
      </div>
      <div className="productdetails">
        <span className="name">{product.productName}</span>
        <span className="price">Price - ₹ {product.price}</span>
        <span className="type">{product.color} | {product.headphoneType}</span>
      </div>
    </div>
  );
};

export default ProductItem;
