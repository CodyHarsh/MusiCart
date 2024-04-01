import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'

const CartItems = (props) => {
  const { cart, total} = props;
  const [len, setLen] = useState(0);
  const findItems = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  }
  useEffect(() => {
    setLen(findItems());
  }, [cart]);
  return (
    <>
    <div className='cartitems'>
        <hr />
            {cart.map((item) => (
                <CartItem key={item._id} item={item} />
            ))}
        <hr />
        
    </div>
    <div className='carttotal'>
        <div className='carttotalleft'>
            {len} Item
        </div>
        <div className='carttotalright'>
            ₹{total}
        </div>
    </div>
    </>
  )
}

export default CartItems