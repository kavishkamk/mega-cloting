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

const removeCartItem = (cartItems, productToRemove) => {

    const availableProduct = cartItems.find(product => product.id === productToRemove.id);

    if (availableProduct.quantity === 1) {
        return cartItems.filter(product => product.id !== productToRemove.id);
    };

    return cartItems.map(
        product => product.id === productToRemove.id ?
            { ...product, quantity: product.quantity - 1 } : product
    );

};

const getProductCountInCart = (cartItems) => {
    return cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
};

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(product => product.id !== productToRemove.id);
};

const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, currentItem) => total + (currentItem.quantity * currentItem.price), 0)
}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    totalPrice: 0
});

export const CartProvicer = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartCount(getProductCountInCart(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setTotalPrice(getTotalPrice(cartItems));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    };

    return (
        <CartContext.Provider value={
            {
                isOpen,
                setIsOpen,
                cartItems,
                addItemToCart,
                cartCount,
                removeItemFromCart,
                clearItemFromCart,
                totalPrice
            }
        }
        >
            {children}
        </CartContext.Provider>
    );
};