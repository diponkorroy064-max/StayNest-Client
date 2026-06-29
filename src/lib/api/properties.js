const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getPropertiesData = async () => {
    const res = await fetch(`${BASE_URL}/api/properties`);
    if (!res.ok) {
        throw new Error("Failed to fetch properties");
    }
    const data = await res.json();
    return data;
}

export const getPropertyId = async (id) => {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch property");
    }
    return res.json();
};


export const getPropertyByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/properties/byEmail?email=${email}`);
    const data = await res.json();
    // console.log("get Property By Email", data);
    return data;
}


// dalete property from owner my property page---
export const deleteProperty = async (id) => {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return await res.json();
};


// update property from owner my property page---
export const updateProperty = async (id, updatedData) => {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return await res.json();
};


