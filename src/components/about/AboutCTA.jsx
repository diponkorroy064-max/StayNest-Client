"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
    return (
        <section className="py-24 bg-gray-200 ">

            <motion.div
                initial={{ opacity: 0, scale: .9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="container mx-auto px-5 text-center"
            >
                <h2 className="text-5xl font-bold mb-6">
                    Ready to Find Your Dream Home?
                </h2>

                <p className="text-gray-800 max-w-2xl mx-auto mb-10">
                    Explore verified rental properties across the country and discover the
                    perfect place to call home.
                </p>

                <Link
                    href="/all-properties"
                    className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full font-semibold transition"
                >
                    Browse Properties
                </Link>
            </motion.div>

        </section>
    );
}

