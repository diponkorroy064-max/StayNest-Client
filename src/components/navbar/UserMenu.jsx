"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";

export default function UserMenu({ user }) {
    // console.log("user from usermenu", user);

    const navLinks = {
        tenant: "/dashboard/tenant",
        owner: "/dashboard/owner",
        admin: "/dashboard/admin"
    };

    return (
        <div className="flex items-center gap-4">
            <Link
                href={user?.role === 'tenant' ? navLinks.tenant : user?.role === 'owner' ? navLinks.owner : navLinks.admin}>
                Dashboard
            </Link>

            <Avatar>
                <Avatar.Image
                    alt="Blue"
                    src={user?.image}
                />
                <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar>

            <div className="hidden sm:block">
                <h3 className="text-sm font-semibold text-gray-800">
                    {user?.name || "User"}
                </h3>
            </div>

            <Button onClick={async () => await authClient.signOut()}>Logout</Button>
        </div>
    );
}

