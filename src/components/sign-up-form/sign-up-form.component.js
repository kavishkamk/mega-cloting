import React from "react";

import useForm from "../../hooks/form-hook";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import InputField from "../input/input-field.component";

import { SignUpContainer } from "./sign-up-form.styles";

const initialFormState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {

    const [formState, onInputHandler, onSetFormData] = useForm(initialFormState);

    const onSubmitHandler = async event => {
        event.preventDefault();

        if (formState.password !== formState.confirmPassword) {
            alert("password not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(formState.email, formState.password);
            createUserDocumentFromAuth(user, { displayName: formState.displayName });
            onSetFormData(initialFormState);
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                alert("canno't create user. Email already in use")
            } else {
                console.log(err)
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <InputField
                    id="displayName"
                    label="Display Name"
                    type="text"
                    required={true}
                    onInput={onInputHandler}
                />
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
                <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required={true}
                    onInput={onInputHandler}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;