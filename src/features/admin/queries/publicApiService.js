import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/`; 

export const submitContactQuery = async (queryData) => {
    const response = await axios.post(API_URL + "queries", queryData);
    return response.data; // Returns { message: "..." }
};