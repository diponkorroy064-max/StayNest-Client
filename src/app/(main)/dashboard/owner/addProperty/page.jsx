import AddPropertyForm from "@/components/owner/AddPropertyForm";
import React from "react";


export const metadata = {
    title: "List Property | Owner Dashboard",
    description: "Register and queue new properties into tracking platforms",
};

export default function AddPropertyPage() {
    return (
        <div className="min-h-screen bg-base-200/30 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mb-8 text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
                    List Your Property
                </h1>
                <p className="text-base text-base-content/70 mt-2">
                    Fill out structural identifiers and transaction rules. Once verified by site administrators, your listing will automatically enter the global public rental index.
                </p>

                <div className="alert alert-info shadow-sm mt-4 text-sm bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300">
                    <span>ℹ️ Newly published records default immediately to a <strong>Pending</strong> state until administrative validation clears.</span>
                </div>
            </div>

            <AddPropertyForm />
        </div>
    );
}
