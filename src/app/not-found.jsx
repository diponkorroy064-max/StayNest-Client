"use client";
import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">

            <div className="max-w-xl w-full bg-base-100 rounded-3xl shadow-xl border border-base-300 p-10 text-center">

                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center">
                        <SearchX className="w-12 h-12 text-error" />
                    </div>
                </div>

                <h1 className="text-7xl font-black text-primary mt-8">
                    404
                </h1>

                <h2 className="text-3xl font-extrabold mt-3">
                    Page Not Found
                </h2>

                <p className="text-neutral-500 mt-4 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist, has been
                    moved, or the URL may be incorrect!
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                    <Link href="/">
                        <button className="btn btn-primary rounded-xl px-6 gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline rounded-xl px-6 gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>

                </div>

                <div className="mt-10 border-t border-base-300 pt-6">
                    <p className="text-sm text-neutral-400">
                        StayNest • Find your perfect stay with confidence.
                    </p>
                </div>

            </div>

        </div>
    );
}
