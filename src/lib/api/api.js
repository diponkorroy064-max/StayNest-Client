const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getPropertiesData = async() => {
    const res = await fetch(`${BASE_URL}/api/properties`);
    if (!res.ok) {
        throw new Error("Failed to fetch properties");
    }
    const data = await res.json();
    return data;
}

