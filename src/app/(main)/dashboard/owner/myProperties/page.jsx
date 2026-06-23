"use client";
import React, { useEffect, useState } from "react";
import { Edit, Trash2, Building2, MapPin, DollarSign, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { getPropertyByEmail } from "@/lib/api/api";
// import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OwnerPropertiesTable() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulated authentication layer email for the logged-in owner
    const currentOwnerEmail = "dipu064@gmail.com";

    // import { getPropertyByEmail } from "@/lib/api/api"; // Adjust file location path accordingly

    const fetchOwnerProperties = async () => {
        try {
            setLoading(true);

            // Call your newly created configuration module method
            const data = await getPropertyByEmail(currentOwnerEmail);

            setProperties(data);
        } catch (err) {
            // Automatically catches any 4xx/5xx or network drops thrown by the API file
            toast.error(err.message || "Failed to load inventory assets.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnerProperties();
    }, []);

    const handleDelete = async (id) => {
        // if (!window.confirm("Are you sure you want to permanently delete this property listing?")) return;
        // try {
        //     await axios.delete(`${API_BASE_URL}/properties/${id}`);
        //     toast.success("Listing removed successfully.");
        //     fetchOwnerProperties(); // Refresh array table data logs
        // } catch (err) {
        //     toast.error("Failed to delete the selected asset.");
        // }
    };

    const handleUpdatePlaceholder = (property) => {
        // toast.info(`Redirecting or opening modal context edit for: ${property.title}`);
        // Wire your modular form layout state modal or routing context here
    };

    // Helper method to assign appropriate styles to the administrative verification status
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "badge-success text-white";
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
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Section Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Building2 className="text-primary w-6 h-6" /> Managed Listings Portfolio
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Logged-in Owner: <span className="text-primary font-bold">{currentOwnerEmail}</span>
                        </p>
                    </div>
                    <button onClick={fetchOwnerProperties} className="btn btn-sm btn-outline rounded-xl font-bold gap-1 normal-case">
                        <RefreshCw className="w-3.5 h-3.5" /> Reload Real-Time Matrix
                    </button>
                </div>

                {/* Table Layout Container */}
                {properties.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        No tracked property configurations match this email address profile registry.
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th className="py-4 pl-6">Property Details</th>
                                        <th>Location Address</th>
                                        <th>Monthly Rent</th>
                                        <th>Status</th>
                                        <th className="pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((item) => (
                                        <tr key={item._id} className="border-b border-base-200 font-medium hover:bg-base-200/40 transition-colors">
                                            {/* Title Column */}
                                            <td className="py-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    {item.images?.[0] && (
                                                        <img src={item.images[0]} alt="" className="w-10 h-10 object-cover rounded-xl border border-base-300" />
                                                    )}
                                                    <div>
                                                        <div className="font-extrabold text-base-content max-w-50 truncate">{item.title}</div>
                                                        <div className="text-[11px] text-neutral-400 font-semibold">{item.propertyType || "Apartment"}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Location Column */}
                                            <td>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 max-w-45 truncate">
                                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" /> {item.location}
                                                </div>
                                            </td>

                                            {/* Price Column */}
                                            <td>
                                                <div className="font-black text-primary flex items-center">
                                                    <DollarSign className="w-3.5 h-3.5 -mr-0.5" />{item.rentAmount}
                                                    <span className="text-[10px] font-bold text-neutral-400">/{item.rentType || "mo"}</span>
                                                </div>
                                            </td>

                                            {/* Dynamic Status Tracking Matrix Column */}
                                            <td>
                                                <span className={`badge font-black text-[11px] py-2.5 px-3 rounded-xl border-none tracking-wide shadow-sm uppercase ${getStatusStyle(item.status)}`}>
                                                    {item.status || "Pending"}
                                                </span>
                                            </td>

                                            {/* Action Items Column */}
                                            <td className="pr-6 text-right py-4">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        onClick={() => handleUpdatePlaceholder(item)}
                                                        className="btn btn-square btn-sm btn-ghost hover:bg-base-200 rounded-lg text-neutral-500"
                                                        title="Modify Property Parameters"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-square btn-sm btn-ghost hover:bg-error/10 rounded-lg text-error"
                                                        title="Purge From Catalog"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
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
