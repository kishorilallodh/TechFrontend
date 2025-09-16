import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/applications/`; 

const getAllApplications = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return (await axios.get(API_URL + "admin/all", config)).data;
};
const updateStatus = async ({ id, status }, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}${id}/status`, { status }, config);
    return response.data;
};

const deleteApplication = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const applicationApiService = { getAllApplications, updateStatus, deleteApplication };
export default applicationApiService;