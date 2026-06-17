"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({links}) {
    const pathname = usePathname();

    return (
        <ul className="flex items-center gap-8">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`font-medium transition ${pathname === link.href
                                ? "text-primary"
                                : "hover:text-primary"
                            }`}
                    >
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

