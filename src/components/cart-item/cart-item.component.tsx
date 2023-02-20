import { FC } from "react";

import { CartItem as CartItemType } from "../../store/cart/cart.types";

import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles";

type CartItemProps = {
    cartItem: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <span className="price">
                    {quantity} × ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;