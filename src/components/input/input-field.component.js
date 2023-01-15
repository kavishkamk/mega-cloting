import React, { useEffect, useReducer } from "react";

import { FormInput, FormInputLabel, Group } from "./form-input.styles";

const formReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value
            }
        default:
            return state;
    };
};

const InputField = props => {

    const [inputStatus, dispatcher] = useReducer(formReducer, { value: props.value || "" });

    const changeHandleEvent = event => {
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
                        shrink={inputStatus.value ? "shrink" : ""}
                    >
                        {props.label}
                    </FormInputLabel>
                )
            }
        </Group>
    );
}

export default InputField;