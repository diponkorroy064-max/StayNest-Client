"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MobileDrawer({ links }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="relative">
            {/* Menu button */}
            <Button isIconOnly variant="light" onPress={() => setIsOpen(!isOpen)}>
                <Bars />
            </Button>

            {/* Overlay (click outside to close) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Dropdown menu */}
            <div className={`absolute right-0 top-6 mt-2 w-48 rounded-xl shadow-lg z-50 bg-white border border-gray-200 transform transition-all duration-200 origin-top-left ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={` block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 ${isActive ? "bg-black text-white" : "text-gray-700"}`}>
                            {link.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
