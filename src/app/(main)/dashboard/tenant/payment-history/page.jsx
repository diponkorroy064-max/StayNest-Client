"use client";
import React, { useEffect, useState } from "react";
import { History, Calendar, DollarSign, RefreshCw, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/api/booking";


export default function TenantBookingHistoryPage() {
    const [historyLogs, setHistoryLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    const currentUserEmail = session?.data?.user?.email || "example@example.com";
    const currentUserRole = session?.data?.user?.role || "user";

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await getBookingsByEmail(currentUserEmail);
            // console.log("Rental history data fetched:", data);

            setHistoryLogs(data || []);
        } catch (err) {
            toast.error(err.message || "Failed to load rental history archives.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUserEmail) {
            fetchHistory();
        }
    }, [currentUserEmail]);

    // Calculate quick metrics based on historical listings array data--
    const totalSpent = historyLogs.reduce((acc, curr) => acc + Number(curr.payAmount || curr.rentAmount || 0), 0);
    const totalStays = historyLogs.filter(log => log.bookingStatus?.toLowerCase() === "completed").length;

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    
    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header Context Bar */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <History className="text-primary w-6 h-6" /> Rental Activity History
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Archived statement parameters matching user(<span className="text-red-500 font-bold">{currentUserRole}</span>): <span className="text-primary font-bold">{currentUserEmail}</span>
                        </p>
                    </div>
                    <button onClick={fetchHistory} className="btn btn-sm btn-outline rounded-xl font-bold gap-1 normal-case">
                        <RefreshCw className="w-3.5 h-3.5" /> Reload History
                    </button>
                </div>

                {/* Summary Statistics Counter Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary font-black">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Investment Logs</p>
                            <h3 className="text-2xl font-black text-base-content mt-0.5">৳{totalSpent.toLocaleString()}</h3>
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                        <div className="bg-success/10 p-3 rounded-xl text-success font-black">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Completed Leases</p>
                            <h3 className="text-2xl font-black text-base-content mt-0.5">{totalStays} Past Residences</h3>
                        </div>
                    </div>
                </div>

                {/* Main Archival Data Layout Grid Table */}
                {historyLogs.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        No historical checkout listings or terminated tenancy records found in the database layer.
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th className="py-4 pl-6">Property Profile</th>
                                        <th>Duration Period</th>
                                        <th>Total Settled</th>
                                        <th>Operational Status</th>
                                        <th className="pr-6">Security Check</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyLogs.map((log) => (
                                        <tr key={log._id} className="border-b border-base-200 font-medium hover:bg-base-200/40 transition-colors">

                                            {/* Name / Transaction ID */}
                                            <td className="py-4 pl-6">
                                                <div>
                                                    <div className="font-extrabold text-base-content max-w-60 truncate">
                                                        {log.title || "Premium Rental Property"}
                                                    </div>
                                                    {log.transactionId && (
                                                        <div className="text-[10px] font-mono text-neutral-400 font-semibold tracking-wide uppercase mt-0.5 flex items-center gap-1">
                                                            <FileText className="w-3 h-3 shrink-0" /> ID: {log.transactionId}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Date Mapping Column */}
                                            <td>
                                                <div className="flex items-center gap-1 text-xs text-neutral-500 font-semibold">
                                                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                                    {log.bookingDate ? new Date(log.bookingDate).toLocaleDateString() : "Prior Records"}
                                                </div>
                                            </td>

                                            {/* Amount Paid Column */}
                                            <td>
                                                <div className="font-black text-primary flex items-center">
                                                    ৳{log.payAmount || log.rentAmount || "0"}
                                                </div>
                                            </td>

                                            {/* Structural Status Flag */}
                                            <td>
                                                <span className={`badge font-black text-[10px] py-2.5 px-3 rounded-xl border-none tracking-wider shadow-sm uppercase ${log.bookingStatus?.toLowerCase() === "completed" ? "badge-neutral text-neutral-content" : "badge-success text-white"
                                                    }`}>
                                                    {log.bookingStatus || "Completed"}
                                                </span>
                                            </td>

                                            {/* Verification Seal */}
                                            <td className="pr-6 text-success text-xs font-extrabold tracking-wide">
                                                <div className="flex items-center gap-1">
                                                    <ShieldCheck className="w-4 h-4 text-success shrink-0" /> Verified Settlement
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

