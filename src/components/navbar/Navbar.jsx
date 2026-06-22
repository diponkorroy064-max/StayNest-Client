"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileDrawer from "./MobileDrawer";
import { authClient } from "@/lib/auth-client";
import UserMenu from "./UserMenu";


const links = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "All Properties",
        href: "/allProperties",
    },
    {
        title: "About",
        href: "/about",
    },
];


export default function Navbar() {
    const { data, isPending } = authClient.useSession();
    // console.log("data in navbar", data);
    // console.log(data?.user);
    const user = data?.user;

    return (
        <header className="container mx-auto sticky top-0 z-200 border-b bg-base-100/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">

                <Logo />

                <div className="hidden lg:block">
                    <NavLinks links={links} />
                </div>

                <div className="hidden items-center gap-3 lg:flex">
                    {isPending && <div>Loading...</div>}
                    {
                        !user ? (
                            <>
                                <Link href="/login"><Button variant="danger" radius="full">Login</Button></Link>
                                <Link href="/register"><Button color="primary" radius="full">Register</Button></Link>
                            </>
                        ) : (
                            <UserMenu user={user} />
                        )}
                </div>

                <div className="lg:hidden">
                    <MobileDrawer links={links} />
                </div>
            </div>
        </header>
    );
}

