'use client'
import ProductCard from './productcard'
import { useEffect, useState } from 'react'




export default function Shop() {
    const [bs, setBs] = useState([]);
    const fetchBests = async (action) => {
        const jdoc = await fetch(`./api/products?action=${action}`, {
            method: 'GET',
            'Content-Type': 'application/json',
        })
        const doc = await jdoc.json();
        return doc;
    }

    const handleBestSellers = async () => {
        const bests = await fetchBests('homepage')
        setBs(bests);
    };


    useEffect(() => {
        if (bs.length === 0) {
            handleBestSellers()
        }
    })

    return (
        <>
            <div className='h-16 bg-blue-400 flex items-center p-6'>Best Sellers</div>
            <div className='flex flex-wrap'>
                {bs.length !== 0 && bs.map((item) => <ProductCard key={item.asin} item={item} />)}
            </div>
            <div className='h-16 bg-blue-400 flex items-center p-6'>Suggested for you</div>
            <div className='flex flex-wrap'>
                {bs.length !== 0 && bs.map((item) => <ProductCard key={item.asin} item={item} />)}
            </div>
        </>
    )
}
