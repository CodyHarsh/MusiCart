import React from 'react'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const Reviews = (props) => {
  const ratings = props.rating;
  return (
    <div className='reviews'>
        {ratings >= 1 ? <IoIosStar className='star' /> : <IoIosStarOutline className='star' />}
        {ratings >= 2 ? <IoIosStar className='star' /> : <IoIosStarOutline className='star' />}
        {ratings >= 3 ? <IoIosStar className='star' /> : <IoIosStarOutline className='star' />}
        {ratings >= 4 ? <IoIosStar className='star' /> : <IoIosStarOutline className='star' />}
        {ratings >= 5 ? <IoIosStar className='star' /> : <IoIosStarOutline className='star' />}
        <span className='reviewscount'>({props.reviews} Customer reviews)</span>
    </div>
  )
}

export default Reviews