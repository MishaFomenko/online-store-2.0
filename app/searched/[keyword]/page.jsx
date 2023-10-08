'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/userContext';
import { customGetter } from '../../utils/fetchConstructor';
import useSWR from 'swr';

export default function Page({ params }) {
    const [prodsByKw, setProdsByKw] = useState([]);
    const router = useRouter();
    const { user } = useUserContext();

    const prodsByKwPath = '../api/products';
    const prodsAction = 'keywordsearch';
    const prodsKeyword = params.keyword.toLowerCase();
    const prodsRequestPath = `${prodsByKwPath}?action=${prodsAction}&kw=${prodsKeyword}`;
    const { data, error, isLoading } = useSWR(prodsRequestPath, customGetter);

    useEffect(() => {
        user === null && router.push('/registration');
        !isLoading && setProdsByKw(data);
    }, [data, isLoading, router, user]);

    return (
        <>
            <div className='flex flex-wrap'>
                {!isLoading && prodsByKw.map((item) =>
                    <ProductCard key={item.asin} item={item} />)
                }
            </div>
        </>
    );
};