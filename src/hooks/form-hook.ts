import { useCallback, useReducer } from "react";
import { ActionWithPayload, createAction } from "../utils/reducers/reducer.util";

enum FORM_STATE_TYPE {
    INPUT_CHANGE = "INPUT_CHANGE",
    SET_DATA = "SET_DATA"
};

type InputChangeAction = ActionWithPayload<FORM_STATE_TYPE.INPUT_CHANGE, { id: string; value: any }>;

type InputSetDataAction = ActionWithPayload<FORM_STATE_TYPE.SET_DATA, any>;


const inputChangeAction = (id: string, value: any): InputChangeAction => createAction(FORM_STATE_TYPE.INPUT_CHANGE, { id, value });

const inputSetDataAction = <T>(initialState: T): InputSetDataAction => createAction(FORM_STATE_TYPE.SET_DATA, initialState);

type ActionTypes = InputChangeAction | InputSetDataAction;

const formReducer = <T>(state: T, action: ActionTypes): T => {

    switch (action.type) {
        case FORM_STATE_TYPE.INPUT_CHANGE:
            return {
                ...state,
                [action.payload.id]: action.payload.value
            };
        case FORM_STATE_TYPE.SET_DATA:
            return action.payload.initialState;
        default:
            return state;
    };

};


const useForm = <T>(initialFormState: T) => {

    const [formState, dispatcher] = useReducer(formReducer, initialFormState);

    const onInputHandler = useCallback((id: string, value: any) => {
        dispatcher(inputChangeAction(id, value));
    }, []);

    const onSetFormData = useCallback((initialState: T) => {
        dispatcher(inputSetDataAction(initialState));
    }, []);

    return [formState as T, onInputHandler, onSetFormData];

};

export default useForm;