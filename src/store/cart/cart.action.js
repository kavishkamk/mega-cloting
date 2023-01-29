import { createAction } from "../../utils/reducers/reducer.util";
import { CART_ACTIONS } from "./cart.types";

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

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(product => product.id !== productToRemove.id);
}

export const setIsOpen = isOpen => createAction(CART_ACTIONS.SET_IS_OPEN, !isOpen);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTIONS.SET_CART_ITEM, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEM, newCartItems);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEM, newCartItems);
};