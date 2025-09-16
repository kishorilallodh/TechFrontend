// components/Profile/UpdateProfile.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyProfile,
  updateMyProfile,
} from "../../../features/employee/profile/profileSlice";
import { updateUser } from "../../../features/auth/authSlice";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, status, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    designation: '',       // <-- Added
    panNumber: '',         // <-- Added
    bankAccountNumber: '', // <-- Added
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 👉 Step 1: Date ko format karne ke liye helper function add karein
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    // Ab data EmployeeLayout se aa raha hai, par agar direct is page par aayein
    // to fallback ke liye yeh fetch call rakhna accha hai.
    if (!profile) {
      dispatch(fetchMyProfile());
    }
  }, [profile, dispatch]);

useEffect(() => {
    if (profile) {
      // highlight-start
      // 2. useEffect me naye fields ko populate karein
      setFormData({
        name: profile.user?.name || user?.name || '',
        dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
        designation: profile.designation || '',         // <-- Added
        panNumber: profile.panNumber || '',           // <-- Added
        bankAccountNumber: profile.bankAccountNumber || '', // <-- Added
      });
      // highlight-end
      if (profile.profileImage) {
        setImagePreview(`${import.meta.env.VITE_API_BASE_URL}${profile.profileImage}`);
      }
    }
  }, [profile, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (imageFile) {
      dataToSubmit.profileImage = imageFile;
    }

    dispatch(updateMyProfile(dataToSubmit))
      .unwrap()
      .then((response) => {
        if (formData.name !== user.name) {
          dispatch(updateUser({ name: formData.name }));
        }
        toast.success(response.message || "Profile updated successfully!");
        navigate("/employee/profile");
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
        toast.error(err || "Failed to update profile.");
      });
  };

  return (
    <div className=" bg-gray-100 min-h-full">
      <div className="bg-white rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Profile</h2>
          <p className="text-sm text-gray-500 mt-1">
            Make changes to your personal information.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
             <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Name (Read-only) */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Email (Read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user ? user.email : ""}
                  readOnly
                  className="w-full px-3 py-2 border bg-gray-100 rounded-md cursor-not-allowed"
                />
              </div>
              {/* Mobile (Read-only) */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={user ? user.mobile : ""}
                  readOnly
                  className="w-full px-3 py-2 border bg-gray-100 rounded-md cursor-not-allowed"
                />
              </div>
               {/* Joining Date (Read-only) */}
    <div>
        <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">
            Joining Date
        </label>
        <input
            type="text"
            id="joiningDate"
            value={formatDate(profile?.joiningDate)}
            readOnly
            className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md cursor-not-allowed"
        />
    </div>

    {/* Date of Birth */}
    <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
        </label>
        <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
            </div>

  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 mt-6">Official & Financial Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input type="text" name="designation" id="designation" placeholder="e.g., Software Developer" value={formData.designation} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
              </div>
              <div>
                  <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input type="text" name="panNumber" id="panNumber" placeholder="ABCDE1234F" value={formData.panNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
              </div>
              <div>
                  <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                  <input type="text" name="bankAccountNumber" id="bankAccountNumber" placeholder="Enter Account Number" value={formData.bankAccountNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
              </div>
            </div>




            {/* Personal & Address Details Section */}
<h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 mt-6">
    Personal & Address Details
</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Address (Span 2 columns on larger screens) */}
  

    {/* City */}
    <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
        </label>
        <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>

    {/* State */}
    <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
        </label>
        <input
            type="text"
            name="state"
            id="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>

    {/* Pincode */}
    <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
        </label>
        <input
            type="text"
            name="pincode"
            id="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
      {/* Address lamba ho sakta hai, isliye ise zyada jagah dena accha hai */}
    <div className="md:col-span-2"> 
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
        </label>
        <input
            type="text"
            name="address"
            id="address"
            placeholder="Your full address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
</div>
            

            {/* ... (Image Upload section same rahega) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload new Image
                </label>
                {/* Poore area ko label banayein */}
                <label
                  htmlFor="file-upload"
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <div className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>
                          {imagePreview ? "Change file" : "Upload a file"}
                        </span>
                      </div>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </label>
                <input
                  id="file-upload"
                  name="profileImage"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            {status === "failed" && error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-4 rounded-b-lg">
            <Link
              to="/employee/profile"
              className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
