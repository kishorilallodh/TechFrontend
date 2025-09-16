import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FiUser } from "react-icons/fi";

// Redux actions ko import karein
import {
  fetchEmployees,
  fetchAdmins,
  addEmployee,
  removeEmployee,
  reset,
} from "../../../features/admin/AllUser/employeeAdminSlice"; // ❗ Sahi path daalein

// Add Employee Modal Component
const AddEmployeeModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "user",
      });
    }
  }, [isOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <InputField
            label="Set Initial Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="user">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
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
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable InputField
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
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// ✅ Reusable Table Component
const UserTable = ({ title, users, onDeleteClick, isLoading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toISOString().split("T")[0];
  };
 const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <div className="bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold text-slate-700 p-4 border-b">
        {title} ({users.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Joining Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="3" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-10 text-slate-500">
                  No users found in this category.
                </td>
              </tr>
            )}
            {!isLoading &&
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img
                          src={`${BACKEND_URL}${user.profileImage}`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FiUser className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(user.joiningDate)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onDeleteClick(user)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete User"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Page Component
const AllTeam = () => {
  const dispatch = useDispatch();
  const { employees, admins, status, error } = useSelector(
    (state) => state.adminEmployees
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchAdmins());
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

  const handleAddSubmit = (employeeData) => {
    dispatch(addEmployee(employeeData))
      .unwrap()
      .then((response) => {
        const roleText = employeeData.role === "admin" ? "Admin" : "Employee";
        toast.success(`${roleText} created successfully!`);

        setIsAddModalOpen(false);
        if (employeeData.role === "admin") {
          dispatch(fetchAdmins());
        }
        // Employee list will be refetched by the slice
      })
      .catch((err) => {
        /* Error handled by useEffect */
      });
  };

  // 👇 YAHAN PAR HAI FINAL CORRECTION 👇
  // Function ab 'type' ko as a parameter accept kar raha hai
  const handleDeleteClick = (user, type) => {
    setUserToDelete({ ...user, type: type });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(removeEmployee(userToDelete._id))
        .unwrap()
        .then(() => {
          const roleText = userToDelete.type === "admin" ? "Admin" : "Employee";
          toast.success(
            `${roleText} "${userToDelete.name}" deleted successfully.`
          );

          setIsDeleteModalOpen(false);
          setUserToDelete(null);

          if (userToDelete.type === "admin") {
            dispatch(fetchAdmins());
          }
        })
        .catch((err) => {
          /* Error handled by useEffect */
        });
    }
  };

  return (
    <main className="flex-1 p-6 sm:p-8 bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 mt-1">
            Manage all admins and employees from here.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#03286d] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-900"
        >
          <PlusIcon className="w-6 h-6" />
          Add New User
        </button>
      </div>

      {/* Admins Table */}
      <UserTable
        title="Administrators"
        users={admins}
        onDeleteClick={(user) => handleDeleteClick(user, "admin")}
        isLoading={status === "loading" && admins.length === 0}
      />

      {/* Employees Table */}
      <UserTable
        title="Employees"
        users={employees}
        onDeleteClick={(user) => handleDeleteClick(user, "employee")}
        isLoading={status === "loading" && employees.length === 0}
      />

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isLoading={status === "loading"}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mt-4">
              Delete User
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllTeam;
