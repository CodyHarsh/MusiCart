import React from 'react'
import CheckoutItem from './CheckoutItem'

const CheckoutReviewItems = (props) => {
  const {cart} = props;
  return (
    <div className='leftitem'>
        <div className='ll'>
            3. Review items and delivery
       </div>
       <div className='lr citems'>
            {cart.map((item, index) => {
              return <CheckoutItem key={index} item={item} />
            })}
        </div>
    </div>
  )
}

export default CheckoutReviewItems