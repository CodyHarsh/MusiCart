import React, {useContext} from 'react'
import CartContext from '../../context/CartContext';

const CartItem = (props) => {
    const {_id, name, color, price, image, quantity} = props.item;
    const {updateQuantity} = useContext(CartContext);

    const handleUpdateQuantity = (e) =>{
        updateQuantity(_id, e.target.value);
    }
  return (
    <div className='cartitem'>
        <div className='cartitemimage'>
            <img src={`data:image/png;base64, ${image}`} alt='product' />
        </div>
        <div className='cartiteminfo'>
            <h3>{name}</h3>
            <p>Clour : {color}</p>
            <p>In Stock</p>
        </div>
        <div className='cartitemprice'>
        <h3>Price</h3>
            ₹{price}
        </div>
        <div className='cartitemquantity'>
            <h3>Quantity</h3>
            <select onChange={handleUpdateQuantity} defaultValue={quantity}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
            </select>
        </div>
        <div className='cartitemtotal'>
            <h3>Total</h3>
            ₹{price * quantity}
        </div>
    </div>
  )
}

export default CartItem