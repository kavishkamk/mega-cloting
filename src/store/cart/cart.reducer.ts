import { AnyAction } from "redux";

import { setIsOpen, setItemToCart } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
    readonly isOpen: boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE: CartState = {
    isOpen: false,
    cartItems: []
}


export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {

    if (setIsOpen.match(action)) {
        return {
            ...state,
            isOpen: action.payload
        };
    };

    if (setItemToCart.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    };


    return state;

};