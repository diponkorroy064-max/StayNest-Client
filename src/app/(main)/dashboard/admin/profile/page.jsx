"use client";
import React, { useState } from "react";
import { User, Mail, ShieldAlert, Key, Terminal, Lock, Save } from "lucide-react";
import { toast } from "react-toastify";
// import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminProfilePage() {
    const [profile, setProfile] = useState({
        name: "Root Supervisor Engine",
        email: "admin@platform.com",
        accessLevel: "Super Administrator (Tier-1)",
        authorizedZone: "All Infrastructure Clusters"
    });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`${API_BASE_URL}/users/profile`, { ...profile, role: "Admin" });
            toast.success("Security configuration profile updated successfully.");
        } catch (err) {
            toast.error("Failed to commit administrative parameters.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">

                <div className="bg-gradient-to-r from-neutral to-neutral-focus h-32 px-6 flex items-end justify-between pb-4">
                    <div className="flex items-center gap-4 translate-y-8">
                        <div className="avatar placeholder">
                            <div className="bg-error text-error-content rounded-2xl w-24 h-24 border-4 border-base-100 font-black text-2xl">AD</div>
                        </div>
                        <div className="text-neutral-content mb-2 lg:mb-0">
                            <h2 className="text-xl font-black text-white">{profile.name}</h2>
                            <span className="badge badge-sm badge-error text-white font-bold rounded-md">Platform Core Admin</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-6 pt-16 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Supervisor Tag Identity</span></label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">System Root Email Address</span></label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="email" value={profile.email} className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Access Allocation Vector</span></label>
                            <div className="relative">
                                <ShieldAlert className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-error" />
                                <input type="text" value={profile.accessLevel} className="input input-bordered w-full pl-10 rounded-xl font-bold bg-base-200 text-error" disabled />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Enforcement Authority Scope</span></label>
                            <div className="relative">
                                <Terminal className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.authorizedZone} className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-error/5 border border-error/20 rounded-2xl flex gap-3 mt-4 items-start">
                        <Lock className="w-5 h-5 text-error shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1 text-neutral-400">
                            <p className="font-bold text-error">Administrative Security Notice</p>
                            <p className="font-medium leading-relaxed">Your account coordinates root security keys. Any structural ledger mutation updates committed directly alter systemic permission scopes across live deployment arrays.</p>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-neutral text-white rounded-xl font-bold normal-case gap-2 shadow-md">
                        <Save className="w-4 h-4" /> Save System Variables
                    </button>
                </form>
            </div>
        </div>
    );
}
