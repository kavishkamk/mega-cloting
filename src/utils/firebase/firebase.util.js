// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBt1jligOy2VebxljmeXGqU5zgpcjargc4",
    authDomain: "mega-clothing.firebaseapp.com",
    projectId: "mega-clothing",
    storageBucket: "mega-clothing.appspot.com",
    messagingSenderId: "578004889272",
    appId: "1:578004889272:web:b8113f1f0264cc7431ce4d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const firestore = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    const docRef = doc(firestore, "users", userAuth.uid);
    const docSnap = await getDoc(docRef);
    console.log(docRef);
    console.log(docSnap);

    if (!docSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(docRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (err) {
            console.log("error creating user" + err);
        }
    };
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)