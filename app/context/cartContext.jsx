'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext({});
export const CartContextProvider = ({ children }) => {
    let reload = useRef(true);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        try {
            const initJson = localStorage.getItem('cart');
            const initCart = JSON.parse(initJson);
            initCart && reload.current && setCart(initCart);
            reload.current = false;
        } catch {
            console.log('Unable to use localStorage on the server');
        };
        !reload.current && localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, setCart]);

    return (
        <CartContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);