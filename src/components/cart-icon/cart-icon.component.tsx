
import { FC, MouseEventHandler } from "react";

import { useSelector } from "react-redux";

import { selectCartCount } from "../../store/cart/cart.selector";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

type CartIconProps = {
    onClick: MouseEventHandler<HTMLDivElement>;
};

const CartIcon: FC<CartIconProps> = ({ onClick }) => {

    const cartCount = useSelector(selectCartCount);

    return (
        <CartIconContainer onClick={onClick}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;