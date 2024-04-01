import React from 'react'

const CheckoutItem = (props) => {
  const {name, image,color} = props.item;
  return (
    <div className='checkoutitem'>
        <img src={`data:image/png;base64, ${image}`} alt='product' />
        <h1>{name}</h1>
        <h3>Clour : {color}</h3>
        <h3>In Stock</h3>
        <h2>Estimated delivery :</h2>
        <h2>Monday — Standard Delivery</h2>
    </div>
  )
}

export default CheckoutItem