"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Search, CheckCircle, XCircle, Eye, Home, CreditCard, User } from "lucide-react";
import { getBookings } from "@/lib/api/booking";
import { toast } from "react-toastify";

export default function AdminAllBookingsPage() {
    const [search, setSearch] = useState("");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings();
                // Ensure data is always an array to prevent .filter or .map crashes
                setBookings(Array.isArray(data) ? data : []);
            } catch (error) {
                toast.error(error.message || "Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);


    const filteredBookings = bookings.filter((booking) => {
        const propertyTerm = typeof booking.property === 'object' ? booking.property?.name : booking.property;
        const tenantTerm = typeof booking.tenant === 'object' ? booking.tenant?.name : booking.tenant;

        return (
            (propertyTerm?.toLowerCase() || "").includes(search.toLowerCase()) ||
            (tenantTerm?.toLowerCase() || "").includes(search.toLowerCase()) ||
            (booking.email?.toLowerCase() || "").includes(search.toLowerCase())
        );
    });
    console.log('bookings', bookings);

    const bookingBadge = (status) => {
        switch (status) {
            case "Confirmed": return "badge badge-success";
            case "Pending": return "badge badge-warning";
            case "Cancelled": return "badge badge-error";
            default: return "badge";
        }
    };

    const paymentBadge = (status) => {
        switch (status) {
            case "Paid": return "badge badge-success";
            case "Pending": return "badge badge-warning";
            case "Refunded": return "badge badge-info";
            default: return "badge";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* Header */}
            <div className="bg-base-100 rounded-3xl border border-base-300 p-6 shadow-sm mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black flex items-center gap-3">
                        <CalendarDays className="text-primary" />
                        All Bookings
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Monitor and manage every booking across the platform.
                    </p>
                </div>
                <div className="badge badge-primary badge-lg font-bold">
                    {bookings.length} Bookings
                </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-5 mb-6">
                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500 font-medium text-sm">Total</p>
                    <h2 className="text-3xl font-black mt-1">{bookings.length}</h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500 font-medium text-sm">Confirmed</p>
                    <h2 className="text-3xl font-black text-success mt-1">
                        {bookings.filter((b) => b.bookingStatus === "Confirmed").length}
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500 font-medium text-sm">Pending</p>
                    <h2 className="text-3xl font-black text-warning mt-1">
                        {bookings.filter((b) => b.bookingStatus === "Pending").length}
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500 font-medium text-sm">Revenue</p>
                    <h2 className="text-3xl font-black text-primary mt-1">
                        ৳{bookings
                            .filter((b) => b.paymentStatus === "Paid") // Fixed logic check here
                            .reduce((sum, b) => sum + (Number(b.amount) || 0), 0)}
                    </h2>
                </div>
            </div>

            
            {/* Search */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-sm mb-6">
                <label className="input input-bordered flex items-center gap-2 rounded-xl">
                    <Search size={18} className="text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search by property, tenant name, or email..."
                        className="grow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-sm">
                {filteredBookings.length === 0 ? (
                    <div className="p-10 text-center text-neutral-400 font-semibold">
                        No bookings found matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Tenant</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Booking</th>
                                    <th>Payment</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => {
                                    // // Safeguard string extracts for rendering safely
                                    const displayProperty = typeof booking.property === 'object' ? booking.property?.name : booking.property;
                                    const displayTenant = typeof booking.tenant === 'object' ? booking.tenant?.name : booking.tenant;

                                    return (
                                        <tr key={booking._id} className="hover">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    {booking.image && (
                                                        <Image
                                                            src={booking?.image}
                                                            alt="image"
                                                            width={55}
                                                            height={55}
                                                            className="rounded-xl object-cover"
                                                        />
                                                    )}

                                                    <div>
                                                        <div className="font-bold text-sm md:text-base">
                                                            {displayProperty || "N/A"}
                                                        </div>
                                                        <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                                                            <Home size={13} />
                                                            Property
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="font-semibold flex items-center gap-2 text-sm">
                                                    <User size={15} className="text-neutral-400" />
                                                    {booking?.tenantName || "Unknown"}
                                                </div>
                                                <div className="text-xs text-neutral-500 mt-0.5">
                                                    {booking?.tenantEmail || "No email"}
                                                </div>
                                            </td>

                                            <td className="text-sm">{booking.bookingDate || "N/A"}</td>

                                            <td>
                                                <div className="font-bold text-primary flex items-center gap-1 text-sm">
                                                    <CreditCard size={15} />
                                                    ৳{booking.amount}
                                                </div>
                                            </td>

                                            <td>
                                                <span className={`${bookingBadge(booking.bookingStatus)} rounded-md font-bold`}>
                                                    {booking.bookingStatus || "Unknown"}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={`${paymentBadge(booking.paymentStatus)} rounded-md font-bold`}>
                                                    {booking.paymentStatus || "Unknown"}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    <button className="btn btn-xs md:btn-sm btn-primary btn-square" title="View Details">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="btn btn-xs md:btn-sm btn-success btn-square" title="Approve">
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button className="btn btn-xs md:btn-sm btn-error btn-square" title="Cancel">
                                                        <XCircle size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
