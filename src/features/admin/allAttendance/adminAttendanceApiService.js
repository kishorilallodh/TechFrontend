import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/attendance/admin/`; 



const getTodaysAttendance = async (date, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: { date } // e.g., '2024-01-15'
    };
    const response = await axios.get(API_URL + "all", config);
    return response.data;
};

const getEmployeeHistory = async ({ employeeId, year, month }, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        // Naye parameters add karein
        params: { year, month } 
    };
    // employeeId ab bilkul sahi string hai
    const response = await axios.get(API_URL + `employee/${employeeId}`, config);
    return response.data;
};

const exportAllAttendance = async ({ year, month }, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month },
        responseType: 'blob', // This is crucial for downloading files
    };
    const response = await axios.get(API_URL + "export/all", config);
    return response.data; // This will be the file blob
};

const exportEmployeeAttendance = async ({ employeeId, year, month }, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month },
        responseType: 'blob',
    };
    return (await axios.get(API_URL + `export/employee/${employeeId}`, config)).data;
};


const getAttendanceSummary = async ({ employeeId, year, month }, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month } 
    };
    const response = await axios.get(API_URL + `summary/${employeeId}`, config);
    return response.data; // Yeh { Present: 20, Absent: 1, Leave: 1 } jaisa object return karega
};

const adminAttendanceApiService = {
    getTodaysAttendance,
    getEmployeeHistory, 
    exportAllAttendance,
    exportEmployeeAttendance,
    getAttendanceSummary,
};

export default adminAttendanceApiService;