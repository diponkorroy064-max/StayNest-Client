"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Phone, ShieldCheck, MapPin, Save, Landmark } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { getUserProfile, updateUserProfile } from "@/lib/api/users";
import { Avatar } from "@heroui/react";


export default function TenantProfilePage() {
    const [profile, setProfile] = useState(null);
    const { data: session, isPending } = useSession();
    const user = session?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(user?.email);

                setProfile({
                    _id: data?._id,
                    name: data?.name || "",
                    email: data?.email || "",
                    image: data?.image || "",
                    phone: data?.phone || "+880 1700-111222",
                    nid: data?.nid || "NID-9876543210",
                    emergencyContact: data?.emergencyContact || "Anik Roy (+880 1800-111222)",
                    permanentAddress: data?.permanentAddress || "Dhaka, Bangladesh"
                });
            } catch (err) {
                toast.error(err.message || "Failed to load profile");
            }
        };
        fetchProfile();
    }, [user?.email]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!profile?._id) return toast.error("User ID missing");

        try {
            const { _id, ...updatedProfile } = profile;
            const result = await updateUserProfile(_id, updatedProfile);

            if (result.modifiedCount > 0) {
                toast.success("Profile updated successfully");
            } else {
                toast.info("No changes detected");
            }
        } catch (error) {
            toast.error(error.message || "Failed to update profile");
        }
    };


    if (isPending || !profile) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">

                {/* Profile Accent Banner */}
                <div className="bg-linear-to-r from-primary to-primary/80 h-32 px-6 flex items-end justify-between pb-4">
                    <div className="flex items-center gap-4 translate-y-8">
                        <Avatar className="size-16">
                            <Avatar.Image
                                alt="Extra Large"
                                src={profile?.image}
                            />
                            <Avatar.Fallback>XL</Avatar.Fallback>
                        </Avatar>

                        <div className="mb-2 lg:mb-0">
                            <h2 className="text-xl font-black text-base-content md:text-neutral-content">{profile?.name}</h2>
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
                                <input type="text" value={profile.name || ""}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Email Address</span></label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="email" value={profile?.email || ""} disabled
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold bg-base-200 cursor-not-allowed" required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Phone Number</span></label>
                            <div className="relative">
                                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.phone || ""}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Government ID (NID)</span></label>
                            <div className="relative">
                                <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input type="text" value={profile.nid || ""}
                                    onChange={(e) => setProfile({ ...profile, nid: e.target.value })}
                                    className="input input-bordered w-full pl-10 rounded-xl font-semibold" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Emergency Contact</span></label>
                        <div className="relative">
                            <Landmark className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type="text" value={profile.emergencyContact || ""}
                                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                                className="input input-bordered w-full pl-10 rounded-xl font-semibold" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label py-1"><span className="label-text font-bold text-xs text-neutral-400">Permanent Residence Address</span></label>
                        <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3.5 top-4 text-neutral-400" />
                            <textarea value={profile.permanentAddress || ""}
                                onChange={(e) => setProfile({ ...profile, permanentAddress: e.target.value })}
                                className="textarea textarea-bordered w-full pl-10 rounded-xl font-semibold h-20" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary rounded-xl font-bold normal-case gap-2 shadow-md">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                </form>
            </div>
        </div>
    );
}

