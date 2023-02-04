import { createAction } from "../../utils/reducers/reducer.util";

import { USER_ACTION_TYPES } from "./user.types";

const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });

const signUpSuccess = (user, additionalInfo) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInfo });

const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

const signOut = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export {
    setCurrentUser,
    checkUserSession,
    googleSignInStart,
    emailSignInStart,
    signInFailed,
    signInSuccess,
    signUpFailed,
    signUpStart,
    signUpSuccess,
    signOutFailed,
    signOutSuccess,
    signOut
};