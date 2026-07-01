"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSearchParams } from "next/navigation";


// Initialize Stripe outside of render to prevent re-instantiation on updates---
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function TenantPaymentPage() {
    const searchParams = useSearchParams();
    const [clientSecret, setClientSecret] = useState("");

    // Retrieve booking parameters from URL search queries or state managers---
    const amount = searchParams.get("amount");
    const propertyId = searchParams.get("propertyId");
    const title = searchParams.get("title");
    const moveInDate = searchParams.get("moveInDate");
    const contactNumber = searchParams.get("contactNumber");
    const additionalNotes = searchParams.get("additionalNotes");

    console.log("Amount:", amount);
    console.log("Property:", propertyId);
    console.log("Title:", title);
    console.log("Move-In Date:", moveInDate);
    console.log("Contact Number:", contactNumber);
    console.log("Additional Notes:", additionalNotes);

    useEffect(() => {
        if (!amount) return;

        // Fetch PaymentIntent client secret as soon as the component loads---
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ amount, propertyId }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount, propertyId]);

    const appearance = { theme: 'stripe' };
    const options = { clientSecret, appearance };


    if (!clientSecret) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-3 bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm font-bold text-neutral-500">Preparing Secure Stripe Checkout...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-6 flex justify-center items-center">
            <div className="bg-base-100 p-8 border border-base-300 rounded-3xl max-w-lg w-full shadow-xl">
                <h2 className="text-2xl font-black mb-1">Complete Secure Payment</h2>
                <p className="text-sm text-neutral-500 mb-6">Securing lease for: <span className="font-bold text-neutral-800">{title}</span></p>

                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                        amount={amount}
                        propertyId={propertyId}
                        title={title}
                        moveInDate={moveInDate}
                        contactNumber={contactNumber}
                        additionalNotes={additionalNotes}
                    />
                </Elements>
            </div>
        </div>
    );
}

