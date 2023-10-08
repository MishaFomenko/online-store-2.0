'use client';
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/userContext';
import { useEffect } from 'react';
import CheckoutForm from "../components/checkOutForm";
import { useCartContext } from '../context/cartContext';
import { customPoster } from '../utils/fetchConstructor';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
  const { user } = useUserContext();
  const { cart } = useCartContext();

  const paymentIntent = async (paymentPath, paymentBody) => {
    const client = await customPoster(paymentPath, paymentBody);
    setClientSecret(client.clientSecret);
  };

  useEffect(() => {
    user === null && router.push('/registration');
    const paymentPath = '/api/create-payment-intent';
    const paymentBody = { items: cart };
    paymentIntent(paymentPath, paymentBody)
  }, [user, router, cart]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}