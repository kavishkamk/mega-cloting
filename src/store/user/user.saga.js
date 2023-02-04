import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from "../../utils/firebase/firebase.util";

import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";

function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnap = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        yield put(signInSuccess({ id: userSnap.id, ...userSnap.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    };
};

function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error))
    };
};

function* googleSignIn() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    };
};

function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
};

function* signUpWithEmailAndPassword({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));

    } catch (error) {
        yield put(signUpFailed(error));
    }
};

function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
    try {
        yield call(getSnapshotFromUserAuth, user, additionalInfo);
    } catch (error) {
        yield put(signInFailed(error))
    }
};

function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    };
};

function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
};

function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
};

function* onSignUpWithEmailAndPassword() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmailAndPassword);
};

function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
};

function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call(onSignUpSuccess),
        call(onSignUpWithEmailAndPassword),
        call(onSignOut)
    ]);
};