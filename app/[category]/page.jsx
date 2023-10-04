'use client'
import { useState, useEffect } from 'react'
import ProductCard from '../components/productcard'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/userContext'
import { customGetter } from '../utils/fetchConstructor'

export default function Page({ params }) {
    const [prodsByCat, setProdsByCat] = useState([]);
    const router = useRouter();
    const { user } = useUserContext();

    const handleProdsByCat = async () => {
        const prodsByCatPath = './api/products';
        const action = 'categorypage';
        const prods = await customGetter(prodsByCatPath, action, null, null, params.category.toLowerCase());
        setProdsByCat(prods);
    };

    useEffect(() => {
        user === null && router.push('/registration')
        if (prodsByCat.length === 0) {
            handleProdsByCat()
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