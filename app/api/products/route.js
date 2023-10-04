import { initializeApp } from "firebase/app";
import { NextResponse } from 'next/server'
import { getDocs, getDoc, doc, collection, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const algoliasearch = require('algoliasearch')


const ALGOLIA_INDEX_NAME = 'products';
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);



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

    try {
        if (action === 'homepage') {

            const allData = await getDocs(collection(db, 'store'));
            const bests = [];
            const promises = allData.docs.map(async (document) => {
                const bestSellers = await getDocs(query(collection(db, 'store', document.id, 'searchProductDetails'), where('productRating', '==', '5.0 out of 5 stars')));
                const bestSellerPromises = bestSellers.docs.map(async (best) => {
                    const bestData = await best.data();
                    bests.push(bestData);
                });
                await Promise.all(bestSellerPromises);
            });
            await Promise.all(promises);
            return NextResponse.json(bests)

        } else if (action === 'categorypage') {

            const category = currentURL.searchParams.get('category');
            const prods = [];
            if (category === 'men' || category === 'women') {
                const searchParams = {
                    hitsPerPage: 50,
                    attributesToRetrieve: [
                        'asin',
                        'deliveryMessage',
                        'imgUrl',
                        'price',
                        'productDescription',
                    ],
                };
                const prodsByCat = await index.search(category, searchParams)
                    .then(({ hits }) => {
                        return hits
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                return NextResponse.json(prodsByCat)
            } else {
                const docData = await getDocs(collection(db, 'store', category, 'searchProductDetails'));
                const prodsPromises = docData.docs.map(async (item) => {
                    const prodData = await item.data();
                    prods.push(prodData)
                });
                await Promise.all(prodsPromises);
                return NextResponse.json(prods)
            }
        } else if (action === 'keywordsearch') {
            const kw = currentURL.searchParams.get('kw');
            const searchParams = {
                hitsPerPage: 50,
                attributesToRetrieve: [
                    'asin',
                    'deliveryMessage',
                    'imgUrl',
                    'price',
                    'productDescription',
                ],
            };
            const prodsByKw = await index.search(kw, searchParams)
                .then(({ hits }) => {
                    return hits
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            return NextResponse.json(prodsByKw)
        }
    } catch (error) {
        return NextResponse.json(error)
    }



}