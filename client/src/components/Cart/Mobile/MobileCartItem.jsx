import React, { useContext } from "react";
import CartContext from "../../../context/CartContext";

const MobileCartItem = (props) => {
  const product = props.item.product;
    const {total} = props;
    console.log(product);
    const prductQuantity = props.item.productQuantity;
    console.log("Product Quantity: ", prductQuantity);
    const {updateQuantity} = useContext(CartContext);
    console.log("IN CartItem.jsx: ",props);

  const handleUpdateQuantity = (e) =>{
    let productId = product._id;
    let quantity = e.target.value;
    if(quantity > 8){
        toast.error("Cannot Add this Product Anymore");
    }
    updateQuantity(productId, quantity);
}
  return (
    <div className="cartitem">
      <div className="cartitemimage">
        <img src= {product.imageLink} alt="product" />
      </div>
      <div className="cigo">
        <div className="cartiteminfo">
          <h3>{product.productName}</h3>
          <p>Clour : {product.color}</p>
          <p>In Stock</p>
        </div>
        <div className="cartitemprice">
          <h3>Price ₹{product.price}</h3>

          <div className="cartitemquantity">
            <h3>Quantity</h3>
            <select onChange={handleUpdateQuantity} defaultValue={prductQuantity}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>

        <div className="cartitemtotal">
          <h3>Total</h3>₹{product.price * prductQuantity}
        </div>
      </div>
    </div>
  );
};

export default MobileCartItem;
