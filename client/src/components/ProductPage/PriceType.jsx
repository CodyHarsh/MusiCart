import React from 'react'

const PriceType = (props) => {
  return (
    <div className='pricetype'>
        <div className='price'>Price - ₹ {props.price}</div>
        <div className='type'>{props.color} | {props.type}</div>
    </div>
  )
}

export default PriceType