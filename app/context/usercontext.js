'use client'
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyCoGURJeUWdIylWkAEDYEpOqY6YnAaJYy0",
    authDomain: "onlinestore-2.firebaseapp.com",
    projectId: "onlinestore-2",
    storageBucket: "onlinestore-2.appspot.com",
    messagingSenderId: "741302016722",
    appId: "1:741302016722:web:5a23b4f35c3cff76c62b0b",
    measurementId: "G-W6DG7SC029"
  };
  
  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const UserContext = createContext({});
export const UserContextProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null)
    const [page, setPage] = useState('');
    const [newUserData, setNewUserData] = useState({});

    const fetchUsers = async () => {
        if (email!=='' && password!=='') {
            const newU = await fetch('../api/userauthentication', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    page,
                    password,
                    email,
                    newUserData,
                })
            });
            const newUser = await newU.json();
            setUser(newUser)
        };
    }

    useEffect(() => {
        
        fetchUsers()

    }, [email, password])

    


    return (
        <UserContext.Provider value={{user, setUser, email, setEmail, password, setPassword, page, setPage, db, setNewUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);

