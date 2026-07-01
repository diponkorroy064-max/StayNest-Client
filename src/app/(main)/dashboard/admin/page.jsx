"use client";
import { getAdminAnalytics } from "@/lib/api/admin";
import { Users, Building2, CalendarDays, BadgeCheck, Clock3, Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";


export default function AdminHomePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getAdminAnalytics();
                setStats(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);
    console.log("stats", stats);


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-base-100 rounded-3xl p-6 shadow border border-base-300 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-2">Monitor your StayNest platform statistics.</p>
                    </div>

                    <div className="badge badge-success badge-lg gap-2">
                        <TrendingUp size={18} />
                        System Healthy
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <Users className="text-primary" size={45} />
                            <div>
                                <p>Total Users</p>
                                <h2 className="text-3xl font-bold">
                                    {stats.totalUsers}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <Building2 className="text-success" size={45} />
                            <div>
                                <p>Total Properties</p>
                                <h2 className="text-3xl font-bold">
                                    {stats.totalProperties}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <CalendarDays className="text-warning" size={45} />
                            <div>
                                <p>Total Bookings</p>
                                <h2 className="text-3xl font-bold">
                                    {stats.recentBookings?.length}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <Wallet className="text-secondary" size={45} />
                            <div>
                                <p>Total Revenue</p>
                                <h2 className="text-3xl font-bold">
                                    ৳ {stats.totalRevenue}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <BadgeCheck className="text-success" size={45} />
                            <div>
                                <p>Approved Properties</p>
                                <h2 className="text-3xl font-bold">
                                    {stats.approvedProperties}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow border border-base-300">
                        <div className="card-body flex-row items-center">
                            <Clock3 className="text-error" size={45} />
                            <div>
                                <p>Pending Properties</p>
                                <h2 className="text-3xl font-bold">
                                    {stats.pendingProperties}
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Tables */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Recent Bookings */}
                    <div className="bg-base-100 rounded-3xl shadow border border-base-300">

                        <div className="p-5 border-b border-base-300">
                            <h2 className="font-bold text-xl">
                                Recent Bookings
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tenant</th>
                                        <th>Property</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {stats.recentBookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td>{booking.tenantName || "User"}</td>
                                            <td>{booking.propertyName || booking.title}</td>
                                            <td className="font-bold text-primary">৳ {booking.amount || booking.payAmount || rentAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-base-100 rounded-3xl shadow border border-base-300">

                        <div className="p-5 border-b border-base-300">
                            <h2 className="font-bold text-xl">
                                Recent Users
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {stats.recentUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td><span className="font-bold">{user.name}</span></td>
                                            <td>{user.email}</td>
                                            <td><span className="badge badge-outline badge-primary">{user.role}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

