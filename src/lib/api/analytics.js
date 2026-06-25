const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getAnalyticsByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/analytics?email=${email}`);

    const data = await res.json();
    // console.log('analytics data', data);

    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

