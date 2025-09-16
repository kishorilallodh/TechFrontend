import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllRequests, updateRequestStatus, deleteCertificateRequest } from '../../../../features/admin/certificate/certificateSlice';

// --- Modal Component for Viewing Request Details ---
const ViewRequestModal = ({ request, onClose, onStatusUpdate }) => {
    if (!request) return null;

    return (
        // Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 animate-fade-in-down">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Request Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">Name on Certificate:</dt><dd className="text-gray-800">{request.nameOnCertificate}</dd></div>
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">User Email:</dt><dd className="text-gray-800">{request.user?.email || 'N/A'}</dd></div>
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">Course:</dt><dd className="text-gray-800">{request.courseName}</dd></div>
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">Status:</dt><dd><StatusBadge status={request.status} /></dd></div>
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">Start Date:</dt><dd className="text-gray-800">{new Date(request.startDate).toLocaleDateString()}</dd></div>
                        <div className="col-span-1"><dt className="font-semibold text-gray-500">Completion Date:</dt><dd className="text-gray-800">{new Date(request.completionDate).toLocaleDateString()}</dd></div>
                        <div className="col-span-full"><dt className="font-semibold text-gray-500">User Message:</dt><dd className="text-gray-800 mt-1 p-2 bg-gray-50 rounded border">{request.message || 'No message provided.'}</dd></div>
                    </dl>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end items-center p-4 border-t space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Close</button>
                    {request.status === 'Pending' && (
                        <>
                            <button onClick={() => onStatusUpdate(request._id, 'Rejected')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                            <button onClick={() => onStatusUpdate(request._id, 'Approved')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Modal Component for Delete Confirmation ---
const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
                <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to permanently delete this request? This action cannot be undone.</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Confirm Delete</button>
                </div>
            </div>
        </div>
    );
};


// --- Helper Badge Component (can be kept inside or moved out) ---
const StatusBadge = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-bold rounded-full text-white inline-block';
    let colorClass = '';
    switch (status) {
        case 'Approved': colorClass = 'bg-green-500'; break;
        case 'Rejected': colorClass = 'bg-red-500'; break;
        default: colorClass = 'bg-yellow-500'; break;
    }
    return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
};


// --- Main List Component ---
function InternshipRequestList() {
    const dispatch = useDispatch();
    const { requests, status, error } = useSelector((state) => state.certificates);

    // State for managing modals
    const [modalType, setModalType] = useState(null); // 'view', 'delete', or null
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllRequests());
        }
    }, [status, dispatch]);

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedRequest(null);
    };

    const handleViewClick = (request) => {
        setSelectedRequest(request);
        setModalType('view');
    };

    const handleDeleteClick = (request) => {
        setSelectedRequest(request);
        setModalType('delete');
    };
    
    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            await dispatch(updateRequestStatus({ requestId, updateData: { status: newStatus } })).unwrap();
            toast.success(`Request has been ${newStatus.toLowerCase()} successfully!`);
            handleCloseModal(); // Close modal on success
        } catch (err) {
            toast.error(err || 'An unexpected error occurred.');
        }
    };
    
    const handleDeleteConfirm = async () => {
        if (!selectedRequest) return;
        try {
            await dispatch(deleteCertificateRequest(selectedRequest._id)).unwrap();
            toast.success('Request deleted successfully!');
            handleCloseModal(); // Close modal on success
        } catch (err) {
            toast.error(err || 'Failed to delete the request.');
        }
    };


    if (status === 'loading' && requests.length === 0) return <div className="text-center p-8">Loading requests...</div>;
    if (status === 'failed' && requests.length === 0) return <div className="text-red-500 text-center p-8">Error: {error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Incoming Internship Requests</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                         <tr>
                            {['Name on Certificate', 'User Email', 'Course', 'Status', 'Actions'].map(header => (
                                <th key={header} className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {requests.length > 0 ? requests.map((req) => (
                            <tr key={req._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{req.nameOnCertificate || 'N/A'}</td>
                                <td className="py-3 px-4">{req.user?.email || 'N/A'} </td>
                                <td className="py-3 px-4">{req.courseName}</td>
                                <td className="py-3 px-4"><StatusBadge status={req.status} /></td>
                                <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleViewClick(req)} 
                                            className="bg-[#03286d] hover:bg-blue-900 text-white text-xs font-bold py-1 px-3 rounded"
                                            title="View Details"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(req)} 
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-3 rounded"
                                            title="Permanently Delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-500">No requests found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Render Modals based on state */}
            {modalType === 'view' && (
                <ViewRequestModal 
                    request={selectedRequest}
                    onClose={handleCloseModal}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
            {modalType === 'delete' && (
                <DeleteConfirmationModal
                    onClose={handleCloseModal}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
}

export default InternshipRequestList;