"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1484154218962-a197022b5858"
                        width={700}
                        height={600}
                        alt="StayNest"
                        className="rounded-3xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-4xl font-bold mb-5">
                        Our Story
                    </h2>

                    <p className="text-base-content/70 leading-8">
                        StayNest was founded with one simple goal:
                        making property rentals easy and trustworthy.
                        We connect tenants and property owners through
                        a secure and transparent platform where everyone
                        can find the perfect place to call home.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

