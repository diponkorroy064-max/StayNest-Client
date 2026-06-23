"use client";
import React, { useEffect, useState } from "react";
import { BarChart3, Wallet, Users, Home, TrendingUp, ArrowUpRight, DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getPropertyByEmail } from "@/lib/api/api";


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OwnerDashboardAnalytics() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const data = useSession();
    // console.log("data from owner home", data);
    const user = data?.data?.user;
    // console.log("user from owner home", user);
    const ownerEmail = user?.email;

    const emailData = async () => {
        const response = await getPropertyByEmail(ownerEmail);
        // console.log("response", response);
        return response;
    }
    // emailData();
    
   


    // useEffect(() => {
    //     const fetchAnalyticsData = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await getPropertyByEmail(ownerEmail);
    //             console.log("response", response);
    //             setAnalytics(response);
    //         } catch (err) {
    //             toast.error("Failed to load ecosystem metric summaries.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchAnalyticsData();
    // }, []);


    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-base-200 flex items-center justify-center">
    //             <span className="loading loading-spinner loading-lg text-primary"></span>
    //         </div>
    //     );
    // }

    // High performance defaults if response data has sparse fields
    const stats = {
        totalRevenue: 4850,
        activeLeases: 3,
        totalProperties: 5,
        occupancyRate: 60,
        monthlyTrends: [
            { month: "Jan", amount: 1200 },
            { month: "Feb", amount: 1200 },
            { month: "Mar", amount: 2450 }
        ],
        recentLeaseRequests: []
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Dashboard Welcoming Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <BarChart3 className="text-primary w-6 h-6" /> Portfolio Insights
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Real-time structural asset matrix evaluations for {ownerEmail}.
                        </p>
                    </div>
                    <div className="text-xs bg-success/10 text-success font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> Operations Stable
                    </div>
                </div>

                {/* Macro Operational Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary"><Wallet className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Gross Revenue</p>
                            <h3 className="text-2xl font-black">${stats.totalRevenue}</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-success/10 rounded-xl text-success"><Users className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Active Tenants</p>
                            <h3 className="text-2xl font-black">{stats.activeLeases} Users</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-warning/10 rounded-xl text-warning"><Home className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Listed Modules</p>
                            <h3 className="text-2xl font-black">{stats.totalProperties} Units</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-info/10 rounded-xl text-info"><ArrowUpRight className="w-6 h-6" /></div>
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Occupancy Rate</p>
                            <h3 className="text-2xl font-black">{stats.occupancyRate}%</h3>
                        </div>
                    </div>

                </div>

                {/* Analytics Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Visual Bar Distribution Chart Simulation */}
                    <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-sm lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-black tracking-tight">Revenue Breakdown</h3>

                        <div className="h-48 flex items-end gap-4 pt-4 border-b border-base-300 px-2">
                            {stats.monthlyTrends.map((trend, i) => {
                                const maxAmount = Math.max(...stats.monthlyTrends.map(t => t.amount), 1);
                                const heightPercentage = (trend.amount / maxAmount) * 100;

                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                        <div className="text-xs font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                                            ${trend.amount}
                                        </div>
                                        <div
                                            style={{ height: `${heightPercentage}%` }}
                                            className="w-full bg-primary/20 group-hover:bg-primary rounded-t-lg transition-all duration-500"
                                        />
                                        <span className="text-xs font-bold text-neutral-400 mt-1">{trend.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Occupancy Structural Meter */}
                    <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Space Strategy Allocation</h3>
                            <p className="text-xs font-semibold text-neutral-400 mt-0.5">Ratio of filled to vacant units.</p>
                        </div>

                        <div className="flex justify-center py-4">
                            <div className="radial-progress text-primary font-black" style={{ "--value": stats.occupancyRate, "--size": "8rem", "--thickness": "12px" }} role="progressbar">
                                {stats.occupancyRate}%
                            </div>
                        </div>

                        <div className="flex justify-between text-xs font-bold text-neutral-500 bg-base-200 p-3 rounded-xl border border-base-300">
                            <div>● Occupied: {stats.activeLeases}</div>
                            <div>○ Available: {stats.totalProperties - stats.activeLeases}</div>
                        </div>
                    </div>

                </div>

                {/* Recent Transaction Application Stream */}
                <div className="bg-base-100 border border-base-300 p-6 rounded-3xl shadow-sm space-y-4">
                    <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" /> Recent System Application Flows
                    </h3>

                    {stats.recentLeaseRequests.length === 0 ? (
                        <div className="p-6 text-center text-neutral-400 font-bold text-sm bg-base-200 rounded-2xl border border-dashed border-base-300">
                            No active lease contract events registered inside the database repository channels yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase">
                                        <th>Tenant</th>
                                        <th>Property Asset</th>
                                        <th>Move-In Target</th>
                                        <th>Rent Tariff</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentLeaseRequests.map((req) => (
                                        <tr key={req._id} className="border-b border-base-200 font-medium">
                                            <td>
                                                <div className="font-extrabold">{req.tenantName}</div>
                                                <div className="text-xs text-neutral-400 font-semibold">{req.tenantEmail}</div>
                                            </td>
                                            <td className="font-bold max-w-50 truncate">{req.title}</td>
                                            <td>{req.moveInDate}</td>
                                            <td className="font-black text-primary">${req.rentAmount}</td>
                                            <td>
                                                <span className="badge badge-success text-white font-bold text-xs py-2 rounded-md">
                                                    {req.paymentStatus}
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
    );
}


