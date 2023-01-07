import React, { useEffect, useReducer } from "react";

import "./form-input.styles.scss";

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
        <div className="group">
            <input
                id={props.id}
                type={props.type}
                required={props.required}
                onChange={changeHandleEvent}
                value={inputStatus.value}
                className="form-input"
            />
            {props.label &&
                (
                    <label
                        htmlFor={props.id}
                        className={`${inputStatus.value ? "shrink" : ""} form-input-label`}
                    >
                        {props.label}
                    </label>
                )
            }
        </div>
    );
}

export default InputField;