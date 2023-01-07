import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user-context";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.util";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
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
                </div>
            </div>
            <Outlet />
        </Fragment>);
};

export default Navigation;