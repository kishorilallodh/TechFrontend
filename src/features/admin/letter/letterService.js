import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/letters/`;
const ADMIN_API_URL = `${API_BASE_URL}/api/admin/`; 

// Admin: Create Offer Letter
const createOfferLetter = async (letterData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + 'offer', letterData, config);
    return response.data;
};

// Admin: Create Experience Letter
const createExperienceLetter = async (letterData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + 'experience', letterData, config);
    return response.data;
};

// User: Get my letters
const getUserLetters = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'my-letters', config);
    return response.data;
};

// Admin: Fetch all users to populate a dropdown
const getAllUsers = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(ADMIN_API_URL + 'employees', config); 
    return response.data;
};


const letterService = {
    createOfferLetter,
    createExperienceLetter,
    getUserLetters,
    getAllUsers,
};

export default letterService;