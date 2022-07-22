import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

const ContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const addToCart = (item, quantity) => {
        // if item already exists in cart, update quantity
        const itemInCart = cartItems.find(
            cartItem => cartItem.id === item.id
        );
        if (itemInCart) {
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    cartItem.order_qty + quantity <= cartItem.quantity && setTotalProducts(prevValue => prevValue + quantity);
                    return { ...cartItem, order_qty: cartItem.order_qty + quantity > cartItem.quantity ? cartItem.quantity : cartItem.order_qty + quantity };
                }
                return cartItem;
            });
            setCartItems(updatedCartItems);
        } else {
            setTotalProducts(prevValue => prevValue + quantity);
            setCartItems([...cartItems, { ...item, order_qty: quantity }]);
        }
    }

    const removeFromCart = (item) => {
        // if item already exists in cart, update quantity by subtracting 1
        // if quantity is 1, remove item from cart
        const itemInCart = cartItems.find(
            cartItem => cartItem.id === item.id
        );
        if (itemInCart.order_qty === 1) {
            const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
            setCartItems(updatedCartItems);
        } else {
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    return { ...cartItem, order_qty: cartItem.order_qty - 1 };
                }
                return cartItem;
            });
            setCartItems(updatedCartItems);
        }
        setTotalProducts(prevValue => prevValue - 1);
    }
        
    return (
        <StoreContext.Provider value={{cartItems, addToCart, removeFromCart, totalProducts}}>
            {children}
        </StoreContext.Provider>
    )}

export default ContextProvider

export const useStoreContext = () => useContext(StoreContext);