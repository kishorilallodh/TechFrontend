// features/certificate/certificateService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/certificates/`;

// User: Create a new request
const createRequest = async (requestData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + 'request', requestData, config);
    return response.data.request;
};

// User: Get my requests
const getUserRequests = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'my-requests', config);
    return response.data;
};

// Admin: Get all requests
const getAllRequests = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'admin/all', config);
    return response.data;
};

// Admin: Update request status
const updateStatus = async (requestId, statusData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}admin/update/${requestId}`, statusData, config);
    return response.data.request;
};

const deleteRequest = async (requestId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${API_URL}admin/delete/${requestId}`, config);
    return response.data; // The backend sends back { message, id }
};


const verifyCertificate = async (verificationData) => {
    // verificationData will be { certificateNumber, nameOnCertificate }
    const response = await axios.post(API_URL + 'verify', verificationData);
    return response.data; // Returns the full certificate object on success
};

const certificateService = {
    createRequest,
    getUserRequests,
    getAllRequests,
    updateStatus,
    verifyCertificate,
    deleteRequest,
};

export default certificateService;