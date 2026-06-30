const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// getting all user data---
export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/api/users`);

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return await res.json();
};


// get a single user---
export const getUserProfile = async (email) => {
    const res = await fetch(`${BASE_URL}/users/profile?email=${email}`);

    if (!res.ok) {
        throw new Error("Failed to load profile");
    }
    return await res.json();
};


// update user role---
// export const updateUserRole = async (id, role) => {
//     const res = await fetch(`${BASE_URL}/api/users/${id}/role`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ role }),
//     });

//     if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message);
//     }

//     return await res.json();
// };


// update user profile---
export const updateUserProfile = async (id, data) => {
    const res = await fetch(`${BASE_URL}/users/profile/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return await res.json();
};


// delete user by  admin---
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


