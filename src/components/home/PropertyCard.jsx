"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
} from "lucide-react";
import Link from "next/link";


export default function PropertyCard({ property }) {
    // const properties = property;
    // console.log("property from propertyCard", properties);

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: .3 }}
            className="bg-base-100 rounded-3xl overflow-hidden shadow-lg"
        >
            <div className="relative">

                <Image
                    src={property?.images?.[0] || "/placeholder.jpg"}
                    alt={property?.title}
                    width={500}
                    height={350}
                    className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 left-4 badge badge-primary badge-lg">
                    {property?.propertyType}
                </span>

            </div>

            <div className="p-6">

                <h3 className="text-2xl font-bold">
                    {property.title}
                </h3>

                <p className="flex items-center gap-2 mt-2 text-base-content/70">
                    <MapPin size={18} />
                    {property.location}
                </p>

                <div className="flex justify-between mt-6 text-sm">

                    <span className="flex items-center gap-1">
                        <BedDouble size={18} />
                        {property.bedrooms} Beds
                    </span>

                    <span className="flex items-center gap-1">
                        <Bath size={18} />
                        {property?.bathrooms} Baths
                    </span>

                    <span className="flex items-center gap-1">
                        <Maximize size={18} />
                        {property?.size} sqft
                    </span>

                </div>

                <div className="flex justify-between items-center mt-8">

                    <h2 className="text-3xl font-bold text-primary">
                        ৳ {property.rentAmount}
                        <span className="text-base font-normal">
                            /month
                        </span>
                    </h2>

                    <Link href={`/allProperties/${property?._id}`}><button className="btn btn-primary">
                        Details
                    </button></Link>

                </div>

            </div>
        </motion.div>
    );
}

