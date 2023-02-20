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
    onAuthStateChanged,
    User,
    NextOrObserver
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from "firebase/firestore";

import { category } from "../../store/category/categories.types";

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

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(firestore, collectionKey);

    const batch = writeBatch(firestore);

    objectsToAdd.forEach(item => {
        const documentRef = doc(collectionRef, item.title.toLowerCase());
        batch.set(documentRef, item);
    });

    await batch.commit();
    console.log("done")

};

export const getCategoriesAndDocuments = async (): Promise<category[]> => {
    const collectionRef = collection(firestore, "categories");

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categories = querySnapshot.docs.map(docSnapShot => docSnapShot.data() as category);

    return categories;
};

export type AdditionalInfo = {
    displayName?: string;
};

export type UserData = {
    displayName: string;
    email: string;
    createdAt: Date;
};

export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as AdditionalInfo): Promise<void | QueryDocumentSnapshot<UserData>> => {
    const docRef = doc(firestore, "users", userAuth.uid);
    const docSnap = await getDoc(docRef);

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

    return docSnap as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    });
};