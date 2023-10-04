'use client'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/productCard'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../context/userContext'
import { customGetter } from '../../utils/fetchConstructor'

export default function Page({ params }) {
    const [prodsByKw, setProdsByKw] = useState([]);
    const router = useRouter();
    const { user } = useUserContext();

    useEffect(() => {
        user === null && router.push('/registration')
    })

    const handleProdsByKw = async () => {
        const prodsByKwPath = '../api/products';
        const action = 'keywordsearch';
        const keyword = params.keyword.toLowerCase();
        const prods = await customGetter(prodsByKwPath, action, null, null, null, keyword);
        setProdsByKw(prods);
    };

    useEffect(() => {
        if (prodsByKw.length === 0) {
            handleProdsByKw()
        }
    })

    return (
        <>
            <div className='flex flex-wrap'>
                {prodsByKw.length !== 0 && prodsByKw.map((item) =>
                    <ProductCard key={item.asin} item={item} />)
                }
            </div>
        </>
    )
}