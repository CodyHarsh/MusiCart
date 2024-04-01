import React from 'react'
import {useNavigate} from 'react-router-dom'

const PlaceOrderWidget = (props) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    if(props.total === 0){
      navigate('/');
      return;
    }
    props.checkout();
    navigate('/success');
  }
  return (
    <div className='placeorderwidget'>
        <button onClick={handleCheckout}>Place your order</button>
        <p>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
        <hr />
        <h1>Order Summary</h1>
        <div className='orderrow'>
            <span>Items</span>
            <span>₹{props.total+45}.00</span>
        </div>
        <div className='orderrow'>
            <span>Delivery</span>
            <span>₹50.00</span>
        </div>
        <hr />
        <div className='orderrow'>
            <h1>Order Total</h1>
            <h1>₹{props.total+95}.00</h1>
        </div>
    </div>
  )
}

export default PlaceOrderWidget