const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Post New Review Feedback Record---
export const submitReview = async (reviewData) => {
    const res = await fetch(`${BASE_URL}/api/review`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
        throw new Error("Failed to add review");
    }
    const data = await res.json();
    // console.log('Review data', data);
    return data;
};


// 2. Fetch Review Collections---
export const getPropertyReviews = async (propertyId) => {
    const res = await fetch(`${BASE_URL}/api/review/${propertyId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch reviews");
    }
    return res.json();
};



