import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartContext } from '../context/cartContext';

export default function CartCard() {
    const { cart, setCart, setCartOpen } = useCartContext();
    const router = useRouter();

    const handleIncreaseAmount = (product) => {
        const newCart = [...cart];
        const ind = newCart.findIndex(item => item.asin === product.asin);
        newCart[ind].quantity++;
        setCart(newCart);
    }
    const handleDecreaseAmount = (product) => {
        const newCart = [...cart];
        const ind = newCart.findIndex(item => item.asin === product.asin);
        newCart[ind].quantity--;
        setCart(newCart);
    }
    const handleDeleteFromCart = (product) => {
        const newCart = [...cart];
        const clearCart = newCart.filter(item => item.asin !== product.asin);
        setCart(clearCart);
    }

    return (
        <div className='bg-white border-2 border-black sm:w-72 h-96 sm:absolute sm:right-36 mt-12 overflow-auto z-10'>
            {cart.length !== 0 &&
                <>
                    <button className='p-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:border-white transition duration-300 my-2 ml-24' onClick={() => (router.push('/checkout'), setCartOpen(false))}>CheckOut</button>
                    {cart.map((product, ind) =>
                        <div key={ind} className='flex'>
                            <Image src={product.imgUrl} width={100} height={100} alt='' />
                            <div>
                                <p className='ml-2 text-sm text-black'>{product.productDescription}</p>
                                <div className='flex pl-2 text-black'>
                                    <button onClick={() => handleDecreaseAmount(product)}>-</button>
                                    <p className='m-2 text-sm'>Quantity: {product.quantity}</p>
                                    <button onClick={() => handleIncreaseAmount(product)}>+</button>
                                </div>
                                <button className='px-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-white transition duration-300 ml-2 flex-end text-sm' onClick={() => handleDeleteFromCart(product)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                    )}
                </>
                ||
                <p className='m-24 text-gray-200 text-3xl'>The cart is empty</p>
            }
        </div>
    )
}