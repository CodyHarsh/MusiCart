import React, { useState } from 'react'
import CheckoutItem from './CheckoutItem'

const CheckoutReviewItems = (props) => {
  const {cart,setProductIds, productIds} = props;
 
  return (
    <div className='leftitem'>
        <div className='ll'>
            3. Review items and delivery
       </div>
       <div className='lr citems'>
            {cart.map((item, index) => {
              return <CheckoutItem key={index} setProductIds={setProductIds} productIds={productIds} item={item} />
            })} 
            <div className='ciitemsDetails'>
              {/* <h1>{product.productName}</h1>
            <h3>Clour : {product.color}</h3> */}
            <h3>In Stock</h3>
            <h2>Estimated delivery :</h2>
            <h2>Monday — Standard Delivery</h2>
            </div>
            
        </div>
    </div>
  )
}

export default CheckoutReviewItems