import React from "react";

import useForm from "../../hooks/form-hook";
import { createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import InputField from "../input/input-field.component";

import { ButtonContainer, SignUpContainer } from "./sign-in-form.styles";

const initialFormState = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const [formState, onInputHandler, onSetFormData] = useForm(initialFormState);

    const onSubmitHandler = async event => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(formState.email, formState.password);
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
        await signInWithGooglePopup();
    };

    return (
        <SignUpContainer>
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
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
                </ButtonContainer>
            </form>
        </SignUpContainer>
    );
};

export default SignInForm;