"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getUsers } from "@/lib/api/users";
import { Avatar } from "@heroui/react";

export default function AllUsersPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            console.log(data);
            setUsers(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="bg-base-100 rounded-xl shadow">

                <div className="p-5 border-b">
                    <h2 className="text-2xl font-bold">
                        All Users
                    </h2>
                    <p>Total Users: {users.length}</p>
                </div>

                <div className="overflow-x-auto">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map(user => (

                                <tr key={user._id}>

                                    <td>

                                        <div className="flex items-center gap-3">

                                            <Avatar>
                                                <Avatar.Image alt="John Doe" src={user.image} />
                                                <Avatar.Fallback>JD</Avatar.Fallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-bold">
                                                    {user.name}
                                                </p>
                                            </div>

                                        </div>

                                    </td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span className={`badge ${user?.role==='tenant'? 'badge-primary' : user.role==='owner'?'badge-secondary':'badge-success'}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>

                                        <span className={`badge badge-outline ${user.status === "Blocked"
                                                ? "badge-error"
                                                : "badge-success"
                                            }`}>
                                            {user.status || "Active"}
                                        </span>

                                    </td>

                                    <td>{user.createdAt?.slice(0, 10)}</td>

                                    <td className="space-x-2">

                                        <button className="btn btn-xs btn-primary">
                                            Change Role
                                        </button>

                                        <button className="btn btn-xs btn-error">
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}
