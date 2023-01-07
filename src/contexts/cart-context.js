import { createContext, useState } from "react";

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => { }
});

export const CartProvicer = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <CartContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
};