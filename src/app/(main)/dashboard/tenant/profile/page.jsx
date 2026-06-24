"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Phone, ShieldCheck, MapPin, Save, Landmark } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";


export default function TenantProfilePage() {
    const data = useSession();
    // console.log("data from owner home", data);
    const user = data?.data?.user;
    // console.log("user from owner profile", user);

    const profile = {
        ...user,
        phone: "+880 1700-111222",
        nidOrPassport: "NID-9876543210",
        emergencyContact: "Anik Roy (+880 1800-111222)",
        permanentAddress: "Dhaka, Bangladesh"
    };
    // console.log('profile tenant', profile);

    // const [profile, setProfile] = useState({
    //     name: "Diponkor Roy",
    //     email: "diponkor@example.com",
    //     phone: "+880 1700-000000",
    //     nidOrPassport: "NID-9876543210",
    //     emergencyContact: "Anik Roy (+880 1800-111222)",
    //     permanentAddress: "Dhaka, Bangladesh"
    // });

    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        // try {
        //     setLoading(true);
        //     await axios.put(`${API_BASE_URL}/users/profile`, { ...profile, role: "Tenant" });
        //     toast.success("Tenant documentation profile updated safely.");
        // } catch (err) {
        //     toast.error("Failed to re-serialize profile parameters.");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">

                {/* Profile Accent Banner */}
                <div className="bg-linear-to-r from-primary to-primary-focus h-32 px-6 flex items-end justify-between pb-4">
                    <div className="flex items-center gap-4 translate-y-8">
                        <Avatar className="size-16">
                            <Avatar.Image
                                alt="Extra Large"
                                src={profile?.image}
                            />
                            <Avatar.Fallback>XL</Avatar.Fallback>
                        </Avatar>
                        <div className="text-base-content lg:text-white mb-2 lg:mb-0">
                            <h2 className="text-xl font-black">{profile.name}</h2>
                            <span className="badge badge-sm badge-neutral font-bold rounded-md">Verified Tenant</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-6 pt-16 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Full Name</span></label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile?.name}
                                    // onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Email Vector</span></label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="email" value={profile.email} className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Contact Line</span></label>
                            <div className="relative">
                                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.phone}
                                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Government ID Tracker (NID)</span></label>
                            <div className="relative">
                                <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.nidOrPassport} className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Emergency Liaison Node</span></label>
                        <div className="relative">
                            <Landmark className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type="text" value={profile.emergencyContact}
                                onChange={e => setProfile({ ...profile, emergencyContact: e.target.value })}
                                className="input input-bordered w-full pl-10 rounded-xl font-semibold" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Permanent Residence Address</span></label>
                        <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3.5 top-4 text-neutral-400" />
                            <textarea value={profile.permanentAddress}
                                onChange={e => setProfile({ ...profile, permanentAddress: e.target.value })}
                                className="textarea textarea-bordered w-full pl-10 rounded-xl font-semibold h-20" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary rounded-xl font-bold normal-case gap-2 shadow-md">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                </form>
            </div>
        </div>
    );
}

