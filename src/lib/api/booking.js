const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Store Final Booking Pipeline Logs---
export const saveBookingInfo = async (bookingData) => {
    const res = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
        throw new Error("Failed to booking property");
    }
    return await res.json();
};


export const getBookingsByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/bookings/byEmail?email=${email}`);

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || `API exception error returned execution: ${res.status}`);
    }
    return data;
};

