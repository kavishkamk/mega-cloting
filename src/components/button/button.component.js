import { BaseButton, ButtonSpinner, GoogleSignInButton, invertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted"
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: invertedButton
    }[buttonType]
);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {

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