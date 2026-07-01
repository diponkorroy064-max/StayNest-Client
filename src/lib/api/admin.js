const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminAnalytics = async () => {
    const res = await fetch(`${BASE_URL}/admin/analytics`);

    if (!res.ok) {
        throw new Error("Failed to fetch analytics");
    }

    return await res.json();
};

