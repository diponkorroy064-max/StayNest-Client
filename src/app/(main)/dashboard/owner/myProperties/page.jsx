"use client";
import React, { useEffect, useState } from "react";
import { Plus, MapPin, BedDouble, Bath, Maximize, Trash2, Edit, Building2 } from "lucide-react";
import { toast } from "react-toastify";
// import axios from "axios";

// Assuming you add these methods to your existing front-end API file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function MyPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);

    // Form Field States
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [rentAmount, setRentAmount] = useState("");
    const [rentType, setRentType] = useState("mo");
    const [propertyType, setPropertyType] = useState("Apartment");
    const [bedrooms, setBedrooms] = useState("1");
    const [bathrooms, setBathrooms] = useState("1");
    const [size, setSize] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Temporary owner session simulation identification
    const ownerEmail = "diponkor@example.com";

    const fetchOwnerProperties = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/owner/properties?email=${ownerEmail}`);
            setProperties(response.data);
        } catch (err) {
            toast.error("Failed to retrieve listed inventory architectures.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnerProperties();
    }, []);

    const openCreateModal = () => {
        setEditingProperty(null);
        setTitle("");
        setLocation("");
        setRentAmount("");
        setRentType("mo");
        setPropertyType("Apartment");
        setBedrooms("1");
        setBathrooms("1");
        setSize("");
        setImageUrl("");
        setIsModalOpen(true);
    };

    const openEditModal = (property) => {
        setEditingProperty(property);
        setTitle(property.title);
        setLocation(property.location);
        setRentAmount(property.rentAmount);
        setRentType(property.rentType || "mo");
        setPropertyType(property.propertyType);
        setBedrooms(property.bedrooms.toString());
        setBathrooms(property.bathrooms.toString());
        setSize(property.size || "");
        setImageUrl(property.images?.[0] || "");
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            location,
            rentAmount: Number(rentAmount),
            rentType,
            propertyType,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            size: size || "N/A",
            images: imageUrl ? [imageUrl] : [],
            ownerEmail
        };

        try {
            if (editingProperty) {
                await axios.put(`${API_BASE_URL}/properties/${editingProperty._id}`, payload);
                toast.success("Listing updated effectively!");
            } else {
                await axios.post(`${API_BASE_URL}/properties`, payload);
                toast.success("New structural deployment logged safely!");
            }
            setIsModalOpen(false);
            fetchOwnerProperties();
        } catch (err) {
            toast.error("Could not finalize asset serialization.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you certain you want to purge this asset listing specification?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/properties/${id}`);
            toast.success("Asset configuration removed successfully.");
            fetchOwnerProperties();
        } catch (err) {
            toast.error("Failed executing structural destruction sequence.");
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

                {/* Dashboard Action Banner Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Building2 className="text-primary w-6 h-6" /> Managed Portfolios
                        </h1>
                        <p className="text-sm font-semibold text-neutral-400 mt-0.5">
                            You currently hold {properties.length} active listings on lease rotation vectors.
                        </p>
                    </div>
                    <button onClick={openCreateModal} className="btn btn-primary rounded-xl font-bold normal-case gap-1.5 shadow-md">
                        <Plus className="w-5 h-5" /> Expand Catalog
                    </button>
                </div>

                {/* Properties Grid Representation */}
                {properties.length === 0 ? (
                    <div className="p-12 bg-base-100 border border-base-300 rounded-3xl text-center text-neutral-400 font-bold">
                        No property modules tracked under your verification parameters. Expand your portfolio matrix above.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <div key={property._id} className="card bg-base-100 border border-base-300 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                                <figure className="h-48 relative bg-neutral-900">
                                    <img
                                        src={property.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80"}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 badge badge-neutral bg-black/60 text-white border-none text-xs font-bold px-2 py-1.5 rounded-md">
                                        {property.propertyType}
                                    </div>
                                </figure>

                                <div className="card-body p-5 space-y-3">
                                    <div>
                                        <h3 className="font-extrabold text-lg text-base-content truncate">{property.title}</h3>
                                        <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1 font-semibold">
                                            <MapPin className="w-3.5 h-3.5 shrink-0" /> {property.location}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 bg-base-200 p-2 rounded-xl text-center text-xs font-bold text-neutral-500">
                                        <div className="flex flex-col items-center"><BedDouble className="w-3.5 h-3.5 text-primary mb-0.5" />{property.bedrooms} Bed</div>
                                        <div className="flex flex-col items-center"><Bath className="w-3.5 h-3.5 text-primary mb-0.5" />{property.bathrooms} Bath</div>
                                        <div className="flex flex-col items-center truncate"><Maximize className="w-3.5 h-3.5 text-primary mb-0.5" />{property.size}</div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-base-200">
                                        <span className="text-xl font-black text-primary">
                                            ${property.rentAmount}
                                            <span className="text-xs font-semibold text-neutral-400">/{property.rentType}</span>
                                        </span>
                                        <div className="flex gap-1.5">
                                            <button onClick={() => openEditModal(property)} className="btn btn-square btn-sm btn-ghost hover:bg-base-200 rounded-lg text-neutral-500" title="Modify Context">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(property._id)} className="btn btn-square btn-sm btn-ghost hover:bg-error/10 rounded-lg text-error" title="Purge Record">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CREATION & MODIFICATION MODAL PORTAL */}
                {isModalOpen && (
                    <div className="modal modal-open bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fixed inset-0">
                        <div className="modal-box bg-base-100 border border-base-300 rounded-3xl max-w-lg p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 font-black">✕</button>

                            <h3 className="text-xl font-black border-b pb-3 mb-4">
                                {editingProperty ? "Modify Asset Specifics" : "Log New Asset Architecture"}
                            </h3>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Property Title</span></label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Luxurious Highrise Condo..." className="input input-bordered rounded-xl font-medium" required />
                                </div>

                                <div className="form-control">
                                    <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Physical Location Address</span></label>
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Gulshan-2, Dhaka" className="input input-bordered rounded-xl font-medium" required />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Rent Target Value ($)</span></label>
                                        <input type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} placeholder="1200" className="input input-bordered rounded-xl font-medium" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Tariff Frequency</span></label>
                                        <select value={rentType} onChange={(e) => setRentType(e.target.value)} className="select select-bordered rounded-xl font-bold">
                                            <option value="mo">Per Month</option>
                                            <option value="wk">Per Week</option>
                                            <option value="yr">Per Year</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Classification Layout</span></label>
                                        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="select select-bordered rounded-xl font-bold">
                                            <option value="Apartment">Apartment</option>
                                            <option value="Duplex Villa">Duplex Villa</option>
                                            <option value="Penthouse">Penthouse</option>
                                            <option value="Studio Room">Studio Room</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Size Footprint (e.g., Sqft)</span></label>
                                        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="1450 Sqft" className="input input-bordered rounded-xl font-medium" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Bedrooms Count</span></label>
                                        <input type="number" min="0" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="input input-bordered rounded-xl font-medium" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Bathrooms Count</span></label>
                                        <input type="number" min="0" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="input input-bordered rounded-xl font-medium" required />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label py-0.5"><span className="label-text font-bold text-neutral-500 text-xs">Display Asset Cover Image (URL)</span></label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://unsplash.com/..." className="input input-bordered rounded-xl font-medium" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block rounded-xl font-bold normal-case shadow-md mt-2">
                                    {editingProperty ? "Save Changes" : "Deploy Asset Listing"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
