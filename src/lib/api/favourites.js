const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const addFavouriteProperty = async (data) => {
    const res = await fetch(`${BASE_URL}/api/favourites`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed to add favourite property");
    }
    return await res.json();
}


export const getFavouritesByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/api/favourites/byEmail?email=${encodeURIComponent(email)}`);
    return await res.json();
}

export const removeFromFavorites = async (id) => {
    const res = await fetch(`${BASE_URL}/api/favourites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to remove favourite.");
    }

    return await res.json();
};

