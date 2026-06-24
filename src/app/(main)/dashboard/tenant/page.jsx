"use client";
import React, { useEffect, useState } from "react";
import { Home, Calendar, Wallet, Heart, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
// import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function TenantDashboardHome() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Static session identification matching our prior context mapping
    const tenantEmail = "diponkor@example.com";

    useEffect(() => {
        const fetchTenantDashboard = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/tenant/dashboard?email=${tenantEmail}`);
                setDashboardData(response.data);
            } catch (err) {
                toast.error("Failed to load your tenant profile summaries.");
            } finally {
                setLoading(false);
            }
        };
        fetchTenantDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // High performance UI defaults if database fields are unpopulated
    const data = dashboardData || {
        activeLeasesCount: 1,
        totalRentPaid: 1200,
        favoritesCount: 4,
        nextPayment: { amount: 1200, dueDate: "07/01/2026", status: "Pending" },
        recentBookings: []
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Welcoming Context Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Home className="text-primary w-6 h-6" /> Welcome Back, Diponkor
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Manage your active rentals, lease statements, and property interactions.
                        </p>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                        Profile Verified
                    </div>
                </div>

                {/* Tenant Operational High-Level Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary"><Home className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Active Rentals</p>
                            <h3 className="text-2xl font-black">{data.activeLeasesCount} Unit(s)</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-success/10 rounded-xl text-success"><Wallet className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Total Rent Settled</p>
                            <h3 className="text-2xl font-black">${data.totalRentPaid}</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-error/10 rounded-xl text-error"><Heart className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Saved Shortcuts</p>
                            <h3 className="text-2xl font-black">{data.favoritesCount} Saved</h3>
                        </div>
                    </div>

                </div>

                {/* Mid-level split workflow configuration */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Next Rent Installment Reminders Card */}
                    <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-sm lg:col-span-1 flex flex-col justify-between space-y-4">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Upcoming Statement</h3>
                            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Your incoming monthly installment breakdown.</p>
                        </div>

                        <div className="bg-base-200 p-4 border rounded-2xl space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-neutral-500">Rent Charge</span>
                                <span className="text-xl font-black text-primary">${data.nextPayment?.amount || 0}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-base-300 pt-2 text-xs">
                                <span className="font-bold text-neutral-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Due By</span>
                                <span className="font-extrabold">{data.nextPayment?.dueDate || "N/A"}</span>
                            </div>
                        </div>

                        {data.activeLeasesCount > 0 ? (
                            <div className="alert bg-warning/10 text-warning border border-warning/20 text-xs font-bold rounded-xl flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" /> Action required before cutoff limit.
                            </div>
                        ) : (
                            <div className="alert bg-success/10 text-success border border-success/20 text-xs font-bold rounded-xl flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 shrink-0" /> Balance cleared perfectly.
                            </div>
                        )}
                    </div>

                    {/* Rental History Application Tracking Pipeline */}
                    <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-sm lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                            <ArrowUpRight className="w-5 h-5 text-primary" /> Active System Application Status
                        </h3>

                        {data.recentBookings.length === 0 ? (
                            <div className="p-8 text-center text-neutral-400 font-bold text-sm bg-base-200 rounded-2xl border border-dashed border-base-300">
                                You have not filed any property booking request signatures yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase">
                                            <th>Property Title</th>
                                            <th>Move-In Target</th>
                                            <th>Tariff Cost</th>
                                            <th>Validation Lifecycle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recentBookings.map((booking) => (
                                            <tr key={booking._id} className="border-b border-base-200 font-medium">
                                                <td className="font-extrabold max-w-45 truncate">{booking.title}</td>
                                                <td className="text-neutral-500 font-semibold">{booking.moveInDate}</td>
                                                <td className="font-black text-primary">${booking.rentAmount}</td>
                                                <td>
                                                    <span className={`badge font-bold text-[11px] py-2 px-2.5 rounded-md ${booking.status === "Approved" ? "badge-success text-white" :
                                                            booking.status === "Declined" ? "badge-error text-white" :
                                                                "badge-warning text-base-content"
                                                        }`}>
                                                        {booking.status || "Pending"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
