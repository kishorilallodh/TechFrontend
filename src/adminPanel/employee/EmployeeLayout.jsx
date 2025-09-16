import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMyProfile } from "../../features/employee/profile/profileSlice"; // ❗ Sahi path check karein
import Sidebar from "./pages/Sidebar";
import Header from "./components/Header";
import ErrorBoundary from "../commonPage/ErrorBoundary";

const EmployeeLayout = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
