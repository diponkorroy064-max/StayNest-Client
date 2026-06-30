"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Search, CheckCircle, XCircle, Eye, Home, CreditCard, User} from "lucide-react";


export default function AdminAllBookingsPage() {
    const [search, setSearch] = useState("");

    // Dummy data
    const bookings = [
        {
            _id: "1",
            property: "Luxury Apartment",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            tenant: "John Smith",
            email: "john@gmail.com",
            bookingDate: "20 June 2026",
            amount: 18000,
            bookingStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            _id: "2",
            property: "Modern Villa",
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            tenant: "Alex Roy",
            email: "alex@gmail.com",
            bookingDate: "28 June 2026",
            amount: 35000,
            bookingStatus: "Pending",
            paymentStatus: "Pending",
        },
        {
            _id: "3",
            property: "Studio Flat",
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            tenant: "Sarah",
            email: "sarah@gmail.com",
            bookingDate: "29 June 2026",
            amount: 12000,
            bookingStatus: "Cancelled",
            paymentStatus: "Refunded",
        },
    ];

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.property.toLowerCase().includes(search.toLowerCase()) ||
            booking.tenant.toLowerCase().includes(search.toLowerCase())
    );

    const bookingBadge = (status) => {
        switch (status) {
            case "Confirmed":
                return "badge badge-success";
            case "Pending":
                return "badge badge-warning";
            case "Cancelled":
                return "badge badge-error";
            default:
                return "badge";
        }
    };

    const paymentBadge = (status) => {
        switch (status) {
            case "Paid":
                return "badge badge-success";
            case "Pending":
                return "badge badge-warning";
            case "Refunded":
                return "badge badge-info";
            default:
                return "badge";
        }
    };


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

                <div className="badge badge-primary badge-lg">
                    {bookings.length} Bookings
                </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-5 mb-6">

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500">Total</p>
                    <h2 className="text-3xl font-black">{bookings.length}</h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500">Confirmed</p>
                    <h2 className="text-3xl font-black text-success">
                        {
                            bookings.filter(
                                (b) => b.bookingStatus === "Confirmed"
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500">Pending</p>
                    <h2 className="text-3xl font-black text-warning">
                        {
                            bookings.filter(
                                (b) => b.bookingStatus === "Pending"
                            ).length
                        }
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-5 border border-base-300 shadow-sm">
                    <p className="text-neutral-500">Revenue</p>
                    <h2 className="text-3xl font-black text-primary">
                        ৳
                        {bookings
                            .filter((b) => b.paymentStatus === "Paid")
                            .reduce((sum, b) => sum + b.amount, 0)}
                    </h2>
                </div>
            </div>

            {/* Search */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-sm mb-6">
                <label className="input input-bordered flex items-center gap-2 rounded-xl">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search booking..."
                        className="grow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
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
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={booking.image}
                                                alt=""
                                                width={55}
                                                height={55}
                                                className="rounded-xl object-cover"
                                            />

                                            <div>
                                                <div className="font-bold">
                                                    {booking.property}
                                                </div>

                                                <div className="text-xs text-neutral-500 flex items-center gap-1">
                                                    <Home size={13} />
                                                    Property
                                                </div>

                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="font-semibold flex items-center gap-2">
                                            <User size={15} />
                                            {booking.tenant}
                                        </div>

                                        <div className="text-xs text-neutral-500">
                                            {booking.email}
                                        </div>
                                    </td>

                                    <td>{booking.bookingDate}</td>

                                    <td>
                                        <div className="font-bold text-primary flex items-center gap-1">
                                            <CreditCard size={15} />
                                            ৳{booking.amount}
                                        </div>
                                    </td>

                                    <td>
                                        <span className={bookingBadge(booking.bookingStatus)}>
                                            {booking.bookingStatus}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={paymentBadge(booking.paymentStatus)}>
                                            {booking.paymentStatus}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button className="btn btn-sm btn-primary btn-square">
                                                <Eye size={16} />
                                            </button>

                                            <button className="btn btn-sm btn-success btn-square">
                                                <CheckCircle size={16} />
                                            </button>

                                            <button className="btn btn-sm btn-error btn-square">
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

