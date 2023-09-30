'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from 'next/navigation'
 import { useUserContext } from '../context/usercontext'
 import {useEffect} from 'react'

import CheckoutForm from "../components/checkoutform";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckOutPage() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
    const {user, setUser} = useUserContext();
    let prevUser = null;

    useEffect(()=>{
        if (user===null) {
        try {
            prevUser = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`))
            setUser(prevUser)
        } catch {}
        }
    })
    

    useEffect(()=>{
        user===null && prevUser===null && router.push('/registration')
    },[])

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

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