import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import ErrorBoundary from "../commonPage/ErrorBoundary";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className=" ">
          {/* Page content rendered here */}
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
