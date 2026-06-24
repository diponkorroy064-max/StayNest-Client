"use client";
import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, RefreshCw, DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import { getPropertiesData } from "@/lib/api/properties";
import PropertyCard from "@/components/home/PropertyCard";

export default function AllPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters State---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const propertyTypes = ["Apartment", "House", "Studio", "Villa"];

    // 1. Initial Data Load Fetch---
    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const data = await getPropertiesData();
                setProperties(data || []);
                setFilteredProperties(data || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load listings.");
            } finally {
                setLoading(false);
            }
        };
        loadProperties();
    }, []);


    // 2. Client-side Filtering Logic (No infinite loops)---
    useEffect(() => {
        let result = [...properties];

        if (searchQuery.trim() !== "") {
            result = result.filter(
                (p) =>
                    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.location?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedType) {
            result = result.filter((p) => p.propertyType === selectedType);
        }
        if (maxPrice) {
            result = result.filter((p) => p.rentAmount <= maxPrice);
        }

        setFilteredProperties(result);
    }, [searchQuery, selectedType, maxPrice, properties]); // Clean dependencies

    const handleReset = () => {
        setSearchQuery("");
        setSelectedType("");
        setMaxPrice("");
    };


    return (
        <div className="min-h-screen bg-base-200 text-base-content py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center md:text-left border-b border-base-300 pb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Explore Accommodations</h1>
                    <p className="text-sm text-neutral-500 mt-2">Find and filter through verified rental properties contextually.</p>
                </div>

                {/* Search Layout Grid Filter Controller */}
                <div className="bg-base-100 p-5 rounded-2xl shadow-md border border-base-300 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                    {/* Search Field */}
                    <div className="form-control w-full md:col-span-1">
                        <label className="label py-1"><span className="label-text font-semibold flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> Search</span></label>
                        <input
                            type="text"
                            placeholder="Location or title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered w-full rounded-xl focus:outline-primary bg-base-100"
                        />
                    </div>

                    {/* Property Type Dropdown */}
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text font-semibold flex items-center gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" /> Type</span></label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="select select-bordered w-full rounded-xl focus:outline-primary font-medium"
                        >
                            <option value="">All Structural Types</option>
                            {propertyTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Max Budget Input Field (Added back to complete grid alignment) */}
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text font-semibold flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Max Rent</span></label>
                        <input
                            type="number"
                            placeholder="Max budget..."
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="input input-bordered w-full rounded-xl focus:outline-primary bg-base-100"
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-outline btn-neutral rounded-xl w-full flex items-center gap-2 normal-case font-bold h-12"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset Filters
                    </button>
                </div>

                {/* Content Pipeline Render */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-300 shadow-sm">
                        <p className="text-lg font-bold text-neutral-500">No properties found matching criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

