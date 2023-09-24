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

export async function GET(req) {
    const currentURL = new URL(req.url);
    console.log(currentURL)
    const action = currentURL.searchParams.get('action');
    console.log(action)
    const collection = currentURL.searchParams.get('collection');
    const document = currentURL.searchParams.get('document');
    try {
        if (action === 'getdocument') {
            const docRef = doc(db, collection, document);
            const docSnap = await getDoc(docRef);
            const products = docSnap.data();
            const ratings = products.searchProductDetails.map(item=>item.prime)
            return NextResponse.json( products )
        }
    } catch(error) {
        return NextResponse.json( error )
    }
    

        
}