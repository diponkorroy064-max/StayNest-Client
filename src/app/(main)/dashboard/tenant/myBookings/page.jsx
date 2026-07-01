"use client";
import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, RefreshCw, BookmarkCheck, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/api/booking";


export default function TenantBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    const currentUserEmail = session?.data?.user?.email;
    // console.log("current User Email", currentUserEmail);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await getBookingsByEmail(currentUserEmail);
            // console.log("data in my booking page", data);
            setBookings(data || []);
        } catch (err) {
            toast.error(err.message || "Failed to parse lease booking history profiles.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUserEmail) {
            fetchBookings();
        }
    }, [currentUserEmail]);

    // Style mapping for dynamic operational validation state
    const getBookingStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
            case "approved":
                return "badge-success text-white";
            case "cancelled":
            case "rejected":
                return "badge-error text-white";
            case "pending":
            default:
                return "badge-warning text-base-content";
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
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Section Context Dashboard Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <BookmarkCheck className="text-primary w-6 h-6" /> Rental Booking Matrix
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Logged Profile Target: <span className="text-primary font-bold">{currentUserEmail}</span>
                        </p>
                    </div>
                    <button onClick={fetchBookings} className="btn btn-sm btn-outline rounded-xl font-bold gap-1 normal-case">
                        <RefreshCw className="w-3.5 h-3.5" /> Reload Statements
                    </button>
                </div>

                {/* Main Data Layout Grid */}
                {bookings.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        No active properties lease contracts or bookings track histories logged to this handle.
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th className="py-4 pl-6">Property Name</th>
                                        <th>Booking Date</th>
                                        <th>Amount Paid</th>
                                        <th>Booking Status</th>
                                        <th className="pr-6">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((book) => (
                                        <tr key={book._id} className="border-b border-base-200 font-medium hover:bg-base-200/40 transition-colors">

                                            {/* Property Name Column */}
                                            <td className="py-4 pl-6">
                                                <div>
                                                    <div className="font-extrabold text-base-content max-w-60 truncate">
                                                        {book.title || "Premium Living Space"}
                                                    </div>
                                                    {book.transactionId && (
                                                        <div className="text-[10px] font-mono text-neutral-400 font-semibold tracking-wide uppercase mt-0.5">
                                                            TXN: {book.transactionId}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Booking Date Column */}
                                            <td>
                                                <div className="flex items-center gap-1 text-xs text-neutral-500 font-semibold">
                                                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                                    {book.bookingDate ? new Date(book.bookingDate).toLocaleDateString() : "Processing..."}
                                                </div>
                                            </td>

                                            {/* Amount Paid Column */}
                                            <td>
                                                <div className="font-black text-primary flex items-center">
                                                   ৳ {book.rentAmount  || book.payAmount  || "0"}
                                                </div>
                                            </td>

                                            {/* Booking Status Badge Column */}
                                            <td>
                                                <span className={`badge font-black text-[10px] py-2.5 px-3 rounded-xl border-none tracking-wider shadow-sm uppercase ${getBookingStatusStyle(book.bookingStatus || "Pending")}`}>
                                                    {book.bookingStatus || "Pending"}
                                                </span>
                                            </td>

                                            {/* Payment Status Column */}
                                            <td className="pr-6">
                                                <span className={`text-xs font-extrabold uppercase tracking-wider ${book.paymentStatus?.toLowerCase() === "paid" ? "text-success" : "text-warning"
                                                    }`}>
                                                    ● {book.paymentStatus || "Unpaid"}
                                                </span>
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

