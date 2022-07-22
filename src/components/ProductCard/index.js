import { useEffect, useState } from "react"
import { useStoreContext } from "../../context"
import "./ProductCard.css"

const ProductCard = ({ item }) => {
    const [count, setCount] = useState(0)
    const { cartItems, addToCart, removeFromCart } = useStoreContext()
    const [itemInCart, setItemInCart] = useState()

    useEffect(() => {
        setItemInCart(cartItems.find(cartItem => cartItem.id === item.id))
        // eslint-disable-next-line
    },[cartItems])

  return (
    <div className="product-card">
        <div className="product-img">
            <img src={item.imageURL} alt={item.name} />
        </div>
        <div className="product-info">
            <div className="product-name">{item.name}</div>
            {itemInCart?.order_qty === item.quantity && <div className="extra-info">Maximum order quantity reached!</div>}
            {item.quantity === 0 && <div className="extra-info">Out of Stock</div>}
            {itemInCart?.order_qty !== item.quantity && item.quantity === 1 && <div className="extra-info">Hurry, only 1 left!</div>}
            <div className="other-info">
                <div className="product-price">
                    <div className="currency">{item.currency}</div>
                    <div className="price">{item.price}</div>
                </div>
                {/* Do something to not change buttons if order qty is equal to total qty */}
                {count > 0 ? (
                    <div className="cart-btn">
                        <button className="icon-btn" onClick={() => {
                            removeFromCart(item)
                            setCount(count - 1 < 0 ? 0 : count - 1)
                        }}><img src="assets/bxs-minus-circle.svg" alt="" /></button>
                        <div className="cart-btn-count">{count}</div>
                        <button className="icon-btn" disabled={ itemInCart?.order_qty === item.quantity } onClick={() => {
                            addToCart(item, 1)
                            setCount(count + 1 > item.quantity ? item.quantity : count + 1)
                        }}><img src="assets/bxs-plus-circle.svg" alt="" /></button>
                    </div>
                ) : <button className="add-to-cart" disabled={ itemInCart?.order_qty === item.quantity || item.quantity === 0 } onClick={() => {
                        addToCart(item, 1)
                        setCount(count + 1 > item.quantity ? item.quantity : count + 1)
                    }}>Add to Cart</button>}
            </div>
        </div>
    </div>
  )
}

export default ProductCard