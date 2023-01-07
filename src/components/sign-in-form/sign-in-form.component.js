import React from "react";

import useForm from "../../hooks/form-hook";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import InputField from "../input/input-field.component";

import "./sign-in-form.styles.scss";

const initialFormState = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const [formState, onInputHandler, onSetFormData] = useForm(initialFormState);

    const onSubmitHandler = async event => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(formState.email, formState.password);
            console.log(response);
            onSetFormData(initialFormState);
        } catch (err) {
            if (err.code === "auth/wrong-password") {
                alert("incorrect password");
            }
            else if (err.code === "auth/user-not-found") {
                alert("No user assosiate with this email")
            } else {
                console.log(err)
            }
        }
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    required={true}
                    onInput={onInputHandler}
                />
                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    required={true}
                    onInput={onInputHandler}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;