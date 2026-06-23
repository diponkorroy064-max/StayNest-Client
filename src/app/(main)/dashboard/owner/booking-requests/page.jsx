"use client";
import React, { useEffect, useState } from "react";
import { FileCheck, Mail, Phone, Calendar, User, Check, X, ShieldAlert } from "lucide-react";
import { toast } from "react-toastify";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function BookingRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const ownerEmail = "diponkor@example.com";

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/owner/bookings?email=${ownerEmail}`);
            setRequests(response.data);
        } catch (err) {
            toast.error("Failed to load rental applications queue.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleActionUpdate = async (bookingId, updatedStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/bookings/${bookingId}`, { status: updatedStatus });
            toast.success(`Application updated to ${updatedStatus} successfully!`);
            fetchRequests(); // Refresh data layout matrix logs
        } catch (err) {
            toast.error("Failed modifying entry lifecycle vectors.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Title Context Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        <FileCheck className="text-primary w-6 h-6" /> Lease Application Pipelines
                    </h1>
                    <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                        Process inbound booking reservations and rental declarations for your assets.
                    </p>
                </div>

                {/* Table Request Stream Layout */}
                {requests.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        No application configurations currently mapped under your properties track.
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th>Asset Specification</th>
                                        <th>Applicant Summary</th>
                                        <th>Move-in/Target Parameters</th>
                                        <th>Tariff Summary</th>
                                        <th>Workflow Validation Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req._id} className="border-b border-base-200 font-medium align-top">
                                            {/* Property Column */}
                                            <td className="py-4">
                                                <div className="font-extrabold text-base-content max-w-55 truncate">
                                                    {req.title}
                                                </div>
                                                <div className="text-[11px] font-mono text-neutral-400 mt-0.5 uppercase">
                                                    TXID: {req.transactionId || "N/A"}
                                                </div>
                                            </td>

                                            {/* Applicant Column */}
                                            <td className="py-4 space-y-1">
                                                <div className="font-bold flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-neutral-400" /> {req.tenantName}
                                                </div>
                                                <div className="text-xs text-neutral-500 flex items-center gap-1.5 font-semibold">
                                                    <Mail className="w-3.5 h-3.5" /> {req.tenantEmail}
                                                </div>
                                                <div className="text-xs text-neutral-500 flex items-center gap-1.5 font-semibold">
                                                    <Phone className="w-3.5 h-3.5" /> {req.contactNumber}
                                                </div>
                                            </td>

                                            {/* Timeline and Notes */}
                                            <td className="py-4 space-y-2 max-w-62.5">
                                                <span className="badge badge-neutral gap-1 text-xs font-bold py-2.5 px-3 rounded-lg bg-base-200 text-base-content border-base-300">
                                                    <Calendar className="w-3.5 h-3.5 text-primary" /> {req.moveInDate}
                                                </span>
                                                {req.additionalNotes && (
                                                    <p className="text-xs text-neutral-500 bg-base-200/60 border p-2.5 rounded-xl italic font-medium leading-relaxed">
                                                        {req.additionalNotes}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Cost Summary */}
                                            <td className="py-4">
                                                <div className="text-md font-black text-primary">${req.rentAmount}</div>
                                                <div className="badge badge-success text-white font-bold text-[10px] mt-1 rounded px-1.5 py-0.5">
                                                    {req.paymentStatus || "Paid"}
                                                </div>
                                            </td>

                                            {/* Interaction Actions */}
                                            <td className="py-4">
                                                {req.status === "Approved" ? (
                                                    <span className="badge badge-success text-white font-black text-xs px-3 py-2.5 rounded-xl">
                                                        Contract Confirmed
                                                    </span>
                                                ) : req.status === "Declined" ? (
                                                    <span className="badge badge-error text-white font-black text-xs px-3 py-2.5 rounded-xl">
                                                        Application Refused
                                                    </span>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleActionUpdate(req._id, "Approved")}
                                                            className="btn btn-sm btn-success text-white font-bold normal-case rounded-xl gap-1"
                                                            title="Authorize System Access"
                                                        >
                                                            <Check className="w-4 h-4" /> Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleActionUpdate(req._id, "Declined")}
                                                            className="btn btn-sm btn-outline btn-error font-bold normal-case rounded-xl gap-1"
                                                            title="Reject Parameter Pipeline"
                                                        >
                                                            <X className="w-4 h-4" /> Decline
                                                        </button>
                                                    </div>
                                                )}
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
