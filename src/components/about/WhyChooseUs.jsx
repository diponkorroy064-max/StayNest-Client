"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Search,
    Home,
    Headphones,
} from "lucide-react";

const features = [
    {
        title: "Verified Properties",
        icon: ShieldCheck,
        desc: "Every listing is reviewed to ensure authenticity."
    },
    {
        title: "Smart Search",
        icon: Search,
        desc: "Find homes faster using advanced filters."
    },
    {
        title: "Affordable Rentals",
        icon: Home,
        desc: "Thousands of homes for every budget."
    },
    {
        title: "24/7 Support",
        icon: Headphones,
        desc: "Our team is always ready to help."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-pink-50">
            <div className="container mx-auto px-5">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Everything you need to find your perfect home.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * .2 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow"
                        >
                            <item.icon className="w-12 h-12 text-pink-500 mb-5" />

                            <h3 className="text-xl font-semibold mb-3">
                                {item.title}
                            </h3>

                            <p className="text-gray-600">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}

