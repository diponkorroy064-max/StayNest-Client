const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/api/users`);

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return await res.json();
};


export const updateUserRole = async (id, role) => {
    const res = await fetch(`${BASE_URL}/api/users/${id}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return await res.json();
};

export const deleteUser = async (id) => {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return await res.json();
};
