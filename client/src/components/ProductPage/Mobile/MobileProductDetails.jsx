import React from 'react'
import Reviews from '../Reviews';
import BrandAvail from '../BrandAvail';
import ProductAbout from '../ProductAbout';
import PriceType from '../PriceType';

const MobileProductDetails = (props) => {
    const {name, description,about, price, color, type, brand, rating, reviews, stock, _id} = props.product;
  return (
    <div className='mobileproductdetails productdescription'>
         <h2 className='productdescriptiontitle'>{name}{" ("}{color}{")"}</h2>
         <Reviews rating={rating} reviews={reviews} />
         <h5>
            {description}
         </h5>
         <PriceType type={type} price={price} color={color} />
        <ProductAbout about={about}/>
        <BrandAvail brand={brand} stock={stock}/>
    </div>
  )
}

export default MobileProductDetails