import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../contexts/cart-context";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {

    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </div>
    );
};

export default CartDropdown;