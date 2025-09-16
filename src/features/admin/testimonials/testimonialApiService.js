import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/testimonials/`;  

// 1. Get all testimonials for the Admin Panel
const getAllTestimonials = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + "admin/all", config);
    return response.data;
};

// 2. Create a new testimonial (Admin)
const createTestimonial = async (testimonialData, token) => {
    // testimonialData must be FormData because it includes an image
    const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, testimonialData, config);
    return response.data;
};

// 3. Update a testimonial (Admin)
const updateTestimonial = async ({ id, testimonialData }, token) => {
    const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } };
    const response = await axios.put(API_URL + id, testimonialData, config);
    return response.data;
};

// 4. Delete a testimonial (Admin)
const deleteTestimonial = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};


const testimonialApiService = {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};

export default testimonialApiService;