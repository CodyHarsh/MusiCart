import React, { useEffect } from 'react'

const CheckoutItem = (props) => {
  const product = props.item.product;
  useEffect(() => {
    props.setProductIds((prev) => {
      return [...prev, product._id];
    })
  },[])
 
  return (
    <div className='checkoutitem'>
        <img src={product.imageLink} alt='product' />
    </div>
  )
}

export default CheckoutItem