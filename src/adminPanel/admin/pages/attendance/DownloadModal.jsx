import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiX, FiDownload, FiUsers, FiUser } from "react-icons/fi";
// import { exportAllAttendance, exportEmployeeAttendance } from '../../../../features/admin/allAttendance/adminAttendanceApiService';
import adminAttendanceApiService from "../../../../features/admin/allAttendance/adminAttendanceApiService";
const DownloadModal = ({ isOpen, onClose, employee }) => {
  const { user: adminUser } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState("all"); // 'all' or 'single'
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Agar employee prop hai, to report type 'single' set kar do
    if (employee) {
      setReportType("single");
    } else {
      setReportType("all");
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      let blob;
      let filename;
      const monthStr = String(month).padStart(2, "0");

      if (reportType === "all") {
        blob = await adminAttendanceApiService.exportAllAttendance(
          { year, month },
          adminUser.token
        );
        filename = `All_Employees_Attendance_${year}-${monthStr}.xlsx`;
      } else if (employee) {
        // Safety check
        // highlight-start
        // --- YAHAN PAR HAI ASLI FIX ---
        // 'employee.user._id' ke bajaye seedha 'employee._id' ka istemal karein
        blob = await adminAttendanceApiService.exportEmployeeAttendance(
          { employeeId: employee._id, year, month },
          adminUser.token
        );

        // 'employee.user.name' ke bajaye seedha 'employee.name' ka istemal karein
        const employeeName = employee.name.replace(/\s+/g, "_");
        filename = `${employeeName}_Attendance_${year}-${monthStr}.xlsx`;
        // --- FIX KHATAM ---
        // highlight-end
      }
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to download report.");
    } finally {
      setIsLoading(false);
    }
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Export Attendance Report
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX />
          </button>
        </div>
        <div className="space-y-4">
          {/* Report Type Selector */}
          {!employee && ( // Yeh tabhi dikhega jab all attendance page se khulega
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setReportType("all")}
                  className={`flex-1 p-2 rounded-md flex items-center justify-center gap-2 ${
                    reportType === "all"
                      ? "bg-[#03286d] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <FiUsers /> All Employees
                </button>
                <button
                  disabled
                  className="flex-1 p-2 rounded-md flex items-center justify-center gap-2 bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  <FiUser /> Single Employee
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                To download for a single employee, go to their history page.
              </p>
            </div>
          )}
          {employee && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
              <p className="text-sm text-gray-600">Generating report for:</p>
              <p className="font-semibold text-blue-800">{employee.name}</p>
            </div>
          )}

          {/* Date Selector */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                {months.map((m) => (
                  <option key={m.v} value={m.v}>
                    {m.n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-green-300"
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                <FiDownload /> Download Excel
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
