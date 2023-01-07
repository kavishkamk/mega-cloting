import { useEffect, useState, createContext } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

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