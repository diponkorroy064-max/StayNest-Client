"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { sidebarLinks } from "./SidebarLinks";


export default function DashboardSidebar({ role = "admin" }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = sidebarLinks[role] || [];

    return (
        <>
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b px-5 py-4">
                <h2 className="text-2xl font-bold text-pink-500">
                    StayNest
                </h2>

                <button onClick={() => setOpen(true)}>
                    <Menu size={28} />
                </button>
            </header>

            {/* Overlay */}
            {open && (
                <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden"/>
            )}

            {/* Sidebar */}
            <aside className={` fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:z-30`}>

                {/* Logo */}
                <div className="flex items-center justify-between border-b p-6">
                    <h1 className="text-3xl font-bold text-pink-500"> StayNest</h1>

                    <button className="lg:hidden" onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-5 space-y-2">
                    {links.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={` flex items-center gap-3 rounded-xl px-4 py-3 transition ${active ? "bg-pink-500 text-white" : "hover:bg-pink-100"}`}>
                                <Icon />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
