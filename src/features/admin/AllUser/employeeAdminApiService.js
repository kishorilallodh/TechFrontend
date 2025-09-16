import axios from "axios";

// 👇 Base URL ko sirf '/admin/' tak rakhein

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/admin/`; 

// Naya function
const getAllAdmins = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + "admins", config);
    return response.data;
};

// 1. Get all employees (Admin)
const getAllEmployees = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    // Ab URL banega: '.../admin/' + 'employees' = '.../admin/employees'
    const response = await axios.get(API_URL + "employees", config);
    return response.data;
};

// 2. Create a new employee (Admin)
const createEmployee = async (employeeData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    // Ab URL banega: '.../admin/' + 'employees' = '.../admin/employees' 
    const response = await axios.post(API_URL + "employees", employeeData, config);
    return response.data;
};

// 3. Delete an employee (Admin)
const deleteEmployee = async (employeeId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    // Ab URL banega: '.../admin/' + 'employees/' + id = '.../admin/employees/:id'
    const response = await axios.delete(API_URL + "employees/" + employeeId, config);
    return response.data;
};

const employeeAdminApiService = {
    getAllAdmins,
    getAllEmployees,
    createEmployee,
    deleteEmployee,
};

export default employeeAdminApiService;