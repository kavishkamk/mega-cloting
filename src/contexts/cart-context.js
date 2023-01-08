import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const availableProduct = cartItems.find(product => product.id === productToAdd.id);

    if (availableProduct) {
        return cartItems.map(
            product => product.id === productToAdd.id ?
                { ...product, quantity: product.quantity + 1 } : product
        )
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];

}

const getProductCountInCart = (cartItems) => {
    return cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
});

export const CartProvicer = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(getProductCountInCart(cartItems));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    return (
        <CartContext.Provider value={{ isOpen, setIsOpen, cartItems, addItemToCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};