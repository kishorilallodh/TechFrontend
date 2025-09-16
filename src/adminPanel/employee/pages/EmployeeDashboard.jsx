import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProfile } from "../../../features/employee/profile/profileSlice";
// highlight-start
// We no longer need Chart.js imports for this new design
import { fetchMonthlyAttendance } from "../../../features/employee/attendance/attendanceSlice";
// highlight-end
import {
  ClockIcon,
  DocumentTextIcon,
  UserCircleIcon,
  EnvelopeIcon as EmailIcon,
  DevicePhoneMobileIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { profile, status: profileStatus } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const { monthlyRecords, status: attendanceStatus } = useSelector(
    (state) => state.attendance
  );

  useEffect(() => {
    if (!profile) {
      dispatch(fetchMyProfile());
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    dispatch(fetchMonthlyAttendance({ year, month }));
  }, [dispatch, profile]);

  // highlight-start
  // Enhanced data processing to include totals and percentages for the new UI
  const attendanceData = useMemo(() => {
    const counts = { present: 0, absent: 0, leave: 0 };
    if (monthlyRecords) {
      Object.values(monthlyRecords).forEach((status) => {
        if (status === "Present") counts.present++;
        else if (status === "Absent") counts.absent++;
        else if (status === "Leave") counts.leave++;
      });
    }

    const totalDays = counts.present + counts.absent + counts.leave;

    return {
      ...counts,
      totalDays,
      presentPercentage: totalDays > 0 ? (counts.present / totalDays) * 100 : 0,
      absentPercentage: totalDays > 0 ? (counts.absent / totalDays) * 100 : 0,
      leavePercentage: totalDays > 0 ? (counts.leave / totalDays) * 100 : 0,
    };
  }, [monthlyRecords]);
  // highlight-end

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex bg-gray-100 ">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4">
          {/* === STATS CARDS (UNCHANGED) === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoCard
              icon={<UserCircleIcon className="h-10 w-10 text-indigo-500" />}
              label="My Designation"
              value={
                profileStatus === "loading"
                  ? "Loading..."
                  : profile?.designation || "Not Set"
              }
              bgColor="bg-white"
            />
            <InfoCard
              icon={<EmailIcon className="h-8 w-8 text-green-500" />}
              label="Email Address"
              value={user?.email || "Not Available"}
              bgColor="bg-white"
            />
            <InfoCard
              icon={<DevicePhoneMobileIcon className="h-8 w-8 text-sky-500" />}
              label="Mobile Number"
              value={user?.mobile || "Not Available"}
              bgColor="bg-white"
            />
            <InfoCard
              icon={<CalendarDaysIcon className="h-8 w-8 text-rose-500" />}
              label="Joining Date"
              value={
                profileStatus === "loading"
                  ? "Loading..."
                  : formatDate(profile?.joiningDate)
              }
              bgColor="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* highlight-start */}
            {/* === NEW, MORE VISUAL ATTENDANCE CARD === */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  This Month's Attendance Summary
                </h2>
              </div>
              <div className="p-6">
                {attendanceStatus === "loading" && (
                  <div className="text-center py-10 text-gray-500">
                    Loading Summary...
                  </div>
                )}

                {attendanceStatus === "succeeded" && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <MetricItem
                        count={attendanceData.present}
                        label="Present"
                        color="bg-green-500"
                      />
                      <MetricItem
                        count={attendanceData.leave}
                        label="On Leave"
                        color="bg-yellow-500"
                      />
                      <MetricItem
                        count={attendanceData.absent}
                        label="Absent"
                        color="bg-red-500"
                      />
                    </div>

                    {/* Stacked Progress Bar */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-6">
                        Monthly Overview
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden flex">
                        <div
                          className="bg-green-500 h-4"
                          style={{
                            width: `${attendanceData.presentPercentage}%`,
                          }}
                          title={`Present: ${attendanceData.present} days`}
                        ></div>
                        <div
                          className="bg-yellow-500 h-4"
                          style={{
                            width: `${attendanceData.leavePercentage}%`,
                          }}
                          title={`On Leave: ${attendanceData.leave} days`}
                        ></div>
                        <div
                          className="bg-red-500 h-4"
                          style={{
                            width: `${attendanceData.absentPercentage}%`,
                          }}
                          title={`Absent: ${attendanceData.absent} days`}
                        ></div>
                      </div>
                    </div>

                    {/* Loss of Pay Info */}
                    <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg ">
                      <p className="text-sm font-medium text-red-700">
                        Total Loss of Pay Days
                      </p>
                      <p className="text-2xl font-bold text-red-800">
                        {attendanceData.absent + attendanceData.leave}
                      </p>
                    </div>
                  </div>
                )}

                {attendanceStatus === "failed" && (
                  <div className="text-center py-10 text-red-500">
                    Could not load attendance data.
                  </div>
                )}
              </div>
            </div>
            {/* === REPLACEMENT ENDS HERE === */}
            {/* highlight-end */}

            {/* Quick Actions (UNCHANGED) */}
            <div className="bg-white rounded-lg shadow">
              <div className="">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-2 grid grid-cols-1 ">
                  <Link
                    to={"/employee/certificate-request"}
                    className="flex gap-6 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <DocumentTextIcon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">
                      Request Certificate
                    </span>
                  </Link>
                  <Link
                    to={"/employee/attendance-employee"}
                    className="flex gap-6 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-green-100 text-green-600 ">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">Mark Attendance</span>
                  </Link>
                  <Link
                    to={"/employee/salary-slip"}
                    className="flex gap-6  items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 ">
                      <CurrencyDollarIcon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">View Salary</span>
                  </Link>
                  <Link
                    to={"/employee/user-letter"}
                    className="flex gap-6 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 ">
                      <EnvelopeIcon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">Generate Letter</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Reusable Info Card Component (UNCHANGED) ---
const InfoCard = ({ icon, label, value, bgColor }) => (
  <div
    className={`p-4 rounded-lg shadow flex items-center gap-4 ${
      bgColor || "bg-white"
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
      <p className="text-sm font-bold text-gray-800 truncate ">{value}</p>
    </div>
  </div>
);

// highlight-start
// A small helper component for the key metrics to keep the code clean
const MetricItem = ({ count, label, color }) => (
  <div>
    <div className="flex items-center justify-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`}></span>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);
// highlight-end

export default EmployeeDashboard;
