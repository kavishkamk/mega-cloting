import { useEffect, createContext, useReducer } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.util";
import { createAction } from "../utils/reducers/reducer.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in User Reducer`);
    };

};

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({ children }) => {

    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            console.log(user)
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};