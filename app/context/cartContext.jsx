'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});
export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        try {
            const initJson = localStorage.getItem('cart');
            const initCart = JSON.parse(initJson);
            initCart && !cart.length && setCart(initCart);
        } catch {
            console.log('Unable to use localStorage on the server');
        };
        cart.length && localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, setCart])

    return (
        <CartContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);