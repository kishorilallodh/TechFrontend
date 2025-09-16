import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/salary`;

// Helper to create auth config
const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// --- ADMIN SERVICES ---
const fetchEmployeeDetails = async ({ userId, month, year }, token) => {
    const response = await axios.get(`${API_URL}/details/${userId}/${month}/${year}`, getConfig(token));
    return response.data; // { success: true, data: {...} }
};

const createDraft = async ({ userId, slipData }, token) => {
    const response = await axios.post(`${API_URL}/create-manual/${userId}`, slipData, getConfig(token));
    return response.data; // { message: '...', data: {...} }
};

const publish = async (slipId, token) => {
    const response = await axios.patch(`${API_URL}/publish/${slipId}`, {}, getConfig(token));
    return response.data;
};

const fetchSlipsForUser = async (userId, token) => {
    const response = await axios.get(`${API_URL}/admin/${userId}`, getConfig(token));
    return response.data;
};

const fetchMonthlyHistoryForAdmin = async ({ month, year }, token) => {
    const response = await axios.get(`${API_URL}/admin/history?month=${month}&year=${year}`, getConfig(token));
    return response.data;
};

// --- EMPLOYEE SERVICE ---
const fetchOwnSlips = async (filters, token) => {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}/employee/my-slips?${params}`, getConfig(token));
    return response.data;
};

const salaryApiService = {
    fetchEmployeeDetails,
    createDraft,
    publish,
    fetchSlipsForUser,
    fetchMonthlyHistoryForAdmin,
    fetchOwnSlips,
};

export default salaryApiService;