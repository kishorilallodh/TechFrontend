import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/attendance/`; 

// 1. Clock In
const clockIn = async (workPlanData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + "clock-in", workPlanData, config);
    return response.data;
};

// 2. Clock Out
const clockOut = async (workSummaryData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL + "clock-out", workSummaryData, config);
    return response.data;
};

// 3. Get Today's Attendance
const getTodayAttendance = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + "today", config);
    return response.data;
};

// 4. Get Monthly Attendance
const getMonthlyAttendance = async ({ year, month }, token) => {
    const config = { 
        headers: { Authorization: `Bearer ${token}` },
        params: { year, month } 
    };
    const response = await axios.get(API_URL + "me", config);
    return response.data;
};

const requestLeave = async (reasonData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    // reasonData will be { reason: '...' }
    const response = await axios.post(API_URL + "request-leave", reasonData, config);
    return response.data;
};

const attendanceApiService = {
    clockIn,
    clockOut,
    getTodayAttendance,
    getMonthlyAttendance,
    requestLeave,
};

export default attendanceApiService;