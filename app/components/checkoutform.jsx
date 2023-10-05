'use client'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useState, useEffect } from 'react'
import { useCartContext } from '../context/cartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheckOutForm() {

  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useCartContext();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      }

    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

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


  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const checkoutList = cart.map((product, ind) =>
    <div key={ind} className='w-screen h-96 flex'>

      <div className='w-1/3 h-full flex justify-center relative m-2'>
        <Image src={product.imgUrl} alt='product image' fill={true} objectFit="cover" objectPosition="center" />
      </div>
      <div className='flex flex-col justify-center pl-4'>
        <p className='ml-2 text-sm sm:text-2xl'>{product.productDescription}</p>
        <div className='flex pl-2'>
          <button onClick={() => handleDecreaseAmount(product)} className="text-sm sm:text-2xl border-2 border-black rounded-lg px-2">-</button>
          <p className='m-2 text-sm sm:text-2xl'>Quantity: {product.quantity}</p>
          <button onClick={() => handleIncreaseAmount(product)} className="text-sm sm:text-2xl border-2 border-black rounded-lg px-2">+</button>
        </div>
        <p className='m-2 text-sm sm:text-2xl'>Price: {product.quantity * product.price}$</p>
      </div>
    </div>
  )
  return (
    <div className='pb-16'>
      <p className='m-6 fixed right-0 text-3xl'>Total: {total}$</p>
      {checkoutList}
      <form id="payment-form" onSubmit={handleSubmit} className='border-2 border-cyan-500 px-8 py-4 my-10'>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value)}
        />
        <p className='m-3 p-2 border-4 border-red-400 text-red-400'>{`NOTE: for the 'Card number' use`} <b>4242 4242 4242 4242</b></p>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className='rounded bg-cyan-500 p-3 my-4 w-full text-white hover:bg-cyan-200 hover:text-cyan-600 border-2 hover:border-cyan-600 transition duration-500'>
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}