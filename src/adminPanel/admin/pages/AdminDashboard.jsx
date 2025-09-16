// src/pages/admin/AdminDashboard.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  FolderIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowPathIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Sahi Thunks ko import karein
import { fetchEmployees } from "../../../features/admin/AllUser/employeeAdminSlice";
import { fetchServices } from "../../../features/admin/service/serviceApi";
import { fetchJobs } from "../../../features/admin/jobs/jobSlice";
import { fetchQueries } from "../../../features/admin/queries/querySlice";

// Chart.js ko register karein
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// highlight-start: StatCard Component ko Link bana diya gaya hai
const StatCard = ({ icon: Icon, title, value, bgColor, loading, linkTo }) => (
  <Link
    to={linkTo}
    className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {loading ? (
        <div className="mt-2">
          <ArrowPathIcon className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : (
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      )}
    </div>
    <div className={`p-3 rounded-full ${bgColor}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </Link>
);
// highlight-end

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Redux store se saara data select karein
  const { employees, status: employeeStatus } = useSelector(
    (state) => state.adminEmployees
  );
  const { list: services, loading: serviceLoading } = useSelector(
    (state) => state.services
  );
  const { jobs, status: jobStatus } = useSelector((state) => state.adminJobs);
  const { queries, status: queryStatus } = useSelector(
    (state) => state.adminQueries
  );

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchServices());
    dispatch(fetchJobs());
    dispatch(fetchQueries());
  }, [dispatch]);

  const pendingQueries = queries.filter((q) => q.status !== "Replied");
  const recentEmployees = employees
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Chart Data
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
  const chartData = {
    labels: ["Employees", "Services", "Jobs", "Queries"],
    datasets: [
      {
        label: "Total Count",
        data: [employees.length, services.length, jobs.length, queries.length],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderRadius: 5,
      },
    ],
  };

  return (
    <main className="flex-1 p-6 sm:p-8 bg-slate-50">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, Admin! Here's a summary of your portal.
          </p>
        </div>

        {/* Right Side Button */}
        <Link
          to="/"
          className="bg-[#03286d] font-semibold text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
        >
          Go to website
        </Link>
      </div>

      {/* highlight-start: Stats Cards ko linkTo prop pass kiya gaya hai */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={UsersIcon}
          title="Total Employees"
          value={employees.length}
          loading={employeeStatus === "loading"}
          bgColor="bg-blue-500"
          linkTo="/admin/all-team"
        />
        <StatCard
          icon={FolderIcon}
          title="Active Services"
          value={services.length}
          loading={serviceLoading}
          bgColor="bg-green-500"
          linkTo="/admin/all-services"
        />
        <StatCard
          icon={EnvelopeIcon}
          title="Total Jobs"
          value={jobs.length}
          loading={jobStatus === "loading"}
          bgColor="bg-amber-500"
          linkTo="/admin/careers"
        />
        <StatCard
          icon={ChatBubbleBottomCenterTextIcon}
          title="New Queries"
          value={pendingQueries.length}
          loading={queryStatus === "loading"}
          bgColor="bg-red-500"
          linkTo="/admin/query"
        />
      </div>
      {/* highlight-end */}

      {/* Baaki ka layout (No changes) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Portal Summary
            </h2>
            <div className="h-60">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Recent Employees
            </h2>
            <ul className="divide-y divide-slate-200 max-h-72 overflow-y-auto pr-2">
              {recentEmployees.length > 0 ? (
                recentEmployees.map((emp) => (
                  <li
                    key={emp._id}
                    className="py-3 flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {emp.name}
                      </p>
                      <p className="text-sm text-slate-500">{emp.email}</p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-xs text-slate-400 flex items-center justify-end">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  No employees found.
                </p>
              )}
            </ul>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Pending Queries
            </h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {pendingQueries.length > 0 ? (
                pendingQueries.map((query) => (
                  <div
                    key={query._id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-md"
                  >
                    <div>
                      <p className="font-semibold text-sm text-slate-700">
                        {query.name}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {query.subject}
                      </p>
                    </div>
                    <Link
                      to="/admin/query"
                      className="text-sm flex-shrink-0 ml-2 font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  No pending queries. All caught up!
                </p>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Links
            </h2>
            <div className="space-y-3">
              <QuickLink to="/admin/attendance" text="Employee Attendance" />
              <QuickLink to="/admin/salary-slip" text="Salary Slip" />
              <QuickLink
                to="/admin/request-dashboard"
                text="Certificate Request"
              />
              <QuickLink to="/admin/applications" text="Job Applications" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const QuickLink = ({ to, text }) => (
  <Link
    to={to}
    className="flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
  >
    <span className="font-medium text-sm text-slate-700">{text}</span>
    <ArrowRightIcon className="w-4 h-4 text-slate-500" />
  </Link>
);

export default AdminDashboard;
