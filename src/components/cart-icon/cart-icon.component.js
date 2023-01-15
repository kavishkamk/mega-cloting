import { useContext } from "react";

import { CartContext } from "../../contexts/cart-context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = ({ onClick }) => {

    const { cartCount } = useContext(CartContext);

    return (
        <CartIconContainer onClick={onClick}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;