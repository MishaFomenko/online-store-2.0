'use client';
import ProductCard from './productCard';
import { useEffect, useState } from 'react';
import { customGetter } from '../utils/fetchConstructor';
import useSWR from 'swr';

export default function Shop() {
    const [bs, setBs] = useState([]);

    const bestsPath = './api/products';
    const bestsAction = 'homepage';
    const bestsRequestPath = `${bestsPath}?action=${bestsAction}`;
    const { data, error, isLoading } = useSWR(bestsRequestPath, customGetter);

    useEffect(() => {
        !isLoading && setBs(data);
    }, [data, isLoading]);

    return (
        <>
            <div className='h-16 bg-blue-400 flex items-center p-6'>Best Sellers</div>
            <div className='flex flex-wrap'>
                {!isLoading && bs.map((item) => <ProductCard key={item.asin} item={item} />)}
            </div>
            <div className='h-16 bg-blue-400 flex items-center p-6'>Suggested for you</div>
            <div className='flex flex-wrap'>
                {!isLoading && bs.map((item) => <ProductCard key={item.asin} item={item} />)}
            </div>
        </>
    )
}
