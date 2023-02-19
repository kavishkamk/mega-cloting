import { AnyAction } from "redux";

import { UserData } from "../../utils/firebase/firebase.util";

import { checkUserSession, emailSignInStart, googleSignInStart, signInFailed, signInSuccess, signOut, signOutFailed, signOutSuccess, signUpFailed, signUpStart, signUpSuccess } from "./user.action";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {

    if (emailSignInStart.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (googleSignInStart.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (checkUserSession.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (signUpStart.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (signOut.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    };

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false
        };
    };

    if (signUpFailed.match(action) || signOutFailed.match(action) || signInFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    };

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null,
            isLoading: false
        };
    };

    if (signUpSuccess.match(action)) {
        return {
            ...state,
            isLoading: false
        };
    };

    return state;

};