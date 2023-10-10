'use client';
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUserContext } from '../context/userContext';
import { useEffect } from 'react';
import CheckoutForm from "../components/checkOutForm";
import { useCartContext } from '../context/cartContext';
import { customPoster } from '../utils/fetchConstructor';
import { useCustomRedirect } from '../customHooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = React.useState("");
  const { user } = useUserContext();
  const { cart } = useCartContext();

  useCustomRedirect('/signin', user)

  const paymentIntent = async (paymentPath, paymentBody) => {
    const client = await customPoster(paymentPath, paymentBody);
    setClientSecret(client.clientSecret);
  };

  useEffect(() => {
    const paymentPath = '/api/create-payment-intent';
    const paymentBody = { items: cart };
    paymentIntent(paymentPath, paymentBody)
  }, [user, cart]);

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