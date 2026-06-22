import { LayoutDashboard, Home, PlusCircle, Users, User, Heart, CreditCard, ClipboardList} from "lucide-react";

export const sidebarLinks = {
    tenant: [
        {
            name: "Home",
            href: "/dashboard/tenant",
            icon: LayoutDashboard,
        },
        {
            name: "Wishlist",
            href: "/dashboard/tenant/wishlist",
            icon: Heart,
        },
        {
            name: "My Bookings",
            href: "/dashboard/tenant/myBookings",
            icon: Home,
        },
        {
            name: "Payment History",
            href: "/dashboard/tenant/payment-history",
            icon: CreditCard,
        },
        {
            name: "Profile",
            href: "/dashboard/tenant/profile",
            icon: User,
        },
    ],

    owner: [
        {
            name: "Home",
            href: "/dashboard/owner",
            icon: LayoutDashboard,
        },
        {
            name: "Add Property",
            href: "/dashboard/owner/addProperty",
            icon: PlusCircle,
        },
        {
            name: "My Properties",
            href: "/dashboard/owner/myProperties",
            icon: Home,
        },
        {
            name: "Requests",
            href: "/dashboard/owner/booking-requests",
            icon: ClipboardList,
        },
        {
            name: "Profile",
            href: "/dashboard/owner/profile",
            icon: User,
        },
    ],

    admin: [
        {
            name: "Home",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Users",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            name: "Properties",
            href: "/dashboard/admin/properties",
            icon: Home,
        },
        {
            name: "Reports",
            href: "/dashboard/admin/reports",
            icon: ClipboardList,
        },
        {
            name: "Profile",
            href: "/dashboard/admin/profile",
            icon: User,
        },
    ],
};
