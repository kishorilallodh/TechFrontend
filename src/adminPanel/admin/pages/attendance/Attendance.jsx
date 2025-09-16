import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchTodaysAttendance,
  reset,
} from "../../../../features/admin/allAttendance/adminAttendanceSlice"; // ❗ Verify this path
import EmployeeDetails from "./EmployeeDetails";
import DownloadModal from './DownloadModal';
import { FiDownload } from 'react-icons/fi';
import EmployeeList from './EmployeeList';
const Attendance = () => {
  const dispatch = useDispatch();
   const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const { todaysRecords, status, error } = useSelector(
    (state) => state.adminAttendance
  );

  const [currentView, setCurrentView] = useState("today");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [today, setToday] = useState(new Date());

 useEffect(() => {
    // Sirf 'today' view me hi fetch karein
    if (currentView === 'today') {
      const dateString = today.toISOString().split("T")[0];
      dispatch(fetchTodaysAttendance(dateString));
    }
  }, [dispatch, today, currentView]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

 // -- Event Handlers for Navigation --
  const handleViewDetails = (record) => {
    // `record` me `user` object hai
    setSelectedEmployee(record.user);
    setCurrentView("details");
  };

  const handleSelectFromList = (user) => {
    // `user` poora user object hai
    setSelectedEmployee(user);
    setCurrentView("details");
  };

  const handleBackToToday = () => {
    setCurrentView("today");
    setSelectedEmployee(null);
  };
  
  const handleBackToList = () => {
      setCurrentView("employeeList");
      setSelectedEmployee(null);
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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

  const presentCount = todaysRecords.filter(
    (emp) => emp.status === "Present"
  ).length;
  const leaveCount = todaysRecords.filter(
    (emp) => emp.status === "Leave" || emp.status === "Absent"
  ).length;
  // Note: Total employees should come from the user/employee slice for accuracy.
  // For now, we'll use the length of today's records.
  const totalCount = todaysRecords.length;

  const renderTodaysAttendance = () => (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Today's Attendance
          </h2>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        {/* Summary Stats */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="bg-blue-100 px-4 py-2 rounded-lg min-w-[140px]">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Total Records</p>
              <span className="text-lg font-bold text-black">{totalCount}</span>
            </div>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg min-w-[100px]">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Present</p>
              <span className="text-xl font-bold text-black">
                {presentCount}
              </span>
            </div>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg min-w-[100px]">
            <div className="flex justify-between items-center ">
              <p className="text-sm text-gray-600">Absent/Leave </p>
              <span className="text-xl font-bold text-black ml-2">{leaveCount}</span>
            </div>
          </div>
 <button onClick={() => setCurrentView('employeeList')} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-sm font-semibold">
              All User
          </button>
           <button onClick={() => setIsDownloadModalOpen(true)} className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border font-semibold">
                        <FiDownload /> Export Report
           </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <div className="border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="text-gray-600 uppercase text-sm leading-normal bg-slate-100 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Employee Name</th>
                <th className="py-3 px-6 text-left">Check In</th>
                <th className="py-3 px-6 text-left">Check Out</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {status === "loading" && (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              )}
              {status !== "loading" && todaysRecords.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    No attendance records found for today.
                  </td>
                </tr>
              )}
              {status === "succeeded" &&
                todaysRecords.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6">
                      <div>
                        <p className="font-medium">{record.user.name}</p>
                        <p className="text-xs text-gray-500">
                          {record.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={
                          !record.clockInTime ? "text-gray-400" : "font-medium"
                        }
                      >
                        {formatTime(record.clockInTime)}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={
                          !record.clockOutTime ? "text-gray-400" : "font-medium"
                        }
                      >
                        {formatTime(record.clockOutTime)}
                      </span>
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
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleViewDetails(record)}
                        className="px-3 py-1 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <DownloadModal 
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
            />
        </div>
      </div>
    </div>
  );

 if (currentView === "employeeList") {
    return <EmployeeList onSelectEmployee={handleSelectFromList} onBack={handleBackToToday} />;
  }
  
  if (currentView === "details") {
    return <EmployeeDetails selectedEmployee={selectedEmployee} handleBackClick={handleBackToList} />;
  }

  // Default view is 'today'
  return renderTodaysAttendance();
};

export default Attendance;
