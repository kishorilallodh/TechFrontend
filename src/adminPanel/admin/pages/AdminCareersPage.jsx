import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FiPlus, FiEdit, FiTrash2, FiX, FiBriefcase, FiAlertTriangle } from 'react-icons/fi';

// Redux actions ko import karein
import {
  fetchJobs,
  addJob,
  editJob,
  removeJob,
  reset,
} from "../../../features/admin/jobs/jobSlice"; // ❗ Sahi path daalein

// Reusable form field components
const InputField = ({ label, name, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const SelectField = ({ label, name, options, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
  </div>
);

// Reusable Job Modal Component
const JobModal = ({ isOpen, onClose, onSubmit, job, isLoading }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        type: job.type || "Full-time",
        salaryMin: job.salaryMin || "",
        salaryMax: job.salaryMax || "",
        experience: job.experience || "",
        description: job.description || "",
        requirements: Array.isArray(job.requirements)
          ? job.requirements.join("\n")
          : "",
        responsibilities: Array.isArray(job.responsibilities)
          ? job.responsibilities.join("\n")
          : "",
        benefits: Array.isArray(job.benefits) ? job.benefits.join("\n") : "",
        isActive: job.isActive !== undefined ? job.isActive : true,
      });
    } else {
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salaryMin: "",
        salaryMax: "",
        experience: "",
        description: "",
        requirements: "",
        responsibilities: "",
        benefits: "",
        isActive: true,
      });
    }
  }, [job, isOpen]);

  

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCheckbox = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
    };
    onSubmit(dataToSubmit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {job ? "Edit Job Opening" : "Add New Job"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <InputField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <SelectField
              label="Job Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={["Full-time", "Part-time", "Contract", "Internship"]}
            />
            <InputField
              label="Salary Min (in ₹)"
              name="salaryMin"
              type="number"
              value={formData.salaryMin}
              onChange={handleChange}
              required
            />
            <InputField
              label="Salary Max (in ₹)"
              name="salaryMax"
              type="number"
              value={formData.salaryMax}
              onChange={handleChange}
              required
            />
          </div>
          <InputField
            label="Experience Required"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 5+ years"
            required
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
          <TextAreaField
            label="Requirements (one per line)"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            required
          />
          <TextAreaField
            label="Responsibilities (one per line)"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="4"
            required
          />
          <TextAreaField
            label="Benefits (one per line)"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            rows="4"
            required
          />
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckbox}
              id="isActive"
              className="h-4 w-4 rounded text-blue-600"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Make this job opening active
            </label>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-[#03286d] text-white rounded-lg font-semibold disabled:bg-blue-300"
            >
              {isLoading ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ===================================================================
  // Component 1: Naya Confirmation Modal
  // ===================================================================
  const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <FiAlertTriangle
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
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
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              Confirm Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const JobSkeleton = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
        <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
        <td className="px-6 py-4"><div className="flex items-center gap-4"><div className="h-6 w-6 bg-gray-200 rounded"></div><div className="h-6 w-6 bg-gray-200 rounded"></div></div></td>
    </tr>
);

// Main Page
const AdminCareersPage = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.adminJobs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs());
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

  const handleOpenModal = (job = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleSubmit = (jobData) => {
    const action = editingJob
      ? editJob({ id: editingJob._id, jobData })
      : addJob(jobData);
    dispatch(action)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        handleCloseModal();
      })
      .catch((err) => {
        // Error toast is already handled by the useEffect
      });
  };

  const openDeleteConfirmation = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setJobToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      dispatch(removeJob(jobToDelete._id))
        .unwrap()
        .then((response) => {
          toast.success(response.message || "Job deleted successfully!");
        })
        .catch(() => toast.error("Failed to delete job."))
        .finally(() => closeDeleteConfirmation());
    }
  };
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Job Section</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#03286d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900"
        >
          <FiPlus /> Add New Job
        </button>
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        job={editingJob}
        isLoading={status === "loading"}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        title="Delete Job Opening"
        message={`Are you sure you want to delete the job opening for "${jobToDelete?.title}"? This action cannot be undone.`}
      />

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* ✅ YAHAN PAR HAI FINAL CORRECTION ✅ */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Salary (LPA)
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {status === 'loading' && [...Array(5)].map((_, i) => <JobSkeleton key={i} />)}
              {status !== "loading" && jobs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    <div className="flex flex-col items-center">
                      <FiBriefcase className="w-12 h-12 text-gray-300 mb-2" />
                      <p className="font-semibold">No job openings found.</p>
                      <p className="text-sm">
                        Click 'Add New Job' to create one.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-600 whitespace-nowrap">
                    {job.salaryLPA}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        job.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4 text-lg">
                    <button
                      onClick={() => handleOpenModal(job)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => openDeleteConfirmation(job)}
                      className="text-red-600 hover:red-800"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCareersPage;
