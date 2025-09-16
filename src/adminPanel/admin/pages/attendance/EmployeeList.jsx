// components/admin/attendance/EmployeeList.js (REDESIGNED)

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEmployees,
  reset,
} from "../../../../features/admin/AllUser/employeeAdminSlice"; // ❗ Sahi path daalein
import { FiArrowLeft, FiSearch, FiEye } from "react-icons/fi";

// Helper function to get initials from a name
const getInitials = (name = '') => {
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Skeleton Loader that matches the table layout
const SkeletonLoader = () => (
    <tbody className="animate-pulse">
        {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-full"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-2/3"></div></td>
                <td className="px-6 py-4"><div className="h-8 w-16 bg-gray-300 rounded"></div></td>
            </tr>
        ))}
    </tbody>
);

const EmployeeList = ({ onSelectEmployee, onBack }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const { employees, status } = useSelector((state) => state.adminEmployees);

    useEffect(() => {
        dispatch(fetchEmployees());
        return () => dispatch(reset());
    }, [dispatch]);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* --- Header --- */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Select Employee</h1>
                    <p className="text-gray-500 mt-1">Select an employee to view their attendance history.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="relative">
                         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button onClick={onBack} className="bg-[#03286d] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition">
                         Back
                    </button>
                </div>
            </div>

            {/* --- Employee Table --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        {status === 'loading' ? (
                            <SkeletonLoader />
                        ) : (
                            <tbody className="divide-y divide-gray-200">
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee) => (
                                        <tr key={employee._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                        {getInitials(employee.name)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                                      
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => onSelectEmployee(employee)}
                                                    className="flex items-center gap-2 text-[#03286d] hover:text-blue-900">
                                                    <FiEye /> View History
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-10 text-gray-500">No employees found.</td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;