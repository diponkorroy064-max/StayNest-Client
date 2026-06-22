'use client'
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { authClient } from "@/lib/auth-client";


export default function DashboardLayout({ children }) {
    const { data } = authClient.useSession();
    // console.log("data in layout", data);
    const user = data?.user;
    // console.log("user in layout", data?.user);
    const role = user?.role; // Later get from session
    console.log(role);

    return (
        <div className="min-h-screen bg-gray-100">
            <DashboardSidebar role={role} />

            <main className="lg:ml-72 p-6">
                {children}
            </main>
        </div>
    );
}

