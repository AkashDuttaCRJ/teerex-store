import { useState } from "react"
import "./ProductCard.css"

const ProductCard = ({ counter = 0, imgSrc, name, currency, price, maxUnit = 5 }) => {
    const [count, setCount] = useState(counter)
  return (
    <div className="product-card">
        <div className="product-img">
            <img src={imgSrc} alt={name} />
        </div>
        <div className="product-info">
            <div className="product-name">{name}</div>
            {maxUnit === 0 && <div className="extra-info">Out of Stock</div>}
            {maxUnit === 1 && <div className="extra-info">Hurry, only 1 left!</div>}
            <div className="other-info">
                <div className="product-price">
                    <div className="currency">{currency}</div>
                    <div className="price">{price}</div>
                </div>
                <div className="cart-btn">
                    {count !== 0 ? <div className="op-btn-container">
                        <button className="op-btn" onClick={() => setCount(count - 1)}>-</button>
                        <div className="num-display">{count}</div>
                        <button className="op-btn" onClick={() => count < maxUnit && setCount(count + 1)}>+</button>
                    </div>:<button className="alt-btn" onClick={() => setCount(count + 1)} disabled={maxUnit === 0}>Add to Cart</button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard