
import React from 'react'
import Reviews from '../Reviews';
import BrandAvail from '../BrandAvail';
import ProductAbout from '../ProductAbout';
import PriceType from '../PriceType';

const MobileProductDetails = (props) => {
  const product = props.product;
  const {name, description,about, price, color, type, brand, rating, reviews, stock, _id} = props.product;
  return (
    <div className='mobileproductdetails productdescription'>
         <h2 className='productdescriptiontitle'>{product.productName}{" ("}{product.color}{")"}</h2>
         <Reviews rating={product.ratingStar} reviews={product.customerReviews} />
         <h5>
            {product.description}
         </h5>
         <PriceType type={product.headphoneType} price={product.price} color={product.color} />
        <ProductAbout about={product.productDescription}/>
        <BrandAvail brand={product.brandName} stock={product.available}/>
    </div>
  )
}

export default MobileProductDetails