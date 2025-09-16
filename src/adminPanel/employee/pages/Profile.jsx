// components/Profile/ProfilePage.js

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyProfile,
  resetProfile,
} from "../../../features/employee/profile/profileSlice";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiBriefcase,
  FiCreditCard,
  FiClipboard,
  FiAward,
} from "react-icons/fi";
import logo from "../../../assets/banerimg.webp"; 

// --- Reusable Sub-components for a Cleaner UI ---

// Loader Component
const ProfileLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-gray-50">
    <div className="text-center p-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
      <p className="mt-4 text-lg text-gray-600">Loading Your Profile...</p>
    </div>
  </div>
);

// Error Component
const ProfileError = ({ error }) => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-gray-50">
    <div className="text-center p-10 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold text-red-600">
        Oops! Something went wrong.
      </h3>
      <p className="mt-2 text-gray-600">
        We couldn't load your profile. Please try again later.
      </p>
      {error && (
        <p className="mt-4 text-sm text-red-500 bg-red-100 p-2 rounded">
          Error: {error}
        </p>
      )}
    </div>
  </div>
);

// Component for a single piece of information
const InfoField = ({ icon, label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <div className="mt-1 flex items-center gap-3 text-gray-800">
      <span className="text-blue-800">{icon}</span>
      <span>{value || "Not Provided"}</span>
    </div>
  </div>
);

// Skeleton version of InfoField
const SkeletonInfoField = () => (
  <div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="mt-1 flex items-center gap-3">
      <div className="h-5 w-5 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Component for a styled card section
const InfoCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      {children}
    </div>
  </div>
);

// Skeleton version of InfoCard
const SkeletonInfoCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonInfoField key={index} />
      ))}
    </div>
  </div>
);

// Skeleton for profile header
const ProfileHeaderSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-pulse">
    <div className="h-28 bg-gray-300" />
    <div className="px-6 pb-4 relative">
      <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20">
        <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
        <div className="mt-4 lg:mt-8 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto sm:mx-0 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto sm:mx-0"></div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-auto">
          <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Profile Page Component ---

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    // Fetch profile data when the component mounts
    dispatch(fetchMyProfile());

    // Cleanup function: Reset profile state when the component unmounts
    // This prevents showing stale data if the user navigates away and back.
    return () => {
      dispatch(resetProfile());
    };
  }, [dispatch]);

  // Handle Loading State with skeleton
  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-full">
        <div className="max-w-7xl mx-auto p-4">
          <ProfileHeaderSkeleton />
          
          {/* Skeleton for Profile Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              <SkeletonInfoCard />
              <SkeletonInfoCard />
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-1">
              <SkeletonInfoCard />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Error State
  if (status === "failed" || !profile) {
    return <ProfileError error={error} />;
  }

  // Once data is loaded successfully
  const userData = profile.user || {}; // Safety check

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className=" min-h-full">
      <div className="max-w-7xl mx-auto p-4 ">
        
        {/* --- Profile Header --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="h-28 bg-gradient-to-br from-blue-800 to-indigo-900" 
           style={{
                          backgroundImage: `url(${logo})`,
                          backgroundSize: '100% ',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                      }}
          />
          <div className="px-6 pb-4 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20">
              {profile.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${profile.profileImage}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 border-4 border-white shadow-lg">
                  <FiUser className="w-20 h-20 text-gray-500" />
                </div>
              )}
              <div className="mt-4 lg:mt-8 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900 ">{userData.name}</h2>
                <p className="text-md text-blue-800 font-semibold flex items-center justify-center sm:justify-start gap-2 -mt-1">
                  
                  {profile.designation || "No Designation"}
                </p>
              </div>
              <Link
                to="/employee/update-profile"
                className="flex items-center gap-2 bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition-colors mt-4 sm:mt-0 sm:ml-auto"
              >
                <FiEdit />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Profile Details Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <InfoCard title="Contact & Personal Information">
              <InfoField icon={<FiMail />} label="Email Address" value={userData.email} />
              <InfoField icon={<FiPhone />} label="Mobile Number" value={userData.mobile} />
              <InfoField icon={<FiCalendar />} label="Date of Birth" value={formatDate(profile.dob)} />
              <InfoField icon={<FiBriefcase />} label="Joining Date" value={formatDate(profile.joiningDate)} />
            </InfoCard>

            <InfoCard title="Official & Financial Information">
              <InfoField icon={<FiCreditCard />} label="PAN Number" value={profile.panNumber} />
              <InfoField icon={<FiClipboard />} label="Bank Account Number" value={profile.bankAccountNumber} />
            </InfoCard>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <InfoCard title="Address Information">
              <div className="sm:col-span-2">
                <InfoField icon={<FiMapPin />} label="Full Address" value={profile.address} />
              </div>
              <InfoField label="City" value={profile.city} />
              <InfoField label="State" value={profile.state} />
              <InfoField label="Pincode" value={profile.pincode} />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;