import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartIsOpen } from "../../store/cart/cart.selector";

import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";

import { setIsOpen } from "../../store/cart/cart.action";
import { signOut } from "../../store/user/user.action";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

const Navigation = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const isOpen = useSelector(selectCartIsOpen);

    const signOutHandler = () => dispatch(signOut());


    const toggleCartisOpen = () => {
        dispatch(setIsOpen(!isOpen));
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop" >Shop</NavLink>
                    {
                        currentUser ? (
                            <NavLink as="span" onClick={signOutHandler}>SIGNOUT</NavLink>
                        ) : (
                            <NavLink to="/auth" >Sign In</NavLink>
                        )
                    }
                    <CartIcon onClick={toggleCartisOpen} />
                </NavLinks>
                {
                    isOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>);
};

export default Navigation;