import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiStar,
  FiUpload,
  FiX,
  FiAlertTriangle, // Icon for confirmation modal
} from "react-icons/fi";

import {
  fetchTestimonials,
  addTestimonial,
  editTestimonial,
  removeTestimonial,
  reset,
} from "../../../features/admin/testimonials/testimonialSlice";

// ===================================================================
// Component 1: Testimonial Modal (File size validation added)
// ===================================================================

 const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const TestimonialModal = ({
  isOpen,
  onClose,
  onSubmit,
  testimonial,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
    isPublished: true,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // File size limit (5MB in bytes)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || "",
        review: testimonial.review || "",
        rating: testimonial.rating || 5,
        isPublished:
          testimonial.isPublished !== undefined
            ? testimonial.isPublished
            : true,
      });
      setPreview(
        testimonial.avatar ? `${BACKEND_URL}${testimonial.avatar}` : null
      );
    } else {
      setFormData({ name: "", review: "", rating: 5, isPublished: true });
      setPreview(null);
    }
    setAvatarFile(null);
  }, [testimonial, isOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCheckbox = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  // CHANGE 1: File change handler mein validation add kiya gaya
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size check
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB.");
        e.target.value = null; // Invalid file ko input se hata dein
        return;
      }
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (avatarFile) {
      data.append("avatar", avatarFile);
    } else if (!testimonial) {
      toast.error("Avatar image is required for new testimonials.");
      return;
    }
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File input UI (No changes here) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Avatar
            </label>
            <label
              htmlFor="avatar-upload"
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 transition-colors"
            >
              <div className="space-y-1 text-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <div className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>{preview ? "Change image" : "Upload a file"}</span>
                  </div>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </label>
            <input
              id="avatar-upload"
              name="avatar"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          {/* Form fields (No changes here) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Client Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Review Text
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Write the review here..."
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleCheckbox}
              id="isPublished"
              className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-gray-700"
            >
              Publish on website
            </label>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-[#03286d] text-white rounded-lg font-semibold hover:bg-blue-900 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===================================================================
// Component 2: Confirmation Modal (Naya component)
// ===================================================================
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
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

// ===================================================================
// Component 3: Skeleton Loader (Naya component)
// ===================================================================
const TestimonialSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-6 bg-gray-200 rounded-full w-24 mx-auto"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>
    </td>
  </tr>
);

// ===================================================================
// Main Page Component (Changes for delete modal)
// ===================================================================
const AdminTestimonialsPage = () => {
  const dispatch = useDispatch();
  const { testimonials, status, error } = useSelector(
    (state) => state.testimonials
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // CHANGE 2: Delete confirmation modal ke liye state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchTestimonials());
    return () => dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [status, error, dispatch]);

  const handleOpenModal = (testimonial = null) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleSubmit = (testimonialData) => {
    const action = editingTestimonial
      ? editTestimonial({ id: editingTestimonial._id, testimonialData })
      : addTestimonial(testimonialData);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          `Testimonial ${
            editingTestimonial ? "updated" : "added"
          } successfully!`
        );
        handleCloseModal();
      })
      .catch(() => {});
  };

  // CHANGE 3: Delete modal ko handle karne ke liye naye functions
  const openDeleteConfirmation = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteConfirmation = () => {
    setTestimonialToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const handleConfirmDelete = () => {
    if (testimonialToDelete) {
      dispatch(removeTestimonial(testimonialToDelete._id))
        .unwrap()
        .then(() => toast.success("Testimonial deleted successfully!"))
        .catch(() => toast.error("Failed to delete testimonial."))
        .finally(() => closeDeleteConfirmation());
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Testimonials
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#03286d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
        >
          <FiPlus /> Add New
        </button>
      </div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        testimonial={editingTestimonial}
        isLoading={status === "loading"}
      />

      {/* CHANGE 4: Naya confirmation modal render karein */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${testimonialToDelete?.name}"? This action is permanent.`}
      />

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Review
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                Rating
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
            {/* CHANGE 5: Skeleton Loader ka use karein */}
            {status === "loading" &&
              [...Array(3)].map((_, i) => <TestimonialSkeleton key={i} />)}

            {status !== "loading" &&
              testimonials.length > 0 &&
              testimonials.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <img
                      src={`${BACKEND_URL}${t.avatar}`}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {t.name}
                  </td>
                  <td
                    className="px-4 py-3 text-sm text-gray-600 max-w-md truncate"
                    title={t.review}
                  >
                    {t.review}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-1 text-yellow-500">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <FiStar key={i} fill="currentColor" />
                      ))}
                      {Array.from({ length: 5 - t.rating }, (_, i) => (
                        <FiStar key={i} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {t.isPublished ? (
                      <span className="px-2.5 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                        Unpublished
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4 text-lg">
                    <button
                      onClick={() => handleOpenModal(t)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    {/* CHANGE 6: Delete button ab naya function call karega */}
                    <button
                      onClick={() => openDeleteConfirmation(t)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}

            {status !== "loading" && testimonials.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center">
                    <FiStar className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="font-semibold">No testimonials found.</p>
                    <p className="text-sm">Click 'Add New' to get started!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;
