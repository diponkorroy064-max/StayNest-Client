"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Calendar, FileText, ArrowRight, Building, Home } from "lucide-react";
import Link from "next/link";

export default function BookingSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Optional parameter extraction if passed through your route navigation query string context
    const transactionId = searchParams.get("txn") || "STAYN_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const amountPaid = searchParams.get("amount") || "1,250";

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 md:p-8 text-base-content">
            <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-3xl shadow-xl p-6 md:p-8 text-center space-y-6">

                {/* Animated/Styled Success Vector Badge */}
                <div className="flex justify-center">
                    <div className="bg-success/10 p-4 rounded-full text-success animate-bounce">
                        <CheckCircle2 className="w-16 h-16" />
                    </div>
                </div>

                {/* Typography Header Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">Lease Secured!</h1>
                    <p className="text-sm text-neutral-400 font-semibold px-4">
                        Your transaction completed cleanly and your space reservation parameters are locked in.
                    </p>
                </div>

                {/* Mini Transaction Receipt Matrix */}
                <div className="bg-base-200 border border-base-300 rounded-2xl p-4 text-left space-y-3 text-xs font-bold">
                    <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                        <span className="text-neutral-400 font-semibold">Payment Status</span>
                        <span className="badge badge-success text-white badge-sm font-black tracking-wide uppercase px-2.5 py-2">
                            ● Success
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-semibold flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> Transaction ID
                        </span>
                        <span className="font-mono text-base-content uppercase tracking-wide">
                            {transactionId}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> Settlement Date
                        </span>
                        <span className="text-base-content">
                            {new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-b border-base-300/60 pb-2">
                        <span className="text-neutral-400 font-semibold">Amount Captured</span>
                        <span className="text-sm font-black text-primary">${amountPaid}</span>
                    </div>
                </div>

                {/* Action Directional Paths */}
                <div className="flex flex-col gap-2 pt-2">
                    <Link
                        href="/dashboard/tenant/myBookings"
                        className="btn btn-primary rounded-xl font-bold normal-case shadow-md gap-2"
                    >
                        <Building className="w-4 h-4" /> Go to My Bookings <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                        href="/"
                        className="btn btn-ghost hover:bg-base-200 rounded-xl font-bold normal-case text-neutral-500 gap-1"
                    >
                        <Home className="w-4 h-4" /> Return to Marketplace Home
                    </Link>
                </div>

                {/* Footer Security Guarantee Indicator */}
                <p className="text-[10px] text-neutral-400/80 font-semibold uppercase tracking-wider">
                    Secured Asset Ledger Engine • StayNest Inc.
                </p>

            </div>
        </div>
    );
}
