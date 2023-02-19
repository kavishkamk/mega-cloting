import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducers/reducer.util";

import { CategoryItem } from "../category/categories.types";
import { CartItem, CART_ACTIONS } from "./cart.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {

    const availableProduct = cartItems.find(product => product.id === productToAdd.id);

    if (availableProduct) {
        return cartItems.map(
            product => product.id === productToAdd.id ?
                { ...product, quantity: product.quantity + 1 } : product
        )
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];

};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {

    const availableProduct = cartItems.find(product => product.id === productToRemove.id);

    if (availableProduct!.quantity === 1) {
        return cartItems.filter(product => product.id !== productToRemove.id);
    };

    return cartItems.map(
        product => product.id === productToRemove.id ?
            { ...product, quantity: product.quantity - 1 } : product
    );

};

const clearCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    return cartItems.filter(product => product.id !== productToRemove.id);
}


export type SetIsOpen = ActionWithPayload<CART_ACTIONS.SET_IS_OPEN, boolean>;

export type SetItemToCart = ActionWithPayload<CART_ACTIONS.SET_CART_ITEM, CartItem[]>;


export const setIsOpen = withMatcher(
    (isOpen: boolean): SetIsOpen => createAction(CART_ACTIONS.SET_IS_OPEN, isOpen)
);

export const setItemToCart = withMatcher(
    (cartItems: CartItem[]): SetItemToCart =>
        createAction(CART_ACTIONS.SET_CART_ITEM, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetItemToCart => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setItemToCart(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): SetItemToCart => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setItemToCart(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): SetItemToCart => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    return setItemToCart(newCartItems);
};