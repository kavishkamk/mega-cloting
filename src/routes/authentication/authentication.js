import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { signInWithGooglePopup, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.util";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {

    // get previous state of auth
    // useEffect(() => {
    //     const resultHandleOfGoogleSignIn = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if (response) {
    //             await createUserDocumentFromAuth(response.user);
    //         }
    //     };
    //     resultHandleOfGoogleSignIn();
    // }, []);

    return (
        <AuthenticationContainer>
            {/* <button onClick={logGoogleUser}>SignIn with google</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>SignIn with google rederect</button> */}
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;