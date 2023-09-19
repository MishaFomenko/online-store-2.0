import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from 'next/server'
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";




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
const auth = getAuth(app);


export async function POST(req) {
    const data = await req.json();

    let user;

    if (data.page==="register") {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        user = userCredential.user;
        await setDoc(doc(db, "userdata", user.uid), data.newUserData);
    };
    if (data.page==="signin") {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
        user = userCredential.user;
        
    }

        return NextResponse.json( user )
}