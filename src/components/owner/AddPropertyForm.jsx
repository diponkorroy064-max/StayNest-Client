"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Home, MapPin, DollarSign, BedDouble, Bath, Maximize, Image as ImageIcon, Settings, FileText, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";


export default function AddPropertyForm() {
    const [loading, setLoading] = useState(false);

    const standardAmenities = [
        "Wi-Fi", "Air Conditioning", "Swimming Pool", "Gym",
        "Parking", "Kitchen", "Washing Machine", "Pet Friendly"
    ];
    const propertyTypes = ["Apartment", "House", "Studio", "Villa"];
    const rentTypes = ["Daily", "Weekly", "Monthly"];

    // Initialize React Hook Form---
    const { register, handleSubmit, control, reset, setValue, watch } = useForm({
        defaultValues: {
            title: "",
            description: "",
            location: "",
            propertyType: "",
            rentAmount: "",
            rentType: "Monthly",
            bedrooms: "",
            bathrooms: "",
            size: "",
            imageUrl1: "",
            imageUrl2: "",
            amenities: [],
            extraFeatures: [{ key: "", value: "" }]
        }
    });

    // Dynamic field array for custom specifications
    const { fields, append, remove } = useFieldArray({
        control,
        name: "extraFeatures"
    });

    const selectedAmenities = watch("amenities") || [];

    const handleAmenityToggle = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setValue("amenities", selectedAmenities.filter((item) => item !== amenity));
        } else {
            setValue("amenities", [...selectedAmenities, amenity]);
        }
    };

    const session = useSession();
    const user = session?.data?.user;
    // console.log('user from addPropertyForm', user);

    const onSubmitForm = async (data) => {
        setLoading(false);

        const propertyData = {
            title: data.title,
            description: data.description,
            location: data.location,
            propertyType: data.propertyType,
            rentAmount: Number(data.rentAmount),
            rentType: data.rentType,
            bedrooms: Number(data.bedrooms),
            bathrooms: Number(data.bathrooms),
            size: data.size,
            images: [data.imageUrl1, data.imageUrl2].filter(Boolean),
            amenities: data.amenities,
            extraFeatures: data.extraFeatures.filter(f => f.key && f.value),
            status: "Pending",
            ownerEmail: user?.email
        };
        // console.log(propertyData);

        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(propertyData),
            });

            if (res.ok) {
                toast.success("Property listed successfully! Awaiting Admin approval.");
                reset();
            } else {
                toast.error("Failed to submit property. Try again.");
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-4xl mx-auto bg-base-100 p-6 md:p-10 rounded-3xl shadow-xl border border-base-200 space-y-8 text-base-content">

            {/* Form Header */}
            <div className="border-b border-base-300 pb-5">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-base-content">
                    <Home className="w-6 h-6 text-primary" /> List New Property
                </h2>
                <p className="text-sm text-neutral-500 mt-1">Provide accurate structural layouts, specs, and pricing details below.</p>
            </div>

            {/* Section 1: Core Details */}
            <div className="bg-base-200/40 p-5 rounded-2xl border border-base-200 space-y-4">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    <FileText className="w-4 h-4 text-primary" /> Core Information
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Property Title</span></label>
                    <div className="relative flex items-center">
                        <Home className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="text"
                            required
                            placeholder="e.g., Luxury 2BR Apartment with Skyline View"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("title")}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Detailed Description</span></label>
                    <textarea
                        required
                        placeholder="Describe proximity to transit points, building layout context, rules, etc."
                        className="textarea textarea-bordered w-full rounded-xl min-h-27.5 focus:outline-primary p-3"
                    {...register("description")}
                    />
                </div>
            </div>

            {/* Section 2: Location & Logistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-base-200/40 p-5 rounded-2xl border border-base-200">
                <div className="col-span-1 md:col-span-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    <MapPin className="w-4 h-4 text-primary" /> Logistics & Pricing
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Location Address</span></label>
                    <div className="relative flex items-center">
                        <MapPin className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="text"
                            required
                            placeholder="e.g., Gulshan, Dhaka"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("location")}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Property Type</span></label>
                    <select
                        required
                        className="select select-bordered w-full rounded-xl focus:outline-primary font-medium"
                    {...register("propertyType")}
                    >
                        <option value="" disabled>Select Type</option>
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2 items-end w-full">
                    <div className="form-control w-3/5">
                        <label className="label py-1"><span className="label-text font-semibold">Rent Price</span></label>
                        <div className="relative flex items-center">
                            <DollarSign className="absolute left-3 text-neutral-400 w-4 h-4 z-10" />
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="Price"
                                className="input input-bordered w-full pl-9 rounded-xl focus:outline-primary"
                            {...register("rentAmount")}
                            />
                        </div>
                    </div>

                    <div className="w-2/5">
                        <select
                            className="select select-bordered w-full rounded-xl focus:outline-primary font-medium"
                        {...register("rentType")}
                        >
                            {rentTypes.map((cycle) => (
                                <option key={cycle} value={cycle}>{cycle}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 3: Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-base-200/40 p-5 rounded-2xl border border-base-200">
                <div className="col-span-1 md:col-span-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    <Maximize className="w-4 h-4 text-primary" /> Physical Layout Specs
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Bedrooms</span></label>
                    <div className="relative flex items-center">
                        <BedDouble className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="number"
                            required
                            min="0"
                            placeholder="e.g., 2"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("bedrooms")}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Bathrooms</span></label>
                    <div className="relative flex items-center">
                        <Bath className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="number"
                            required
                            min="0"
                            placeholder="e.g., 2"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("bathrooms")}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Property Size</span></label>
                    <div className="relative flex items-center">
                        <Maximize className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="text"
                            required
                            placeholder="e.g., 1450 sqft"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("size")}
                        />
                    </div>
                </div>
            </div>

            {/* Section 4: Media Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-base-200/40 p-5 rounded-2xl border border-base-200">
                <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                    <ImageIcon className="w-4 h-4 text-primary" /> Media Links
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Primary Image URL</span></label>
                    <div className="relative flex items-center">
                        <ImageIcon className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="url"
                            required
                            placeholder="https://example.com/image1.jpg"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("imageUrl1")}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label py-1"><span className="label-text font-semibold">Secondary Image URL (Optional)</span></label>
                    <div className="relative flex items-center">
                        <ImageIcon className="absolute left-4 text-neutral-400 w-4 h-4 z-10" />
                        <input
                            type="url"
                            placeholder="https://example.com/image2.jpg"
                            className="input input-bordered w-full pl-11 rounded-xl focus:outline-primary"
                        {...register("imageUrl2")}
                        />
                    </div>
                </div>
            </div>

            {/* Section 5: Core Amenities */}
            <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Core Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-base-200/40 border border-base-200">
                    {standardAmenities.map((amenity) => {
                        const isChecked = selectedAmenities.includes(amenity);
                        return (
                            <div
                                key={amenity}
                                onClick={() => handleAmenityToggle(amenity)}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${isChecked
                                    ? "bg-primary/10 border-primary/40 shadow-sm"
                                    : "bg-base-100 border-base-300 hover:border-neutral-400"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    readOnly
                                    className="checkbox checkbox-primary checkbox-sm rounded-md"
                                />
                                <span className="font-medium text-xs sm:text-sm">{amenity}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section 6: Custom Specifications */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-primary" /> Custom Specifications
                    </label>
                    <button
                        type="button"
                        onClick={() => append({ key: "", value: "" })}
                        className="btn btn-sm btn-outline btn-primary rounded-xl font-bold px-4 text-xs normal-case"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Specification
                    </button>
                </div>

                <div className="space-y-3 max-h-62.5 overflow-y-auto pr-1">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3 bg-base-200/20 p-2 rounded-xl border border-base-200">
                            <input
                                placeholder="Feature label (e.g., Floor)"
                                className="input input-bordered input-md w-full rounded-xl bg-base-100 focus:outline-primary"
                            {...register(`extraFeatures.${index}.key`)}
                            />
                            <input
                                placeholder="Value (e.g., 4th floor)"
                                className="input input-bordered input-md w-full rounded-xl bg-base-100 focus:outline-primary"
                            {...register(`extraFeatures.${index}.value`)}
                            />
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn btn-square btn-ghost btn-md text-error hover:bg-error/10 rounded-xl"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-base-300">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-block normal-case font-bold text-white bg-slate-950 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 border-none shadow-lg rounded-xl h-12 min-h-12"
                >
                    {loading && <span className="loading loading-spinner"></span>}
                    Submit Property Listing
                </button>
            </div>
        </form>
    );
}
