"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaStar,
} from "react-icons/fa";

const properties = [
    {
        id: 1,
        title: "Family Apartment",
        location: "Dhanmondi, Dhaka",
        price: "৳22,000",
        image: "https://i.ibb.co/WvRKD3Zw/flat1.avif",
        beds: 3,
        baths: 2,
        area: "1450 sqft",
        rating: 4.9,
    },
    {
        id: 2,
        title: "Luxury Lake View Flat",
        location: "Gulshan, Dhaka",
        price: "৳38,000",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        beds: 4,
        baths: 3,
        area: "2100 sqft",
        rating: 4.8,
    },
    {
        id: 3,
        title: "Cozy Studio Apartment",
        location: "Khulna",
        price: "৳15,500",
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156",
        beds: 2,
        baths: 1,
        area: "980 sqft",
        rating: 4.7,
    },
    {
        id: 4,
        title: "Premium Duplex House",
        location: "Chattogram",
        price: "৳45,000",
        image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        beds: 5,
        baths: 4,
        area: "3200 sqft",
        rating: 5.0,
    },
];

export default function RecentlyAddedProperties() {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="gap-6 mb-14 text-center">
                    <div>
                        <span className="text-primary font-semibold uppercase tracking-[3px]">
                            New Listings
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3">
                            Recently Added Properties
                        </h2>

                        <p className="mt-4 text-default-500 leading-7 text-center px-5">
                            Browse the newest verified properties added to StayNest.
                            Find apartments, villas, and family homes that perfectly
                            match your lifestyle.
                        </p>
                    </div>

                    <Link
                        href="/properties"
                        className="btn btn-outline rounded-xl mt-4">
                        View All Properties
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group overflow-hidden rounded-3xl bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                                <span className="absolute left-5 top-5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                                    New
                                </span>

                                <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold">
                                    <FaStar className="text-yellow-500" />
                                    {property.rating}
                                </div>

                                <div className="absolute bottom-5 left-5">
                                    <h3 className="text-2xl font-bold text-white">
                                        {property.price}
                                        <span className="text-sm font-normal">
                                            /month
                                        </span>
                                    </h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold">
                                    {property.title}
                                </h3>

                                <p className="mt-2 flex items-center gap-2 text-default-500">
                                    <FaMapMarkerAlt className="text-primary" />
                                    {property.location}
                                </p>

                                {/* Features */}
                                <div className="mt-6 flex justify-between border-y border-base-300 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaBed className="text-primary" />
                                        {property.beds} Beds
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaBath className="text-primary" />
                                        {property.baths} Baths
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaRulerCombined className="text-primary" />
                                        {property.area}
                                    </div>
                                </div>

                                <Link
                                    href={`/properties/${property.id}`}
                                    className="btn btn-primary w-full mt-6 rounded-xl"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

