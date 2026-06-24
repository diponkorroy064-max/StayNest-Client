// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // Centralized helper to avoid repetitive boilerplate code
// const request = async (endpoint, options = {}) => {
//     const url = `${API_BASE_URL}${endpoint}`;

//     const headers = {
//         "Content-Type": "application/json",
//         ...options.headers,
//     };

//     const config = {
//         ...options,
//         headers,
//     };

//     const response = await fetch(url, config);

//     // Parse json payload safely
//     const data = await response.json();

//     if (!response.ok) {
//         // Formulates an exact error tracking response object matching Axios expectations
//         throw new Error(data.message || `HTTP execution failure status: ${response.status}`);
//     }

//     return data;
// };

// // 1. Match File Configuration Parameters For Single Asset Record
// export const getPropertyId = async (id) => {
//     return await request(`/properties/${id}`, { method: "GET" });
// };

// // 2. Fetch Review Collections
// export const getPropertyReviews = async (propertyId) => {
//     return await request(`/reviews/${propertyId}`, { method: "GET" });
// };





// // 5. Sync Selection Registry Catalogs
// export const addToFavorites = async (favoriteData) => {
//     return await request("/favorites", {
//         method: "POST",
//         body: JSON.stringify(favoriteData),
//     });
// };

