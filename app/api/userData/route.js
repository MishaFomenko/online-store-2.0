import { initializeApp } from "firebase/app";
import { NextResponse } from 'next/server'
import { doc, collection, getDoc, getDocs, setDoc, updateDoc, addDoc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { PurchasesByUser, PurchaseRecords } from '../../utils/customClasses';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
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
    const action = currentURL.searchParams.get('action');
    const col = currentURL.searchParams.get('collection');
    const document = currentURL.searchParams.get('document');
    try {
        if (action === 'getuser') {
            const docRef = doc(db, col, document);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            return NextResponse.json(userData, { status: 200 })
        }
        if (action === 'getpurchases') {
            const allData = await getDocs(collection(db, 'store'));
            const purchasesRef = collection(db, col);
            const q = query(purchasesRef, where('userID', '==', document));
            const querySnapshot = await getDocs(q);
            const records = new PurchasesByUser(querySnapshot);
            const showableRecords = await records.getProdsFromPurchaseRecords(allData, getDocs, query, collection, db, where);
            return NextResponse.json(showableRecords, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    const userData = await req.json();
    try {
        if (userData.action === "register") {
            await setDoc(doc(db, "userdata", userData.uid), userData.newUserData);
            return NextResponse.json('success', { status: 200 })
        };
        if (userData.action === "savePurchase") {
            const savablePurchase = new PurchaseRecords(userData);
            await savablePurchase.addPurchaseRecords(addDoc, collection, db);
            return NextResponse.json('success', { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(req) {
    const newData = await req.json();
    try {
        if (newData.field === 'First name') {
            const userRef = doc(db, "userdata", newData.uid);
            await updateDoc(userRef, {
                first: newData.newVal,
            });
        } else if (newData.field === 'Last name') {
            const userRef = doc(db, "userdata", newData.uid);
            await updateDoc(userRef, {
                last: newData.newVal,
            });
        } else if (newData.field === 'Gender') {
            const userRef = doc(db, "userdata", newData.uid);
            await updateDoc(userRef, {
                gender: newData.newVal,
            });
        } else if (newData.field === 'Date of birth') {
            const userRef = doc(db, "userdata", newData.uid);
            await updateDoc(userRef, {
                date: newData.newVal,
            });
        }
        return NextResponse.json('success', { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}