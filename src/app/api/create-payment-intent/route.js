import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(amount) * 100), // cenvert to cents for Stripe
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
