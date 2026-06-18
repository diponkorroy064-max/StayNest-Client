"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Banner() {
    return (
        <section className="container mx-auto relative min-h-screen flex items-center py-10 z-10"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 w-full text-center">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5 }}
                        className="inline-block bg-primary text-white px-5 py-2 rounded-full font-medium"
                    >
                        🏡 Trusted Rental Marketplace
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .2, duration: .7 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
                        Find Your Perfect
                        <br />
                        Home with
                        <span className="text-primary"> StayNest</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .5 }}
                        className="text-gray-200 text-lg mt-6 max-w-2xl mx-auto leading-8"
                    >
                        Browse verified apartments, houses, villas and commercial
                        properties across Bangladesh. Rent confidently from trusted
                        property owners.
                    </motion.p>

                    {/* Search Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .8 }}
                        className="bg-white rounded-2xl p-4 mt-10 shadow-2xl"
                    >
                        <div className="grid lg:grid-cols-4 gap-4">
                            <input
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full"
                            />

                            <select className="select select-bordered w-full">
                                <option>Property Type</option>
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Villa</option>
                                <option>Office</option>
                            </select>

                            <select className="select select-bordered w-full">
                                <option>Price Range</option>
                                <option>$100 - $500</option>
                                <option>$500 - $1000</option>
                                <option>$1000+</option>
                            </select>

                            <button className="btn btn-primary w-full">
                                <Search size={18} />
                                Search
                            </button>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex justify-center flex-wrap gap-5 mt-8">
                        <button className="btn btn-primary btn-lg">
                            Explore Properties
                        </button>

                        <button className="btn btn-outline btn-lg text-white border-white hover:text-black">
                            List Your Property
                        </button>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="grid grid-cols-3 gap-10 mt-14 max-w-xl mx-auto"
                    >
                        <div>
                            <h2 className="text-4xl font-bold text-white">10K+</h2>
                            <p className="text-gray-300 mt-2">Properties</p>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold text-white">5K+</h2>
                            <p className="text-gray-300 mt-2">Happy Renters</p>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold text-white">100+</h2>
                            <p className="text-gray-300 mt-2">Cities</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

