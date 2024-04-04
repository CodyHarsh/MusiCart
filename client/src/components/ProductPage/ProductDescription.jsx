import React, {useContext} from 'react'
import "../../css/Product/ProductDescription.css"
import Reviews from './Reviews'
import PriceType from './PriceType'
import ProductAbout from './ProductAbout'
import BrandAvail from './BrandAvail'
import ProductButtons from './ProductButtons'
import GlobalContext from '../../context/GlobalContext'
import LoginToBuy from './LoginToBuy'

const ProductDescription = (props) => {
  const product = props.item;
  const {isAuthenticated} = useContext(GlobalContext);
  
  return (
    <div className='productdescription'>
        <h2 className='productdescriptiontitle'>{product.productName}{" ("}{product.color}{")"}</h2>
        <Reviews rating={product.ratingStar} reviews={product.customerReviews} />
        <PriceType type={product.headphoneType} price={product.price} color={product.color} />
        <ProductAbout about={product.productDescription}/>
        <BrandAvail brand={product.brandName} stock={product.customerReviews}/>
        {isAuthenticated ? <ProductButtons id={product._id}/> : <LoginToBuy/>}
    </div>
  )
}

export default ProductDescription