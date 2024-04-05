import React, {useContext} from 'react'
import CartContext from '../../context/CartContext';
import { toast } from 'react-toastify';

const CartItem = (props) => {
    const product = props.item.product;
    const {total} = props;
    const prductQuantity = props.item.productQuantity;
    const {updateQuantity} = useContext(CartContext);
    const handleUpdateQuantity = (e) =>{
        let productId = product._id;
        let quantity = e.target.value;
        if(quantity > 8){
            toast.error("Cannot Add this Product Anymore");
        }
        updateQuantity(productId, quantity);
    }
  return (
    <div className='cartitem'>
        <div className='cartitemimage'>
            <img src={product.imageLink} alt='product' />
        </div>
        <div className='cartiteminfo'>
            <h3>{product.productName}</h3>
            <p>Color : {product.color}</p>
            <p>In Stock</p>
        </div>
        <div className='cartitemprice'>
        <h3>Price</h3>
            ₹{product.price}
        </div>
        <div className='cartitemquantity'>
            <h3>Quantity</h3>
            <select onChange={handleUpdateQuantity} defaultValue={prductQuantity}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
            </select>
        </div>
        <div className='cartitemtotal'>
            <h3>Total</h3>
            ₹{product.price * prductQuantity}
        </div>
    </div>
  )
}

export default CartItem