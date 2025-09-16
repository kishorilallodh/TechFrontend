import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/jobs/`; 

const getAllJobsForAdmin = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return (await axios.get(API_URL + "admin/all", config)).data;
};
const createJob = async (jobData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return (await axios.post(API_URL, jobData, config)).data;
};
const updateJob = async ({ id, jobData }, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return (await axios.put(API_URL + id, jobData, config)).data;
};
const deleteJob = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return (await axios.delete(API_URL + id, config)).data;
};

const jobApiService = { getAllJobsForAdmin, createJob, updateJob, deleteJob };
export default jobApiService;