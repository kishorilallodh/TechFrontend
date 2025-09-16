import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/`; 


// Get all published testimonials for the website
export const getPublishedTestimonials = async () => {
    const response = await axios.get(API_URL + "testimonials");
    return response.data;
};