import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMySlips,
  clearSalaryState,
} from "../../../features/admin/salaryslip/salarySlice"; // ❗ Sahi path daalein
import { fetchMyProfile } from "../../../features/employee/profile/profileSlice"; // ❗ Apne profile slice ka path dein
import UserSalarySlip from "../components/UserSalarySlip"; // Make sure this path is correct
import {
  FiFilter,
  FiLoader,
  FiCalendar,
  FiFileText,
  FiPrinter,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MySalarySlips = () => {
  const dispatch = useDispatch();
  const slipPreviewRef = useRef(null); // Ref to the component to be converted to PDF

  // Redux State
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { mySlips, status: salaryStatus } = useSelector(
    (state) => state.salary
  );

  // Local State
  const [filters, setFilters] = useState({ month: "", year: "" });
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false); // To show loading state on button

  // Fetch all data on initial load
  useEffect(() => {
    dispatch(fetchMySlips());
    dispatch(fetchMyProfile());
    return () => {
      dispatch(clearSalaryState());
    };
  }, [dispatch]);

  // Set the first slip as selected by default
  useEffect(() => {
    if (mySlips.length > 0 && !selectedSlip) {
      setSelectedSlip(mySlips[0]);
    }
  }, [mySlips, selectedSlip]);

  // PDF Download Handler (No change needed here, it will work with the new layout)
  const handleDownloadPdf = () => {
    const input = slipPreviewRef.current;
    if (!input) {
      console.error("The element to be converted to PDF is not available.");
      return;
    }
    setIsDownloading(true);

    html2canvas(input, {
      scale: 2,
      useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Salary_Slip_${selectedSlip.month}_${selectedSlip.year}.pdf`);
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        setIsDownloading(false);
      });
  };

  // Event Handlers
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    dispatch(fetchMySlips(filters));
    setSelectedSlip(null);
  };

  const availableYears = [...new Set(mySlips.map((slip) => slip.year))].sort(
    (a, b) => b - a
  );
  const availableMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Reconstruct data for the SalarySlip component
  const employeeDataForSlip = selectedSlip
    ? {
        name: user?.name,
        dateofjoining: profile
          ? new Date(profile.joiningDate).toLocaleDateString("en-GB")
          : "N/A",
        designation: profile?.designation || "N/A",
        workingday: selectedSlip.presentDays,
        pan: profile?.panNumber || "N/A",
        bankAccount: profile?.bankAccountNumber || "N/A",
      }
    : null;

  const salaryDataForSlip = selectedSlip
    ? {
        month: selectedSlip.month,
        year: selectedSlip.year,
        earnings: selectedSlip.earnings,
        deductions: selectedSlip.deductions,
      }
    : null;

  return (
    <div className="p-4 lg:p-4  min-h-screen">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">My Salary Slips</h1> */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Filters and Slips List */}
        <div className="lg:col-span-4">
          {/* ... (No changes in this part) ... */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={handleApplyFilter} className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg border-b pb-2 mb-2">
                Filter Slips
              </h3>
              <div>
                <label htmlFor="year-select" className="text-sm font-medium">
                  Year
                </label>
                <select
                  id="year-select"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="mt-1 w-full p-2 border rounded-md"
                >
                  <option value="">All Years</option>
                  {availableYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="month-select" className="text-sm font-medium">
                  Month
                </label>
                <select
                  id="month-select"
                  name="month"
                  value={filters.month}
                  onChange={handleFilterChange}
                  className="mt-1 w-full p-2 border rounded-md"
                >
                  <option value="">All Months</option>
                  {availableMonths.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FiFilter className="mr-2" /> Apply Filters
              </button>
            </form>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="font-semibold text-lg border-b pb-2 mb-2">
              Available Slips
            </h3>
            <div className="space-y-2 mt-4 max-h-96 overflow-y-auto">
              {salaryStatus === "loading" && (
                <FiLoader
                  className="animate-spin mx-auto text-indigo-600"
                  size={24}
                />
              )}
              {salaryStatus !== "loading" && mySlips.length > 0
                ? mySlips.map((slip) => (
                    <button
                      key={slip._id}
                      onClick={() => setSelectedSlip(slip)}
                      className={`w-full text-left p-3 rounded-md flex items-center gap-4 transition-colors ${
                        selectedSlip?._id === slip._id
                          ? "bg-indigo-100 text-indigo-800"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FiCalendar />
                      <div>
                        <p className="font-semibold">
                          {slip.month} {slip.year}
                        </p>
                        <p className="text-xs text-gray-500">
                          Net:{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(slip.netSalary)}
                        </p>
                      </div>
                    </button>
                  ))
                : salaryStatus !== "loading" && (
                    <p className="text-center text-gray-500 p-4">
                      No slips found.
                    </p>
                  )}
            </div>
          </div>
        </div>

        {/* Right Side: Salary Slip Preview with Download Button */}
        <div className="lg:col-span-8">
          {selectedSlip ? (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="pb-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Salary Slip Details
                </h3>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm font-medium disabled:bg-gray-400"
                >
                  {isDownloading ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <FiPrinter />
                  )}
                  {isDownloading ? "Downloading..." : "Download PDF"}
                </button>
              </div>

              {/*// highlight-start*/}
              {/* This is the key change: A wrapper div with A4 aspect ratio */}
              <div
                ref={slipPreviewRef}
                className="w-full max-w-full mx-auto mt-4 aspect-[210/297] bg-white"
              >
                {employeeDataForSlip && salaryDataForSlip && (
                  <UserSalarySlip
                    employeeData={employeeDataForSlip}
                    salaryData={salaryDataForSlip}
                  />
                )}
              </div>
              {/*// highlight-end*/}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-center items-center text-center">
              <FiFileText className="text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Select a Salary Slip
              </h3>
              <p className="text-gray-500 mt-2">
                Choose a slip from the left panel to view its details here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySalarySlips;
