import { createSelector } from "reselect";

import { RootState } from "../store";

import { CartState } from "./cart.reducer";

const selectCartReducer = (store: RootState): CartState => store.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, currentItem) => total + (currentItem.quantity * currentItem.price), 0)
);