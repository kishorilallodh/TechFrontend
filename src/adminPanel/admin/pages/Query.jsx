import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// highlight-start
import {
  FiMessageSquare,
  FiTrash2,
  FiX,
  FiMail,
  FiPhone,
  FiSend,
  FiSearch,
} from "react-icons/fi"; // FiSearch icon add kiya
// highlight-end
import { FaReply } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
// Redux actions ko import karein
import {
  fetchQueries,
  sendReply,
  removeQuery,
  reset,
} from "../../../features/admin/queries/querySlice"; // ❗ Sahi path daalein

// Helper function to get initials from a name
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Reusable Reply Modal Component (No changes needed)
const ReplyModal = ({ isOpen, onClose, onSubmit, query, isLoading }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error("Reply message cannot be empty.");
      return;
    }
    onSubmit(replyMessage);
  };
  useEffect(() => {
    if (isOpen) setReplyMessage("");
  }, [isOpen]);
  if (!isOpen || !query) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Reply to Query</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-md mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
            {getInitials(query.name)}
          </div>
          <div>
            <p className="font-bold text-gray-800">{query.name}</p>
            <a
              href={`mailto:${query.email}`}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <FiMail size={12} />
              {query.email}
            </a>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <FiPhone size={12} />
              {query.phone}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Message
          </label>
          <blockquote className="mt-2 text-gray-700 border-l-4 bg-gray-50 p-4 rounded-r-md">
            {query.message}
          </blockquote>
        </div>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="reply-message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Reply
          </label>
          <textarea
            id="reply-message"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            required
            rows="5"
            placeholder={`Write your reply to ${query.name}...`}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <div className="flex justify-end gap-4 pt-4 mt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-200 text-slate-800 rounded-lg font-semibold hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 bg-[#03286d] text-white rounded-lg font-semibold hover:bg-blue-900 disabled:bg-blue-400"
            >
              {isLoading ? "Sending..." : "Send Reply"}
              <FiSend size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal (No changes needed)
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  query,
  isLoading,
}) => {
  if (!isOpen || !query) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mt-4">
          Delete Query
        </h3>
        <p className="text-sm text-slate-500 mt-2">
          Are you sure you want to delete the query from{" "}
          <span className="font-semibold">{query.name}</span>?<br />
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const AdminQueriesPage = () => {
  const dispatch = useDispatch();
  const { queries, status, error } = useSelector((state) => state.adminQueries);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  // highlight-start
  const [searchTerm, setSearchTerm] = useState(""); // Search ke liye state
  // highlight-end

  useEffect(() => {
    dispatch(fetchQueries());
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

  const handleOpenReplyModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };
  const handleReplySubmit = (replyMessage) => {
    dispatch(sendReply({ id: selectedQuery._id, replyMessage }))
      .unwrap()
      .then(() => {
        toast.success("Reply sent successfully!");
        setIsModalOpen(false);
      })
      .catch((err) => {});
  };
  const handleDelete = (query) => {
    setSelectedQuery(query);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    dispatch(removeQuery(selectedQuery._id))
      .unwrap()
      .then(() => {
        toast.success("Query deleted successfully.");
        setIsDeleteModalOpen(false);
      })
      .catch((err) => {});
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getStatusClass = (status) =>
    status === "Replied"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  // highlight-start
  // Search term ke aadhar par queries ko filter karein
  const filteredQueries = queries.filter((query) =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // highlight-end

  return (
    <main className="flex-1 p-6 sm:p-8 bg-slate-50">
      {/* highlight-start: Header ko update kiya gaya */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Manage Contact Queries
        </h1>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* highlight-end */}

      <ReplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReplySubmit}
        query={selectedQuery}
        isLoading={status === "loading"}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        query={selectedQuery}
        isLoading={status === "loading"}
      />

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100">
              <tr>
                <th className="px-4 py-3">User Info</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {status === "loading" && queries.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    Loading queries...
                  </td>
                </tr>
              )}
              {status !== "loading" && queries.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    <div className="flex flex-col items-center">
                      <FiMessageSquare className="w-12 h-12 text-gray-300 mb-2" />
                      <p className="font-semibold">No queries received yet.</p>
                    </div>
                  </td>
                </tr>
              )}
              {/* highlight-start: Yahan par naya condition add kiya gaya */}
              {status !== "loading" &&
                filteredQueries.length === 0 &&
                queries.length > 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No results found for "{searchTerm}".
                    </td>
                  </tr>
                )}
              {/* Ab 'filteredQueries' par map karein */}
              {filteredQueries.map((query) => (
                <tr
                  key={query._id}
                  className="hover:bg-slate-100 cursor-pointer transition-colors"
                  onClick={() => handleOpenReplyModal(query)}
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{query.name}</p>
                    <p className="text-sm text-slate-500">{query.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {query.company || "N/A"}
                  </td>
                  <td
                    className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate"
                    title={query.message}
                  >
                    {query.message}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                    {formatDate(query.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        query.status
                      )}`}
                    >
                      {query.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className="flex justify-center gap-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        title="Reply to Query"
                        onClick={() => handleOpenReplyModal(query)}
                      >
                        <FaReply className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(query)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                        title="Delete Query"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* highlight-end */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminQueriesPage;
