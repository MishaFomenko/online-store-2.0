'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductPage() {
    const [count, setCount] = useState(1);
    const searchParams = useSearchParams();
    const data = searchParams.get('data');
    const product = JSON.parse(data);
    console.log(product)

    const handleDecrement = () => {
        count > 0 && setCount(prev=>prev-1);
    }
    const handleIncrement = () => {
        setCount(prev=>prev+1);
    }

    return (
        <>
        <div className='grid grid-cols-2 w-screen'>
            <div className='col-start-1 flex justify-center'>
                <Image 
                src={product.imgUrl} 
                alt='' 
                width={500} 
                height={100}
                className=' m-10'
                >
                </Image>
            </div>
            <div className='flex flex-col justify-center col-start-2'>
                <p className='py-5'><span className='text-3xl'><b>Product description:</b></span> <span className='text-2xl'>{product.productDescription}</span> </p>
                <p className='py-5'><span className='text-3xl'><b>Price:</b></span> <span className='text-2xl'>{product.price} $</span></p>
                <p className='py-5'><span className='text-3xl'><b>Delivery info:</b></span> <span className='text-2xl'>{product.deliveryMessage}</span></p>
                <div className='py-5 flex'>
                    <button className='p-2 mr-5 bg-black text-white'>Add to cart +</button>
                    <div className='flex mx-5'>
                        <button onClick={handleDecrement} className='m-2'>-</button>
                        <p className='m-2'>{count}</p>
                        <button onClick={handleIncrement} className='m-2'>+</button>
                    </div>
                </div>


            </div>

        </div>
        </>
    )
}