"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
    FaBuilding,
    FaUsers,
    FaMapMarkedAlt,
    FaAward,
} from "react-icons/fa";

const stats = [
    {
        id: 1,
        icon: <FaBuilding />,
        number: 5000,
        suffix: "+",
        title: "Verified Properties",
        description: "Apartments, villas & family homes",
    },
    {
        id: 2,
        icon: <FaUsers />,
        number: 12000,
        suffix: "+",
        title: "Happy Tenants",
        description: "Successfully rented through StayNest",
    },
    {
        id: 3,
        icon: <FaMapMarkedAlt />,
        number: 25,
        suffix: "+",
        title: "Cities Covered",
        description: "Across Bangladesh",
    },
    {
        id: 4,
        icon: <FaAward />,
        number: 99,
        suffix: "%",
        title: "Customer Satisfaction",
        description: "Based on verified reviews",
    },
];

export default function RentalStatistics() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="text-center mb-16">
                    <span className="text-primary uppercase tracking-[4px] font-semibold">
                        Our Impact
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                        Rental Statistics
                    </h2>

                    <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
                        Thousands of renters and property owners trust StayNest every
                        day. Here's a glimpse of our growing community.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                                {stat.icon}
                            </div>

                            <h3 className="mt-6 text-4xl font-bold text-gray-900">
                                <CountUp
                                    end={stat.number}
                                    duration={2.5}
                                />
                                {stat.suffix}
                            </h3>

                            <h4 className="mt-4 text-lg font-semibold text-gray-800">
                                {stat.title}
                            </h4>

                            <p className="mt-2 text-gray-600 leading-7">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

