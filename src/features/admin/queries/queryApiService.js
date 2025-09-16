import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/queries/`; 

// 1. Get all queries for the Admin Panel
const getAllQueries = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + "admin/all", config);
    return response.data;
};

// 2. Admin replies to a query
const replyToQuery = async ({ id, replyMessage }, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + `${id}/reply`, { replyMessage }, config);
    return response.data; // Response will be { message: "..." }
};

// 3. Delete a query
const deleteQuery = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + id, config);
    return response.data; // Response will be { message: "..." }
};

const queryApiService = {
    getAllQueries,
    replyToQuery,
    deleteQuery,
};

export default queryApiService;