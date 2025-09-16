import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/`; 


// 1. Saari active jobs fetch karne ke liye
export const getActiveJobs = async () => {
    const response = await axios.get(API_URL + "jobs");
    return response.data;
};

// 2. Job application submit karne ke liye
export const submitApplication = async (applicationData) => {
    // applicationData ek FormData object hoga
    const response = await axios.post(API_URL + "applications", applicationData);
    return response.data; 
};