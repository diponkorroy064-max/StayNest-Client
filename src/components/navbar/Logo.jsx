"use client";
import Link from "next/link";
import { House } from "lucide-react";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-primary p-2 text-white">
                <House size={22} />
            </div>

            <div>
                <h2 className="text-xl font-black">
                    StayNest
                </h2>

                <p className="-mt-1 text-xs text-gray-500">
                    Rent Better
                </p>
            </div>
        </Link>
    );
}


