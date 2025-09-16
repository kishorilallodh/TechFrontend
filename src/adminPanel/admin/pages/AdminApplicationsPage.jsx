import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Icon imports ko ek jagah consolidate kar diya hai
import { FiTrash2, FiEye, FiAlertTriangle, FiX } from "react-icons/fi";

import {
  fetchApplications,
  reset,
  changeApplicationStatus,
  removeApplication,
} from "../../../features/admin/applications/applicationSlice";

// ApplicationDetailModal abhi bhi alag file se aa raha hai
import ApplicationDetailModal from "../components/ApplicationDetailModal";

// ===================================================================
// Component 1: Skeleton Loader (defined in the same file)
// ===================================================================
const ApplicationSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </td>
    </tr>
  );
};

// ===================================================================
// Component 2: Confirmation Modal (defined in the same file)
// ===================================================================
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Confirm Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


// ===================================================================
// Main Page Component
// ===================================================================
const AdminApplicationsPage = () => {
  const dispatch = useDispatch();
  const { applications, status, error } = useSelector(
    (state) => state.adminApplications
  );

  // View Modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Delete Confirmation Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchApplications());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [status, error, dispatch]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  // View Modal Handlers
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
  };
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedApplication(null);
  };

  // Status change function (modal se call hoga)
  const handleModalStatusChange = (id, newStatus) => {
    dispatch(changeApplicationStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success(`Status updated to ${newStatus}.`);
        handleCloseDetailModal();
      })
      .catch(() => toast.error("Failed to update status."));
  };

  // Delete Modal Handlers
  const openDeleteConfirmation = (application) => {
    setApplicationToDelete(application);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteConfirmation = () => {
    setApplicationToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const handleConfirmDelete = () => {
    if (applicationToDelete) {
      dispatch(removeApplication(applicationToDelete._id))
        .unwrap()
        .then(() => toast.success("Application deleted successfully."))
        .catch(() => toast.error("Failed to delete application."))
        .finally(() => closeDeleteConfirmation());
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Reviewed": return "bg-blue-100 text-blue-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Applications</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {status === "loading" && (
                // Skeleton Loader yahan render hoga
                [...Array(5)].map((_, index) => <ApplicationSkeleton key={index} />)
              )}

              {status !== "loading" && applications.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No applications received yet.
                  </td>
                </tr>
              )}

              {status === "succeeded" && applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-500">{app.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(app.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4 text-lg">
                    <button
                      onClick={() => handleViewDetails(app)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => openDeleteConfirmation(app)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modals ko render karein */}
      <ApplicationDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        application={selectedApplication}
        onStatusChange={handleModalStatusChange}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        title="Delete Application"
        message={`Are you sure you want to delete the application from "${applicationToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminApplicationsPage;