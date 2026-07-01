"use client";
import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { saveBookingInfo } from "@/lib/api/booking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";


export default function CheckoutForm({ amount, propertyId, title, moveInDate, contactNumber, additionalNotes }) {
    const { data } = useSession();
    const currentUser = data?.user;

    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true);

        // 1. Confirm transaction profile verification parameters directly through Stripe 
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required", // Prevent abrupt redirection to process our database records first
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected checkout validation anomaly surfaced.");
            }
            setIsProcessing(false);
            return;
        }

        // 2. Process our application layer database structures if payment is successful
        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const bookingRecord = {
                    propertyId,
                    title,
                    tenantName: currentUser.name,
                    tenantEmail: currentUser.email,
                    payAmount: Number(amount),
                    moveInDate,
                    contactNumber,
                    additionalNotes,
                    transactionId: paymentIntent.id,
                    paymentStatus: "Paid",
                    bookingStatus: "Pending",
                    bookingDate: new Date().toISOString().split('T')[0]
                };
                await saveBookingInfo(bookingRecord);
                toast.success("Payment verified & pending booking recorded!");

                // 3. Redirect user to their customized success page layout matrix
                router.push(`/dashboard/tenant/success?txn=${paymentIntent.id}&amount=${amount}`);
            } catch (err) {
                toast.error(err.message || "Stripe passed, but database registration failed.");
            }
        }
        setIsProcessing(false);
    };


    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />

            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="btn btn-primary w-full mt-6">
                {isProcessing ? "Processing..." : `Pay $${amount}`}
            </button>
        </form>
    );
}

