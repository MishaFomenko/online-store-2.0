'use client'
import { useState, useEffect, useRef } from 'react'
import ProductCard from '../components/productcard'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/usercontext'


export default function Page({ params }) {
    const [prodsByCat, setProdsByCat] = useState([]);
    const router = useRouter();
    const { user, setUser } = useUserContext();
    const prevUserRef = useRef(null);

    useEffect(() => {
        if (user === null) {
            try {
                prevUserRef.current = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`))
                setUser(prevUserRef.current)
            } catch { }
        }
        user === null && prevUserRef.current === null && router.push('/registration')
    })

    const fetchProdsByCat = async (action) => {
        const jdoc = await fetch(`./api/products?action=${action}&category=${params.category.toLowerCase()}`, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        const doc = await jdoc.json();
        return doc;
    }

    const handleBestSellers = async () => {
        const prods = await fetchProdsByCat('categorypage')
        setProdsByCat(prods);
    };


    useEffect(() => {
        if (prodsByCat.length === 0) {
            handleBestSellers()
        }
    })

    return (
        <>
            <div className='flex flex-wrap'>
                {prodsByCat.length !== 0 && prodsByCat.map((item) => <ProductCard key={item.asin} item={item} />)}
            </div>
        </>
    )
}