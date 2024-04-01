import React, {useContext} from 'react'
import CartContext from '../../context/CartContext'
import {useNavigate} from 'react-router-dom'

const ProductButtons = (props) => {
  const navigate = useNavigate();
  const {addToCart} = useContext(CartContext);
  return (
    <div className='buttons'>
        <button onClick={()=>addToCart(props.id)} className='addtocart'>Add to Cart</button>
        <button onClick={()=> navigate(`/checkout/${props.id}`)} className='buynow'>Buy Now</button>
    </div>
  )
}

export default ProductButtons