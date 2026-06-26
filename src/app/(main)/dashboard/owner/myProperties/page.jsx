"use client";
import React, { useEffect, useState } from "react";
import { Edit, Building2, MapPin, DollarSign, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getPropertyByEmail } from "@/lib/api/properties";
import Image from "next/image";
import { DeletePropertyModal } from "@/components/owner/myProperties/DeletePropertyModal";
import UpdatePropertyModal from "@/components/owner/myProperties/UpdatePropertyModal";


export default function OwnerPropertiesTable() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [selectedProperty, setSelectedProperty] = useState(null);
    // const [isUpdateOpen, setIsUpdateOpen] = useState(false);


    const session = useSession();
    // console.log('session in owner my properties page', session);
    const currentOwnerEmail = session?.data?.user?.email;

    useEffect(() => {
        const fetchOwnerProperties = async () => {
            if (!currentOwnerEmail) return;

            try {
                setLoading(true);
                const data = await getPropertyByEmail(currentOwnerEmail);
                // console.log('property data in owner my properties page', data);
                setProperties(data);
            } catch (err) {
                toast.error(err.message || "Failed to load inventory assets.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchOwnerProperties();
    }, [currentOwnerEmail]);

    const handleUpdatePlaceholder = (property) => {
        // setSelectedProperty(property);
        // setIsUpdateOpen(true);
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
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Building2 className="text-primary w-6 h-6" /> Managed Listings Portfolio
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Logged-in Owner: <span className="text-primary font-bold">{currentOwnerEmail}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className="badge badge-xl badge-outline badge-primary tracking-tight ">Total Properties : {properties.length}</h2>
                   </div>
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
                                        <th className="pr-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((item) => (
                                        <tr key={item._id} className="border-b border-base-200 font-medium hover:bg-base-200/40 transition-colors">
                                            {/* Title Column */}
                                            <td className="py-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    {item.images?.[0] && (
                                                        <Image height={48} width={48} src={item.images[0]} alt="Image" className="w-10 h-10 object-cover rounded-xl border border-base-300" />
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
                                                    {/* <button
                                                        onClick={() => handleUpdatePlaceholder(item)}
                                                        
                                                        title="Modify Property Parameters">
                                                        
                                                    </button> */}

                                                    <UpdatePropertyModal
                                                        // isOpen={isUpdateOpen}
                                                        // onOpenChange={setIsUpdateOpen}
                                                        property={item}
                                                        // setProperties={setProperties}
                                                    ></UpdatePropertyModal>

                                                    <DeletePropertyModal item={item} setProperties={setProperties}></DeletePropertyModal>
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
    )
}

