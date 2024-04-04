import React, { useEffect, useState } from 'react'
import CheckoutItem from './CheckoutItem'

const CheckoutReviewItems = (props) => {
  const [currentProductName , setCurrentProductName] = useState("");
  const [currentColor, setCurrentColor] = useState("")
  const {cart} = props;

  useEffect(() => {
    if(cart?.buyNow ){
      console.log("BUY NOW: ", props.cart);
      setCurrentColor(cart.color);
      setCurrentProductName(cart.productName);
    }else if(cart){
      console.log("NORMAL CART: ", props?.cart);
      setCurrentColor(cart[0]?.product?.color);
      setCurrentProductName(cart[0]?.product.productName);
    }
  }, []);
  
  const handleUpdatedName = (color, productname) => {
    setCurrentColor(() => color);
    setCurrentProductName(() => productname);
  }
  
  console.log("CHECKOUT CART REVIEW ITEMS: ", currentColor, " ", currentProductName);
  return (
    <div className='leftitem'>
        <div className='ll'>
            3. Review items and delivery
       </div>
       <div className='lr citems'>
            {props?.buyNow  ? 
              <img src={cart.imageLink} alt='product' /> :
              cart.map((item, index) => {
                return <CheckoutItem handleUpdatedName={handleUpdatedName} color={item.product.color} productName ={item.product.productName} key={index}  imageLink={item.product.imageLink} alt='product' />
              })
              
            } 
            <div className='ciitemsDetails'>
              <h1>{currentProductName || "Boat"}</h1>
              <h3>Clour : {currentColor || "Black"}</h3>
              <h3>In Stock</h3>
              <h2>Estimated delivery :</h2>
              <h2>Monday — Standard Delivery</h2>
            </div>
            
        </div>
    </div>
  )
}

export default CheckoutReviewItems