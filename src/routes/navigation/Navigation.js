import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";

import { signOutUser } from "../../utils/firebase/firebase.util";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

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
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop" >Shop</Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGNOUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth" >Sign In</Link>
                        )
                    }
                    <CartIcon onClick={toggleCartisOpen} />
                </div>
                {
                    isOpen && <CartDropdown />
                }
            </div>
            <Outlet />
        </Fragment>);
};

export default Navigation;