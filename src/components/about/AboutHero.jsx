"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <section
            className="hero min-h-[60vh]"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
            }}
        >
            <div className="hero-overlay bg-black/60"></div>

            <div className="hero-content text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold">
                        About StayNest
                    </h1>

                    <p className="mt-5 max-w-3xl text-lg">
                        Making rental property searching easier, safer,
                        and more transparent for everyone.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

