import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"; // toast ko import kar lein, error dikhane ke liye
import {
  fetchEmployeeHistory,
  reset as resetAttendance,
} from "../../../../features/admin/allAttendance/adminAttendanceSlice";
import {
  fetchUserProfileById,
  resetViewedProfile,
} from "../../../../features/employee/profile/profileSlice"; // ❗ Sahi path daalein
import { FiArrowLeft } from "react-icons/fi";
import { FaUser, FaIdBadge, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import DownloadModal from "./DownloadModal";

const EmployeeDetails = ({ selectedEmployee, handleBackClick }) => {
  const dispatch = useDispatch();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // Attendance data
  const {
    employeeHistory,
    status: attendanceStatus,
    error: attendanceError,
  } = useSelector((state) => state.adminAttendance);

  // Profile data
  const {
    viewedProfile,
    status: profileStatus,
    error: profileError,
  } = useSelector((state) => state.profile);

  // const userFromList = selectedEmployee?.user;

  useEffect(() => {
    if (selectedEmployee?._id) {
      // highlight-start
      // Ab selected month/year ke hisaab se data fetch karein
      dispatch(
        fetchEmployeeHistory({ employeeId: selectedEmployee._id, year, month })
      );
      // highlight-end
      dispatch(fetchUserProfileById(selectedEmployee._id));
    }
    // Cleanup function
    return () => {
      dispatch(resetAttendance());
      dispatch(resetViewedProfile());
    };
  }, [dispatch, selectedEmployee, year, month]);

  // Dono slices ke errors ko handle karein
  useEffect(() => {
    if (attendanceStatus === "failed" && attendanceError) {
      toast.error(`Attendance Error: ${attendanceError}`);
    }
    if (profileStatus === "failed" && profileError) {
      toast.error(`Profile Error: ${profileError}`);
    }
  }, [attendanceStatus, attendanceError, profileStatus, profileError]);

  if (!selectedEmployee) {
    return null; // Agar selectedEmployee na ho toh kuch render na karein
  }

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Leave":
        return "bg-blue-100 text-blue-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Info cards ke liye data combine karein
  const employeeDetails = {
    // highlight-start
    // `userFromList` ke bajaye seedha `selectedEmployee` se data lein
    name: viewedProfile?.user?.name || selectedEmployee?.name,
    email: viewedProfile?.user?.email || selectedEmployee?.email,
    mobile: viewedProfile?.user?.mobile || "N/A",
    // highlight-end
    joiningDate: viewedProfile?.joiningDate,
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    { v: 1, n: "January" },
    { v: 2, n: "February" },
    { v: 3, n: "March" },
    { v: 4, n: "April" },
    { v: 5, n: "May" },
    { v: 6, n: "June" },
    { v: 7, n: "July" },
    { v: 8, n: "August" },
    { v: 9, n: "September" },
    { v: 10, n: "October" },
    { v: 11, n: "November" },
    { v: 12, n: "December" },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance History</h2>

        <div className="flex items-center gap-4">
          {/* highlight-start */}
          {/* Month/Year Selectors */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            {months.map((m) => (
              <option key={m.v} value={m.v}>
                {m.n}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {/* highlight-end */}
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border font-semibold"
          >
            {" "}
            Export History{" "}
          </button>
          <button onClick={handleBackClick} className="bg-[#03286d] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition">
            {" "}
            Back{" "}
          </button>
        </div>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <InfoCard
          icon={<FaUser />}
          label="Employee"
          value={employeeDetails.name}
          color="text-blue-900"
        />
        <InfoCard
          icon={<FaCalendarAlt />}
          label="Joining Date"
          value={
            profileStatus === "loading"
              ? "Loading..."
              : formatDate(employeeDetails.joiningDate)
          }
          color="text-yellow-400"
        />
        <InfoCard
          icon={<FaIdBadge />}
          label="Email ID"
          value={employeeDetails.email}
          color="text-green-400"
        />
        <InfoCard
          icon={<FaUserTie />}
          label="Mobile Number"
          value={
            profileStatus === "loading" ? "Loading..." : employeeDetails.mobile
          }
          color="text-indigo-800"
        />
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto border border-gray-200 shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">DATE</th>
              <th className="py-3 px-6 text-left">CHECK IN</th>
              <th className="py-3 px-6 text-left">CHECK OUT</th>
              <th className="py-3 px-6 text-left">WORK PLAN / SUMMARY</th>
              <th className="py-3 px-6 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {attendanceStatus === "loading" && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Loading history...
                </td>
              </tr>
            )}
            {attendanceStatus !== "loading" && employeeHistory.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No history found for this employee.
                </td>
              </tr>
            )}
            {attendanceStatus === "succeeded" &&
              employeeHistory.map((record) => (
                <tr
                  key={record._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 whitespace-nowrap">
                    {formatDate(record.date)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    {formatTime(record.clockInTime)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    {formatTime(record.clockOutTime)}
                  </td>
                  <td
                    className="py-3 px-6 text-xs max-w-sm"
                    title={record.workSummary || record.workPlan}
                  >
                    {record.workPlan && (
                      <p className="font-semibold text-gray-700">
                        Plan:{" "}
                        <span className="font-normal line-clamp-2">
                          {record.workPlan}
                        </span>
                      </p>
                    )}
                    {record.workSummary && (
                      <p className="font-semibold text-gray-700 mt-1">
                        Summary : working Hours
                        {record.durationMinutes > 0 && (
                          <>
                            ({Math.floor(record.durationMinutes / 60)}h{" "}
                            {record.durationMinutes % 60}m)
                          </>
                        )}
                        <span className="font-normal line-clamp-2">
                          {record.workSummary}
                        </span>
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          employee={selectedEmployee} // 👈 Employee ka data yahan pass karein
        />
      </div>
    </div>
  );
};

// Reusable InfoCard component
const InfoCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between gap-4 h-full">
    <div className="min-w-0 flex flex-col">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800 break-words mt-1 truncate">
        {value}
      </p>
    </div>
    <div className={`${color} text-3xl flex-shrink-0`}>{icon}</div>
  </div>
);

export default EmployeeDetails;
