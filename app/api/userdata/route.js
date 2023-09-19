import { initializeApp } from "firebase/app";
import { NextResponse } from 'next/server'
import { doc, getDoc } from "firebase/firestore";
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

export async function POST(req) {
    const data = await req.json();

    let userData;

    if (data.action === 'getuser') {
        const docRef = doc(db, data.collection, data.document);
        const docSnap = await getDoc(docRef);
        userData = docSnap.data();

    }

        return NextResponse.json( userData )
}