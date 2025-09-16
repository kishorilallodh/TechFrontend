// features/auth/authApi.js
import axios from 'axios';

// .env file se base URL ko access karein
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/auth/`; 

// ✅ axios instance create karo
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

// Register user
const register = async (userData) => {
    const response = await api.post(`signup`, userData);
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await api.post(`login`, userData);
    return response.data;
};

// Logout user
const logout = async () => {
    await api.post(`logout`);
};

const forgotPassword = async (email) => {
    return (await api.post('forgot-password', { email })).data;
};
const resetPassword = async ({ token, password }) => {
    return (await api.post(`reset-password/${token}`, { password })).data;
};


const authApi = { register, login, logout, forgotPassword, resetPassword };
export default authApi;
