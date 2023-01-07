import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {

    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.id]: action.value
            };
        case "SET_DATA":
            return action.initialState;
        default:
            return state;
    };

};

const useForm = (initialFormState) => {

    const [formState, dispatcher] = useReducer(formReducer, initialFormState);

    const onInputHandler = useCallback((id, value) => {
        dispatcher({ type: "INPUT_CHANGE", id, value })
    }, []);

    const onSetFormData = useCallback((initialState) => {
        dispatcher({ type: "SET_DATA", initialState })
    }, []);

    return [formState, onInputHandler, onSetFormData];

};

export default useForm;