import { CategoryItem } from "../category/categories.types";

export enum CART_ACTIONS {
    SET_IS_OPEN = "cart/SET_IS_OPEN",
    SET_CART_ITEM = "cart/SET_CART_ITEM"
};

export type CartItem = CategoryItem & {
    quantity: number;
};