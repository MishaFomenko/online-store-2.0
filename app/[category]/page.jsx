'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../components/productCard';
// import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/userContext';
import { customGetter } from '../utils/fetchConstructor';
import useSWR from 'swr';
import Spinner from '../components/spinner';
import { useCustomRedirect } from '../customHooks';
import ErrorComponent from '../components/errorComponent';

export default function Page({ params }) {
    const [prodsByCat, setProdsByCat] = useState([]);
    const { user } = useUserContext();

    useCustomRedirect('/signin', user);

    const prodsByCatPath = './api/products';
    const action = 'categorypage';
    const requestPath = `${prodsByCatPath}?action=${action}&category=${params.category.toLowerCase()}`;
    const { data, error, isLoading } = useSWR(requestPath, customGetter);

    useEffect(() => {
        !isLoading && setProdsByCat(data);
    }, [setProdsByCat, data, isLoading]);

    return (
        <>
            {!isLoading && !data && error
                ?
                <ErrorComponent />
                :
                isLoading
                    ?
                    <div className='flex justify-center items-center h-screen'>
                        <Spinner />
                    </div>
                    :
                    <div className='flex flex-wrap'>
                        {prodsByCat.length !== 0 && prodsByCat.map((item) => <ProductCard key={item.asin} item={item} />)};
                    </div>
            }
        </>
    );
};