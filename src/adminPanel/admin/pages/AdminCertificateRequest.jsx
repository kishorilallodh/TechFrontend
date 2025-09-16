// components/admin/AdminCertificateRequest.jsx
import React, { useState } from 'react';
import InternshipRequestList from '../components/certificateRequest/InternshipRequestList';
import SendLetterForm from '../components/certificateRequest/SendLetterForm';

function AdminCertificateRequest() {
    const [activeView, setActiveView] = useState('internship');

    const activeBtnClasses = 'bg-[#03286d] text-white';
    const inactiveBtnClasses = 'bg-gray-200 text-gray-700 hover:bg-gray-300';

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Request Management</h1>

            {/* View Switcher Buttons */}
            <div className="flex space-x-4 border-b border-gray-300 pb-4 mb-6">
                <button
                    className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${activeView === 'internship' ? activeBtnClasses : inactiveBtnClasses}`}
                    onClick={() => setActiveView('internship')}
                >
                    Internship/Certificate Requests
                </button>
                <button
                    className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${activeView === 'letters' ? activeBtnClasses : inactiveBtnClasses}`}
                    onClick={() => setActiveView('letters')}
                >
                    Send Experience/Offer Letter
                </button>
            </div>

            {/* Conditional Rendering of Views */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeView === 'internship' && <InternshipRequestList />}
                {activeView === 'letters' && <SendLetterForm />}
            </div>
        </div>
    );
}

export default AdminCertificateRequest;