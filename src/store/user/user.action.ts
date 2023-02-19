import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.util";
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducers/reducer.util";

import { USER_ACTION_TYPES } from "./user.types";


type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string; password: string; }>;

type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;

type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string; password: string; displayName: string; }>;

type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user: UserData; additionalInfo: AdditionalInfo }>;

type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;

type SignOut = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;


const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

const signInSuccess = withMatcher((user: UserData): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }));

const signUpSuccess = withMatcher((user: UserData, additionalInfo: AdditionalInfo): SignUpSuccess => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInfo }));

const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));

const signOut = withMatcher((): SignOut => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));

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