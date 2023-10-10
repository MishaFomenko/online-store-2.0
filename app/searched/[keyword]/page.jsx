'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/userContext';
import { customGetter } from '../../utils/fetchConstructor';
import useSWR from 'swr';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/errorComponent';
import { useCustomRedirect } from '../customHooks';

export default function Page({ params }) {
    const [prodsByKw, setProdsByKw] = useState([]);
    const { user } = useUserContext();

    const prodsByKwPath = '../api/products';
    const prodsAction = 'keywordsearch';
    const prodsKeyword = params.keyword.toLowerCase();
    const prodsRequestPath = `${prodsByKwPath}?action=${prodsAction}&kw=${prodsKeyword}`;
    const { data, error, isLoading } = useSWR(prodsRequestPath, customGetter);

    useCustomRedirect('/signin', user);

    useEffect(() => {
        !isLoading && setProdsByKw(data);
    }, [data, isLoading]);

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
                        {!isLoading && prodsByKw.map((item) =>
                            <ProductCard key={item.asin} item={item} />)
                        }
                    </div>
            }
        </>
    );
};