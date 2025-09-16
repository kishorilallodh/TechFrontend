// components/user/CertificateRequestForm.jsx (Corrected)

import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCertificateRequest, reset } from '../../../features/admin/certificate/certificateSlice'; // Sahi path daalein

const courseOptions = [
    "MERN Stack Development ",
    "React.js Development",
    "Node.js & Backend Development",
    "Data Science with Python",
    "Digital Marketing",
];
// 1. Initial state ko ek constant me define karein
const initialState = {
    certificateType: "",
    nameOnCertificate: "",
    courseName: "",
    startDate: "",
    completionDate: "",
    duration: "",
    message: "",
    _timeUnit: "month",
};

const CertificateRequestForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.certificates);

    const [formData, setFormData] = useState({
        certificateType: "",
        nameOnCertificate: "",
        courseName: "",
        startDate: "",
        completionDate: "",
        duration: "",
        message: "",
        _timeUnit: "month",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // highlight-start
    // === YAHAN PAR LOGIC THEEK KIYA GAYA HAI ===
    useEffect(() => {
        if (formData.startDate && formData.completionDate && formData._timeUnit) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.completionDate);

            if (end < start) {
                setFormData((prev) => ({ ...prev, duration: "Invalid Date Range" }));
                return;
            }

            let diff = "";
            const diffMs = end - start;

            if (formData._timeUnit === "hour") {
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                diff = `${hours} Hour${hours !== 1 ? "s" : ""}`;
            } 
            // 'week' ke liye naya logic add kiya gaya
            else if (formData._timeUnit === "week") {
                const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
                diff = `${weeks} Week${weeks !== 1 ? "s" : ""}`;
            } 
            else if (formData._timeUnit === "month") {
                const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                diff = `${months} Month${months !== 1 ? "s" : ""}`;
            }
            // 'year' wala logic hata diya gaya hai

            setFormData((prev) => ({ ...prev, duration: diff }));
        }
    }, [formData.startDate, formData.completionDate, formData._timeUnit]);
    // highlight-end
    
    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.duration === 'Invalid Date Range' || !formData.duration) {
            toast.error("Please provide a valid date range to calculate duration.");
            return;
        }

        const requestData = {
            certificateType: formData.certificateType,
            nameOnCertificate: formData.nameOnCertificate,
            courseName: formData.courseName,
            startDate: formData.startDate,
            completionDate: formData.completionDate,
            duration: formData.duration,
            message: formData.message
        };

        try {
            await dispatch(createCertificateRequest(requestData)).unwrap();
            toast.success("Your request has been submitted successfully!");
            setFormData(initialState);
        } catch (err) {
            toast.error(err || 'Failed to submit request.');
        }
    };

    // JSX mein koi badlav nahi hai, woh pehle se hi sahi tha
    return (
        <div className="bg-gray-100 min-h-full p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                {/* ... Header ... */}
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Request a Certificate
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Please fill out the form below to request your certificate.
                    </p>
                </div>

                {/* ... Form ... (No change here) */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Certificate Type */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Certificate Type *
                            </label>
                            <select
                                name="certificateType"
                                value={formData.certificateType}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select certificate type...</option>
                                <option value="Internship ">Internship Certificate</option>
        
                            </select>
                        </div>

                        {/* Student Name -> nameOnCertificate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name on Certificate *
                            </label>
                            <input
                                type="text"
                                name="nameOnCertificate"
                                placeholder="Enter your full name"
                                value={formData.nameOnCertificate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Course Name */}
                       <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course/Internship Name *
                            </label>
                            <select
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a course...</option>
                                {courseOptions.map(course => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Completion Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Completion Date *
                            </label>
                            <input
                                type="date"
                                name="completionDate"
                                value={formData.completionDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Time Unit Selector for Calculation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Calculate Duration In
                            </label>
                            <select
                                name="_timeUnit"
                                value={formData._timeUnit}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="month">Months</option>
                                <option value="week">Weeks</option>
                                <option value="hour">Hours</option>
                            </select>
                        </div>
                        
                        {/* Calculated Duration Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Calculated Duration
                            </label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                readOnly
                                placeholder="Duration will be auto-calculated"
                                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Additional Notes -> message */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Any additional information for the admin"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-900 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <FiSend />
                            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CertificateRequestForm;  