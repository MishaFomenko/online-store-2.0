'use client'
import { createContext, useContext, useState } from 'react'


const CartContext = createContext({});
export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);


    return (
        <CartContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);

