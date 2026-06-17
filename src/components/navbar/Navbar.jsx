"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileDrawer from "./MobileDrawer";

const links = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "All Properties",
        href: "/properties",
    },
    {
        title: "About",
        href: "/about",
    },
];


export default function Navbar() {
    const user = null; // Replace with Better Auth session later

    return (
        <header className="sticky top-0 z-50 border-b bg-base-100/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">

                <Logo/>

                <div className="hidden lg:block">
                    <NavLinks links={links} />
                </div>

                <div className="hidden items-center gap-3 lg:flex">
                    {!user ? (
                        <>
                            <Button as={Link} href="/login" variant="light" radius="full">Login</Button>
                            <Button as={Link} href="/register" color="primary" radius="full">Register</Button>
                        </>
                    ) : (
                        <UserMenu />
                    )}
                </div>

                <div className="lg:hidden">
                    <MobileDrawer links={links}/>
                </div>
            </div>
        </header>
    );
}

