'use client';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useState } from 'react'
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext'
import { useCustomRedirect } from '../../customHooks';

export default function ProductPage() {
    const [count, setCount] = useState(1);
    const { cart, setCart } = useCartContext();
    const searchParams = useSearchParams();
    const data = searchParams.get('data');
    const product = JSON.parse(data);
    const { user } = useUserContext();

    useCustomRedirect('/signin', user);

    const handleDecrement = () => {
        count > 1 && setCount(prev => prev - 1);
    };
    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };
    const handleAddToCart = (product) => {
        const indexPrev = cart.findIndex(item => item.asin === product.asin);
        if (indexPrev === -1) {
            setCart(prev => (
                [...prev, {
                    ...product,
                    quantity: count
                }]));
        } else {
            const newCart = [...cart];
            newCart[indexPrev].quantity += count;
            setCart(newCart);
        };
    };

    return (
        <>
            <div className='grid grid-cols-2 w-screen'>
                <div className='col-start-1 '>
                    <Image
                        src={product.imgUrl}
                        alt=''
                        width={500}
                        height={100}
                        className=' pr-10 pt-5 pl-5'
                    >
                    </Image>
                </div>
                <div className='flex flex-col justify-center col-start-2'>
                    <p className='py-5'><span className='text-3xl'><b>Product description:</b></span> <span className='text-2xl'>{product.productDescription}</span> </p>
                    <p className='py-5'><span className='text-3xl'><b>Price:</b></span> <span className='text-2xl'>{product.price} $</span></p>
                    <p className='py-5'><span className='text-3xl'><b>Delivery info:</b></span> <span className='text-2xl'>{product.deliveryMessage}</span></p>
                    <div className='py-5 flex'>
                        <button className='p-2 mr-5 bg-black text-white' onClick={() => handleAddToCart(product)}>Add to cart +</button>
                        <div className='flex mx-5'>
                            <button onClick={handleDecrement} className='p-2'>-</button>
                            <p className='p-2'>{count}</p>
                            <button onClick={handleIncrement} className='p-2'>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}