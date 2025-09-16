// features/admin/technology/technologyApiService.js (New File)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/technologies/`;

const fetchAll = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const create = async (techData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, techData, config);
    return response.data;
};

const deleteById = async (techId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + techId, config);
    return { ...response.data, id: techId }; // Return the ID for the reducer
};

const update = async ({ id, techData }, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(API_URL + id, techData, config);
    return response.data; // The backend returns { message, technology }
};

const technologyApiService = {
    fetchAll,
    create,
    update,
    deleteById,
};

export default technologyApiService;