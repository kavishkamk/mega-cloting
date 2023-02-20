import React, { ChangeEvent, FC, InputHTMLAttributes, useEffect, useReducer } from "react";

import { FormInput, FormInputLabel, Group } from "./form-input.styles";

enum FormAction {
    CHANGE = "CHANGE"
};

type FormState = {
    readonly value: any
};

const formReducer = (state: FormState, action: any): FormState => {
    switch (action.type) {
        case FormAction.CHANGE:
            return {
                ...state,
                value: action.value
            }
        default:
            return state;
    };
};

type InputFieldProps = {
    label: string;
    onInput: (id: string | undefined, value: any) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: FC<InputFieldProps> = props => {

    const [inputStatus, dispatcher] = useReducer(formReducer, { value: props.value || "" } as FormState);

    const changeHandleEvent = (event: ChangeEvent<HTMLInputElement>) => {
        dispatcher({ type: "CHANGE", value: event.target.value });
    };

    const { id, onInput } = props;
    const { value } = inputStatus;

    useEffect(() => {
        onInput(id, value);
    }, [id, onInput, value]);

    return (
        <Group>
            <FormInput
                id={props.id}
                type={props.type}
                required={props.required}
                onChange={changeHandleEvent}
                value={inputStatus.value}
            />
            {props.label &&
                (
                    <FormInputLabel
                        htmlFor={props.id}
                        shrink={Boolean(inputStatus.value || "")}
                    >
                        {props.label}
                    </FormInputLabel>
                )
            }
        </Group>
    );
}

export default InputField;