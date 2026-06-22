"use client";

import { motion } from "framer-motion";

const team = [
    {
        name: "John Smith",
        role: "Founder",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sarah Wilson",
        role: "Marketing",
        image:
            "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "David Brown",
        role: "Property Manager",
        image:
            "https://randomuser.me/api/portraits/men/15.jpg",
    },
];

export default function TeamSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-5">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        Meet Our Team
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Passionate people behind HomeHaven.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: index * .2 }}
                            viewport={{ once: true }}
                            className="bg-pink-50 rounded-3xl overflow-hidden shadow"
                        >
                            <img
                                src={member.image}
                                className="w-full h-80 object-cover"
                            />

                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold">
                                    {member.name}
                                </h3>

                                <p className="text-pink-500">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}

