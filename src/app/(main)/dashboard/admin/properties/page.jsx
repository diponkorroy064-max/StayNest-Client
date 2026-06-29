"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Building2, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { getPropertiesData } from "@/lib/api/properties";
// import {
//     getAllProperties,
//     updatePropertyStatus,
//     deletePropertyByAdmin,
// } from "@/lib/api/properties";

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            setLoading(true);

            const data = await getPropertiesData();

            setProperties(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        // try {
        //     await updatePropertyStatus(id, status);

        //     setProperties((prev) =>
        //         prev.map((item) =>
        //             item._id === id
        //                 ? { ...item, status }
        //                 : item
        //         )
        //     );

        //     toast.success(`Property ${status}`);
        // } catch (err) {
        //     toast.error(err.message);
        // }
    };

    const handleDelete = async (id) => {
        // try {
        //     await deletePropertyByAdmin(id);

        //     setProperties((prev) =>
        //         prev.filter((item) => item._id !== id)
        //     );

        //     toast.success("Property deleted");
        // } catch (err) {
        //     toast.error(err.message);
        // }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">

            <div className="bg-base-100 p-6 rounded-2xl shadow border">
                <h1 className="text-2xl font-black flex items-center gap-2">
                    <Building2 className="text-primary" />
                    Property Management
                </h1>

                <p className="text-sm text-neutral-500 mt-1">
                    Total Properties: {properties.length}
                </p>
            </div>

            <div className="bg-base-100 rounded-2xl border shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>Property</th>
                                {/* <th>Owner</th> */}
                                <th>Location</th>
                                <th>Rent</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {properties.map((property) => (
                                <tr key={property._id}>

                                    <td>
                                        <div className="flex items-center gap-3">

                                            <Image
                                                src={property.images?.[0]}
                                                alt={property.title}
                                                width={50}
                                                height={50}
                                                className="rounded-lg object-cover"
                                            />

                                            <div>
                                                <h3 className="font-bold">
                                                    {property.title}
                                                </h3>

                                                <p className="text-xs text-neutral-500">
                                                    {property.propertyType}
                                                </p>

                                                <p className="text-xs text-neutral-500">
                                                    {property.ownerEmail}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* <td>
                                        {property.ownerEmail}
                                    </td> */}

                                    <td>
                                        {property.location}
                                    </td>

                                    <td>
                                        ৳ {property.rentAmount}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${property.status === "Approved"
                                                    ? "badge-success"
                                                    : property.status === "Rejected"
                                                        ? "badge-error"
                                                        : "badge-warning"
                                                }`}
                                        >
                                            {property.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        property._id,
                                                        "Approved"
                                                    )
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                <CheckCircle size={16} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        property._id,
                                                        "Rejected"
                                                    )
                                                }
                                                className="btn btn-error btn-sm"
                                            >
                                                <XCircle size={16} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(property._id)
                                                }
                                                className="btn btn-outline btn-error btn-sm"
                                            >
                                                <Trash2 size={16} />
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
