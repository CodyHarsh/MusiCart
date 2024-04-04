import React, { useEffect } from 'react'

const CheckoutItem = (props) => {
 
 
  return (
    <div className='checkoutitem'>
        <img src={props.imageLink} alt='product' />
    </div>
  )
}

export default CheckoutItem