'use client';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyCoGURJeUWdIylWkAEDYEpOqY6YnAaJYy0",
    authDomain: "onlinestore-2.firebaseapp.com",
    projectId: "onlinestore-2",
    storageBucket: "onlinestore-2.appspot.com",
    messagingSenderId: "741302016722",
    appId: "1:741302016722:web:5a23b4f35c3cff76c62b0b",
    measurementId: "G-W6DG7SC029",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    let prevUser = undefined;
    try {
        prevUser = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}:[DEFAULT]`));
    } catch {
        console.log('Unable to log sessionStorage on the server');
    };

    const [user, setUser] = useState(prevUser);
    const [userData, setUserData] = useState({});


    return (
        <UserContext.Provider value={{ user, setUser, userData, setUserData, auth, db }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);

