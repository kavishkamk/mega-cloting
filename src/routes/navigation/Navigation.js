import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";

import { signOutUser } from "../../utils/firebase/firebase.util";

import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isOpen, setIsOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    };

    const toggleCartisOpen = () => {
        setIsOpen(!isOpen);
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