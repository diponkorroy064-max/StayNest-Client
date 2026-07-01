"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Receipt, CreditCard, Calendar, Building2, ArrowRight, Home, BadgeCheck,} from "lucide-react";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();

    const transactionId =
        searchParams.get("txn") ||
        "TXN_" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const amount = searchParams.get("amount") || "0.00";
    const property = searchParams.get("title") || "Property Booking";

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">

                {/* Card */}
                <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-linear-to-r from-success to-emerald-500 p-8 text-white text-center">

                        <div className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center backdrop-blur-md">
                            <CheckCircle2 className="w-14 h-14" />
                        </div>

                        <h1 className="text-4xl font-black mt-5">
                            Payment Successful!
                        </h1>

                        <p className="mt-2 text-white/90">
                            Thank you! Your payment has been completed successfully.
                        </p>
                    </div>

                    {/* Details */}
                    <div className="p-8 space-y-6">

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="bg-base-200 rounded-2xl p-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <Receipt size={18} />
                                    Transaction ID
                                </div>

                                <p className="font-bold mt-2 break-all">
                                    {transactionId}
                                </p>
                            </div>

                            <div className="bg-base-200 rounded-2xl p-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <CreditCard size={18} />
                                    Amount Paid
                                </div>

                                <p className="font-bold text-primary text-xl mt-2">
                                    ${amount}
                                </p>
                            </div>

                            <div className="bg-base-200 rounded-2xl p-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <Building2 size={18} />
                                    Property
                                </div>

                                <p className="font-bold mt-2">
                                    {property}
                                </p>
                            </div>

                            <div className="bg-base-200 rounded-2xl p-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <Calendar size={18} />
                                    Payment Date
                                </div>

                                <p className="font-bold mt-2">
                                    {new Date().toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        {/* Status Cards */}
                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="border border-success bg-success/10 rounded-2xl p-5 flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Payment Status
                                    </p>

                                    <h2 className="text-xl font-bold text-success">
                                        Paid
                                    </h2>
                                </div>

                                <BadgeCheck className="text-success" size={40} />
                            </div>

                            <div className="border border-warning bg-warning/10 rounded-2xl p-5 flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Booking Status
                                    </p>

                                    <h2 className="text-xl font-bold text-warning">
                                        Pending Approval
                                    </h2>
                                </div>

                                <Building2 className="text-warning" size={40} />
                            </div>

                        </div>

                        {/* Information */}
                        <div className="alert bg-base-200 rounded-2xl">
                            <span>
                                🎉 Your booking request has been submitted successfully.
                                The property owner will review your request and either approve or reject it.
                                You can check the latest booking status from <strong>My Bookings</strong>.
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="grid md:grid-cols-2 gap-4">

                            <Link
                                href="/dashboard/tenant/myBookings"
                                className="btn btn-primary rounded-xl font-bold"
                            >
                                <Building2 size={18} />
                                My Bookings
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/"
                                className="btn btn-outline rounded-xl font-bold"
                            >
                                <Home size={18} />
                                Back to Home
                            </Link>

                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-neutral-500">
                    StayNest • Secure payments powered by Stripe 🔒
                </div>

            </div>
        </div>
    );
}
