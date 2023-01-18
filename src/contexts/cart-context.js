import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducers/reducer.util";

const addCartItem = (cartItems, productToAdd) => {

    const availableProduct = cartItems.find(product => product.id === productToAdd.id);

    if (availableProduct) {
        return cartItems.map(
            product => product.id === productToAdd.id ?
                { ...product, quantity: product.quantity + 1 } : product
        )
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];

};

export const CART_ACTIONS = {
    SET_IS_OPEN: "SET_IS_OPEN",
    SET_CART_ITEM: "SET_CART_ITEM"
};

const cartReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS.SET_IS_OPEN:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case CART_ACTIONS.SET_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled action type ${type} in Cart Reducer`);
    }

};

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

const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0
}

export const CartProvicer = ({ children }) => {

    const [{ isOpen, cartItems, cartCount, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    };

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = clearCartItem(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    };

    const updateCartItemReducer = (newCartItems) => {

        const newCartCount = getProductCountInCart(newCartItems);
        const newTotalPrice = getTotalPrice(newCartItems);

        dispatch(createAction(CART_ACTIONS.SET_CART_ITEM, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            totalPrice: newTotalPrice
        }))
    };

    const setIsOpen = () => dispatch(createAction(CART_ACTIONS.SET_IS_OPEN));

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