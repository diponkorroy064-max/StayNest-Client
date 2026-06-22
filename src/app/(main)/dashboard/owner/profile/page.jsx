"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Briefcase, DollarSign, Save, Building } from "lucide-react";
import { toast } from "react-toastify";
// import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OwnerProfilePage() {
    const [profile, setProfile] = useState({
        name: "Diponkor Roy Portfolio",
        email: "diponkor@example.com",
        phone: "+880 1700-111222",
        companyName: "Roy Real Estate Ventures",
        bkashNumber: "01700111222",
        bankAccountNumber: "123.456.7890 State Bank"
    });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`${API_BASE_URL}/users/profile`, { ...profile, role: "Owner" });
            toast.success("Merchant owner profile schema updated.");
        } catch (err) {
            toast.error("Failed to commit asset distribution mapping.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">

                <div className="bg-gradient-to-r from-success/80 to-success h-32 px-6 flex items-end justify-between pb-4">
                    <div className="flex items-center gap-4 translate-y-8">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-2xl w-24 h-24 border-4 border-base-100 font-black text-2xl">OW</div>
                        </div>
                        <div className="text-base-content lg:text-white mb-2 lg:mb-0">
                            <h2 className="text-xl font-black">{profile.name}</h2>
                            <span className="badge badge-sm badge-success text-white font-bold rounded-md">Verified Asset Owner</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-6 pt-16 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Legal Representative Name</span></label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Corporate Email Container</span></label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="email" value={profile.email} className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Business Hotline</span></label>
                            <div className="relative">
                                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Enterprise Entity Trade Brand</span></label>
                            <div className="relative">
                                <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.companyName} onChange={e => setProfile({ ...profile, companyName: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" />
                            </div>
                        </div>
                    </div>

                    <div className="divider text-xs text-neutral-400 font-bold uppercase tracking-widest pt-2">Tariff Settlement Gateways</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">bKash Merchant Core</span></label>
                            <div className="relative">
                                <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.bkashNumber} onChange={e => setProfile({ ...profile, bkashNumber: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Direct Bank Clearing Vault Routing</span></label>
                            <div className="relative">
                                <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.bankAccountNumber} onChange={e => setProfile({ ...profile, bankAccountNumber: e.target.value })} className="input input-bordered w-full pl-10 rounded-xl font-semibold" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-success text-white rounded-xl font-bold normal-case gap-2 shadow-md mt-4">
                        <Save className="w-4 h-4" /> Save Ledger Specifics
                    </button>
                </form>
            </div>
        </div>
    );
}
