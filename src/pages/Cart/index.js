import CartItem from '../../components/CartItem'
import { useStoreContext } from '../../context'
import './Cart.css'

const Cart = () => {
  const { cartItems } = useStoreContext()

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Your cart is empty</h3>
      </div>
    )
  }

  return (
    <div>
      {cartItems.map(item => {
        return <CartItem item={item} key={item.id} />
      })}
      <div className="cart-total">
        <h3>Total ({cartItems.reduce((total, item) => total + item.order_qty, 0)} items): INR {cartItems.reduce((acc, item) => acc + (item.price * item.order_qty), 0)}</h3>
      </div>
    </div>
  )
}

export default Cart