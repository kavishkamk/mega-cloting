import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";

import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInfo
} from "../../utils/firebase/firebase.util";

import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSuccess,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";

function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
    try {
        const userSnap = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo);

        if (userSnap) {
            yield* put(signInSuccess({ id: userSnap.id, ...userSnap.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error))
    };
};

function* googleSignIn() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

function* emailSignIn({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);

        if (userCredential) {
            yield* call(getSnapshotFromUserAuth, userCredential.user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
};

function* signUpWithEmailAndPassword({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);

        if (userCredential) {
            yield* put(signUpSuccess(userCredential.user, { displayName }));
        }

    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
};

function* signInAfterSignUp({ payload: { user, additionalInfo } }: SignUpSuccess) {
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalInfo);
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
};

function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    };
};

function* onGoogleSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
};

function* onEmailSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
};

function* onSignUpWithEmailAndPassword() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmailAndPassword);
};

function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
};

function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* userSaga() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call(onSignUpSuccess),
        call(onSignUpWithEmailAndPassword),
        call(onSignOut)
    ]);
};