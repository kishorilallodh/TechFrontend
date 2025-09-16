// src/pages/admin/AdminServiceList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiPlus, FiEdit, FiTrash2, FiLoader, FiAlertCircle, FiInbox, FiX, FiAlertTriangle
} from "react-icons/fi";
import { fetchServices, deleteService } from "../../../features/admin/service/serviceApi";
import EditServiceModal from "../components/service/EditServiceModal";

// 🔹 Reusable Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-10">
    <FiLoader className="animate-spin text-indigo-600 text-4xl" />
  </div>
);

// 🔹 Reusable Empty State Component
const EmptyState = () => (
  <div className="text-center py-16 px-6 bg-white rounded-lg border-2 border-dashed">
    <FiInbox className="mx-auto text-5xl text-gray-400" />
    <h3 className="mt-4 text-xl font-semibold text-gray-800">No Services Found</h3>
    <p className="mt-2 text-gray-500">Get started by adding a new service.</p>
    <Link
      to="/admin/manage-services"
      className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition"
    >
      <FiPlus />
      Add New Service
    </Link>
  </div>
);

// 🔹 Reusable Error Display Component
const ErrorDisplay = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
    <div className="flex items-center gap-3">
      <FiAlertCircle className="text-red-500 text-xl" />
      <div>
        <h3 className="font-semibold text-red-800">An Error Occurred</h3>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

// 🔹 Skeleton Loading Component
const ServiceSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="w-[8rem] h-18 bg-gray-200 rounded-md flex items-center justify-center">
        <div className="h-12 w-12 bg-gray-300 rounded"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex items-center justify-end gap-4">
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
      </div>
    </td>
  </tr>
);

// 🔹 Improved Delete Confirmation Modal
const DeleteConfirmModal = ({ service, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
      <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <FiX size={24} />
      </button>
      <div className="flex items-start gap-4">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0">
          <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-0 text-left">
          <h2 className="text-xl font-bold text-gray-900" id="modal-title">
            Delete Service
          </h2>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-800">"{service.title}"</strong>? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 rounded-md border border-transparent text-sm font-medium bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const AdminServiceList = () => {
  const dispatch = useDispatch();
  const { list: services, loading, error } = useSelector((s) => s.services);

  const [editService, setEditService] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDeleteConfirm = (id) => {
    dispatch(deleteService(id))
      .unwrap()
      .then(() => {
        toast.success("Service deleted successfully!");
        setDeleteTarget(null);
      })
      .catch((err) => toast.error(err.message || "Failed to delete service."));
  };
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, index) => (
                <ServiceSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (services.length === 0) {
      return <EmptyState />;
    }

     const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-[8rem] h-18 bg-gray-100 rounded-md flex items-center justify-center">
                    {s.cardImage ? (
                      <img
                        src={`${BACKEND_URL}${s.cardImage}`}
                        alt={s.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{s.title}</div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{s.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-4">
                    <button
                      title="Edit Service"
                      onClick={() => setEditService(s)}
                      className="text-indigo-600 hover:text-indigo-900 transition"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      title="Delete Service"
                      onClick={() => setDeleteTarget(s)}
                      className="text-red-600 hover:text-red-900 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Services</h1>
          <Link
            to="/admin/manage-services"
            className="inline-flex items-center gap-2 bg-[#03286d] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-900 transition"
          >
            <FiPlus />
            Add New Service
          </Link>
        </div>

        {/* Main Content Area */}
        {renderContent()}

        {/* Modals */}
        {editService && (
          <EditServiceModal
            service={editService}
            onClose={() => setEditService(null)}
          />
        )}
        {deleteTarget && (
          <DeleteConfirmModal
            service={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={() => handleDeleteConfirm(deleteTarget._id)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminServiceList;