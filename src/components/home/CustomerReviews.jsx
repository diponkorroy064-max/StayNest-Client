"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Apartment Renter",
        image: "https://i.pravatar.cc/150?img=32",
        rating: 5,
        review:
            "StayNest made finding my apartment incredibly easy. The property details were accurate, and the booking process was smooth from start to finish.",
    },
    {
        id: 2,
        name: "John Williams",
        role: "Business Traveler",
        image: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        review:
            "I booked a short-term stay within minutes. The property was exactly as shown, and customer support was always available when needed.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Property Owner",
        image: "https://i.pravatar.cc/150?img=45",
        rating: 5,
        review:
            "Listing my property on StayNest has been a wonderful experience. Managing bookings is simple, and I've reached many genuine renters.",
    },
];

export default function CustomerReviews() {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-5">
                {/* Section Heading */}
                <div className="max-w-2xl mx-auto text-center mb-14">
                    <span className="text-primary font-semibold uppercase tracking-widest">
                        Testimonials
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3">
                        What Our Customers Say
                    </h2>

                    <p className="mt-5 text-default-500 leading-7">
                        Thousands of renters and property owners trust StayNest for
                        secure bookings, verified listings, and an exceptional
                        rental experience.
                    </p>
                </div>

                {/* Review Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl bg-base-100 p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft
                                className="absolute top-6 right-6 text-primary/20"
                                size={42}
                            />

                            {/* User */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                />

                                <div>
                                    <h3 className="font-bold text-lg">{review.name}</h3>
                                    <p className="text-sm text-default-500">
                                        {review.role}
                                    </p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 text-yellow-500 mt-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="mt-5 text-default-500 leading-7">
                                "{review.review}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

