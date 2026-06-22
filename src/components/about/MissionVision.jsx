"use client";

import { Target, Eye } from "lucide-react";

export default function MissionVision() {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-8">

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Target className="text-primary" size={40} />
                        <h2 className="card-title text-3xl">Our Mission</h2>
                        <p>
                            To simplify the rental experience by providing
                            verified listings and a seamless booking process.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Eye className="text-primary" size={40} />
                        <h2 className="card-title text-3xl">Our Vision</h2>
                        <p>
                            To become the most trusted rental marketplace
                            connecting millions of people with their dream homes.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

