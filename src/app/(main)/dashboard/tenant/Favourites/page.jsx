"use client";
import React, { useEffect, useState } from "react";
import { HeartCrack, MapPin, DollarSign, RefreshCw, Building } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getFavouritesByEmail, removeFromFavorites } from "@/lib/api/favourites";
import { useSession } from "@/lib/auth-client";


export default function TenantFavoritesPage() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Static session matching our prior user context profiles
    const session = useSession();
    const currentUserEmail = session?.data?.user?.email;
    // console.log("currentUserEmail", currentUserEmail);

    const fetchFavorites = async () => {
        // if (!currentUserEmail) return;
        try {
            setLoading(true);
            const data = await getFavouritesByEmail(currentUserEmail);
            // console.log('email Based data', data);
            setFavourites(data || []);
        } catch (err) {
            toast.error(err.message || "Failed to load your favorite shortcuts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!currentUserEmail) return;
        fetchFavorites();
    }, [currentUserEmail]);
    // console.log(favourites);


    const handleRemove = async (favouriteId) => {
        console.log("Deleting:", favouriteId);

        try {
            await removeFromFavorites(favouriteId);
            toast.success("Removed from your list.");
            setFavourites((prev) => prev.filter((item) => item._id !== favouriteId));
        }
        catch (err) {
            toast.error(err.message || "Failed handling deletion pipeline.");
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

                {/* Section Context Header */}
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Building className="text-primary w-6 h-6" /> Saved Property Catalog
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            Review or purge your bookmarked configurations.
                        </p>
                    </div>
                    <button onClick={fetchFavorites} className="btn btn-sm btn-outline rounded-xl font-bold gap-1 normal-case">
                        <RefreshCw className="w-3.5 h-3.5" /> Synchronize List
                    </button>
                </div>

                {/* Data Table Matrix */}
                {favourites.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        Your favorites queue is currently empty.
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 font-black text-neutral-400 text-xs uppercase bg-base-200/50">
                                        <th className="py-4 pl-6">Property Details</th>
                                        <th>Location Address</th>
                                        <th>Tariff Cost</th>
                                        <th className="pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favourites.map((fav) => (
                                        <tr key={fav._id} className="border-b border-base-200 font-medium hover:bg-base-200/40 transition-colors">
                                            {/* Nested Property Target Profile Details */}
                                            <td className="py-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    {fav.images?.length > 0 && (
                                                        <Image
                                                            src={fav.images[0]}
                                                            width={48}
                                                            height={48}
                                                            alt={fav.propertyTitle || "Property"}
                                                            className="w-12 h-12 object-cover rounded-xl border border-base-300"
                                                        />
                                                    )}

                                                    <div>
                                                        <div className="font-extrabold text-base-content max-w-55 truncate">
                                                            {fav.title || "Unknown Asset Listing"}
                                                        </div>
                                                        <div className="text-[10px] font-mono font-semibold text-neutral-400 mt-0.5 uppercase">
                                                            REF: {fav.propertyId?.substring(0, 8)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Location Data Vector */}
                                            <td>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 max-w-50 truncate">
                                                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> {fav.location || "N/A"}
                                                </div>
                                            </td>

                                            {/* Rent Amount */}
                                            <td>
                                                <div className="font-black text-primary flex items-center">
                                                    <DollarSign className="w-3.5 h-3.5 -mr-0.5" />{fav.rentAmount || "0"}
                                                    <span className="text-[10px] font-bold text-neutral-400">/mo</span>
                                                </div>
                                            </td>

                                            {/* Interactive System Removal Trigger */}
                                            <td className="pr-6 text-right py-4">
                                                <button
                                                    onClick={() => handleRemove(fav._id)}
                                                    className="btn btn-sm btn-outline btn-error font-bold normal-case rounded-xl gap-1"
                                                    title="Remove execution binding"
                                                >
                                                    <HeartCrack className="w-4 h-4" /> Remove
                                                </button>
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

