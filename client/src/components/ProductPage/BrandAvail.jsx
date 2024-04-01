import React from 'react'

const BrandAvail = (props) => {
  return (
    <div className='brandavail'>
        <div className='price'>Available - <span className='details'>{props.stock>0?"In Stock":"Out of Stock"}</span></div>
        <div className='price'>Brand - <span className='details'>{props.brand}</span></div>
    </div>
  )
}

export default BrandAvail