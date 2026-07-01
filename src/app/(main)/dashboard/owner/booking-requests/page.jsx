"use client";
import React, { useEffect, useState } from "react";
import { FileCheck, Mail, Phone, Calendar, User, Check, X, ShieldAlert } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getAnalyticsByEmail } from "@/lib/api/analytics";
import { updateBookingStatus } from "@/lib/api/booking";


export default function BookingRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    // console.log('session from booking request page', session);
    const ownerEmail = session?.data?.user?.email;
    // console.log('Owner Email from booking request page', ownerEmail);


    useEffect(() => {
        if (!ownerEmail) return;

        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await getAnalyticsByEmail(ownerEmail);
                // console.log("response from owner booking request page", response);
                setRequests(response);
            } catch (err) {
                toast.error("Failed to load rental applications queue.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, [ownerEmail]);


    const handleActionUpdate = async (bookingId, updatedStatus) => {
        try {
            await updateBookingStatus(bookingId, updatedStatus);
            setRequests((prev) =>
                prev.map((item) => item._id === bookingId ? {
                    ...item,
                    bookingStatus: updatedStatus
                }
                    : item)
            );

            if (updatedStatus === "Approved") {
                toast.success(`Booking ${updatedStatus.toLowerCase()} successfully`);
            }
            else {
                toast.warning(`Booking ${updatedStatus.toLowerCase()}`);
            }
        }
        catch (err) { toast.error(err.message || "Failed to update booking status.") }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-4 md:py-8 text-base-content">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Title Context Header */}
                <div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm">
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
                    <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th>Asset Specification</th>
                                        <th>Applicant Summary</th>
                                        <th>Move-in/Target Parameters</th>
                                        <th>Tariff</th>
                                        <th>Workflow Actions</th>
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
                                                <div className="text-md font-black text-primary">৳{req.rentAmount || req.payAmount || "0"}</div>
                                                <div className="badge badge-success text-white font-bold text-[10px] mt-1 rounded px-1.5 py-0.5">
                                                    {req.paymentStatus || "Unpaid"}
                                                </div>
                                            </td>

                                            
                                            {/* Interaction Actions */}
                                            <td className="py-4">
                                                {req.bookingStatus === "Approved" ? (
                                                    <span className="badge badge-success text-white font-black text-xs px-3 py-2.5 rounded-xl">
                                                        Contract Confirmed
                                                    </span>
                                                ) : req.bookingStatus === "Declined" ? (
                                                    <span className="badge badge-error text-white font-black text-xs px-3 py-2.5 rounded-xl">
                                                        Application Refused
                                                    </span>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleActionUpdate(req._id, "Approved")}
                                                            className="btn btn-sm btn-success text-white font-bold normal-case rounded-xl gap-1"
                                                            title="Authorize System Access">
                                                            <Check className="w-4 h-4" /> Accept
                                                        </button>

                                                        <button
                                                            onClick={() => handleActionUpdate(req._id, "Declined")}
                                                            className="btn btn-sm btn-outline btn-error font-bold normal-case rounded-xl gap-1"
                                                            title="Reject Parameter Pipeline">
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

