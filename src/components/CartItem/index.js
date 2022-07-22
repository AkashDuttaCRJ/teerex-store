import { useEffect, useState } from 'react';
import { useStoreContext } from '../../context';
import './CartItem.css';

const CartItem = ({ item }) => {
    const [count, setCount] = useState(item.order_qty);
    const [itemInCart, setItemInCart] = useState();
    const { cartItems, addToCart, removeFromCart } = useStoreContext();

    useEffect(() => {
        setItemInCart(cartItems.find(cartItem => cartItem.id === item.id))
        // eslint-disable-next-line 
    },[cartItems])

  return (
    <div className='cart-item-container'>
        <img src={item.imageURL} alt={item.name} />
        <div className='cart-item-details'>
            <h3>{item.name}</h3>
            <div className='cart-item-info'>
                <div className='cart-item-quantity'>Qty: <div className="cart-item-btn">
                        <button className="icon-btn" onClick={() => {
                            removeFromCart(item)
                            setCount(count - 1 < 0 ? 0 : count - 1)
                        }}><img src="assets/bxs-minus-circle.svg" alt="" /></button>
                        <div className="cart-btn-count">{count}</div>
                        <button className="icon-btn" disabled={ itemInCart?.order_qty === item.quantity } onClick={() => {
                            addToCart(item, 1)
                            setCount(count + 1 > item.quantity ? item.quantity : count + 1)
                        }}><img src="assets/bxs-plus-circle.svg" alt="" /></button>
                    </div></div>
                <p>Color: {item.color}</p>
                <p>Type: {item.type}</p>
            </div>
        </div>
        <p>{item.currency} {item.price}</p>
    </div>
  )
}

export default CartItem