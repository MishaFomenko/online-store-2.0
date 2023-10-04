'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/usercontext'
import { useEffect, useRef } from 'react'
import CheckoutForm from "../components/checkoutform";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const prevUserRef = useRef(null);

  useEffect(() => {
    if (user === null) {
      try {
        prevUserRef.current = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`))
        setUser(prevUserRef.current)
      } catch { }
    }
    user === null && prevUserRef.current === null && router.push('/registration')

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  });

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