"use client";

import { motion } from "framer-motion";
import {
    FaHome,
    FaShieldAlt,
    FaMapMarkedAlt,
    FaHeadset,
} from "react-icons/fa";

const features = [
    {
        icon: <FaHome size={35} />,
        title: "Verified Properties",
        description:
            "Every property is carefully verified to ensure accurate information, quality, and a secure booking experience.",
    },
    {
        icon: <FaShieldAlt size={35} />,
        title: "Secure Payments",
        description:
            "Pay confidently with our secure payment system powered by trusted payment gateways.",
    },
    {
        icon: <FaMapMarkedAlt size={35} />,
        title: "Prime Locations",
        description:
            "Discover apartments, villas, and homes in the best neighborhoods at affordable prices.",
    },
    {
        icon: <FaHeadset size={35} />,
        title: "24/7 Customer Support",
        description:
            "Our dedicated support team is always available to help before, during, and after your booking.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="max-w-2xl mx-auto text-center mb-14">
                    <span className="text-primary font-semibold uppercase tracking-wider">
                        Why StayNest?
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3">
                        Why Choose StayNest
                    </h2>

                    <p className="mt-5 text-default-500 leading-7">
                        We make finding and booking your perfect stay simple, secure,
                        and stress-free. Experience a smarter way to rent properties.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true }}
                            className="group rounded-3xl border border-default-200 bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                {item.title}
                            </h3>

                            <p className="text-default-500 leading-7">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

