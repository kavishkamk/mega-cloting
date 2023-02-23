import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";

import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quentity, RemoveButton, Value } from "./checkout-item.styles";

type CartItemProps = {
    cartItem: CartItem;
};

const CheckoutItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quentity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={addItemHandler} >&#10095;</Arrow>
            </Quentity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
});

export default CheckoutItem;