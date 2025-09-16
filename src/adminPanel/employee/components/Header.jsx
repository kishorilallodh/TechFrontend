// src/components/Header.js

import { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import profileImg from "../../../assets/crm.jpg"; // Fallback image
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import { resetProfile } from "../../../features/employee/profile/profileSlice";
import { toast } from "react-toastify";
// 👉 Step 1: Naye icons ko import karein
import { FiUser, FiClipboard, FiAward } from "react-icons/fi";

const Header = ({ setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetProfile());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const userAvatar = profile?.profileImage
    ? `${API_BASE_URL}${profile.profileImage}`
    : profileImg;

  return (
    <header className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <Bars3Icon className="w-7 h-7" />
        </button>
        <h1 className="hidden lg:block text-2xl font-semibold text-gray-800">
          Welcome back, {user ? user.name : "Guest"}!
        </h1>
      </div>

      <div className="flex items-center gap-5 relative" ref={dropdownRef}>

        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <img
            src={userAvatar}
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover bg-gray-200"
          />
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-48 border border-gray-200">
            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-sm text-gray-800">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === "admin" ? "Administrator" : "Employee"}
              </p>
            </div>
            {/* 👉 Step 2: Naye links ko yahan add karein */}
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/employee/profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiUser className="w-4 h-4 text-gray-500" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/employee/attendance-employee"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiClipboard className="w-4 h-4 text-gray-500" />
                  <span>Attendance</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/employee/internship-certificate"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiAward className="w-4 h-4 text-gray-500" />
                  <span>Certificate</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
