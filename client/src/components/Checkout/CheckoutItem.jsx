import React, { useEffect } from 'react'

const CheckoutItem = ({color, productName, handleUpdatedName, imageLink}) => {
 
 
  return (
    <div onClick={() => handleUpdatedName(color, productName)}  className='checkoutitem'>
        <img src={imageLink} alt='product' />
    </div>
  )
}

export default CheckoutItem