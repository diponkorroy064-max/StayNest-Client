"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const locations = [
    {
        id: 1,
        name: "Dhaka",
        properties: "245+ Properties",
        image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    },
    {
        id: 2,
        name: "Chattogram",
        properties: "180+ Properties",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    },
    {
        id: 3,
        name: "Cox's Bazar",
        properties: "120+ Properties",
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
    },
    {
        id: 4,
        name: "Sylhet",
        properties: "95+ Properties",
        image:
            "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=900&q=80",
    },
];
export default function TopLocations() {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-primary font-semibold uppercase tracking-widest">
                        Explore
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3">
                        Top Locations
                    </h2>

                    <p className="mt-5 text-default-500 leading-7">
                        Find verified rental homes and apartments in Bangladesh's
                        most popular cities.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {locations.map((location, index) => (
                        <motion.div
                            key={location.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/properties?location=${location.name}`}>
                                <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="h-105 w-full object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold">
                                            {location.name}
                                        </h3>

                                        <p className="mt-1 text-gray-200">
                                            {location.properties}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

