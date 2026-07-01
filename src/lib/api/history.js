const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRentalHistoryByEmail = async (email) => {
    // Queries the historical endpoint block securely
    const res = await fetch(`${BASE_URL}/api/history/byEmail?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || `API exception context execution: ${res.status}`);
    }
    return data;
};


