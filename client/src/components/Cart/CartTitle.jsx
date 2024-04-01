import React from 'react'
import { PiBag } from "react-icons/pi";

const CartTitle = () => {
  return (
    <div className='title'>
        <PiBag className='bagicon' />
        <span className='text'>My Cart</span>
    </div>
  )
}

export default CartTitle