import { FC, ButtonHTMLAttributes } from "react";

import { BaseButton, ButtonSpinner, GoogleSignInButton, invertedButton } from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
    base = "base",
    google = "google-sign-in",
    inverted = "inverted"
};

const getButton = (buttonType: BUTTON_TYPE_CLASSES = BUTTON_TYPE_CLASSES.base): typeof BaseButton => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: invertedButton
    }[buttonType]
);

type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {

    const CustomeButton = getButton(buttonType);

    return (
        <CustomeButton
            disabled={isLoading}
            {...otherProps}
        >
            {isLoading ? <ButtonSpinner /> : children}
        </CustomeButton>
    );
};

export default Button;