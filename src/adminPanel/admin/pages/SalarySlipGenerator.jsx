import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiClock } from "react-icons/fi";
import {
  FiArrowLeft,
  FiSearch,
  FiLoader,
  FiSend,
  FiEye,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";
import {
  fetchEmployees,
  reset as resetEmployees,
} from "../../../features/admin/AllUser/employeeAdminSlice"; // ❗ Sahi path daalein
import {
  fetchEmployeeDetailsForSalary,
  createDraftSlip,
  publishSlip,
  fetchSlipsForUserByAdmin,
  clearSalaryState,
} from "../../../features/admin/salaryslip/salarySlice"; // ❗ Sahi path daalein
import SalarySlip from "../components/SalarySlip"; // ❗ Sahi path daalein

// --- Helper & Skeleton Components ---
const getInitials = (name = "") => {
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0) +
    (names[names.length - 1] ? names[names.length - 1].charAt(0) : "")
  ).toUpperCase();
};

const SkeletonLoader = () => (
  <tbody className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="border-b border-gray-200">
        <td className="px-6 py-4">
          <div className="h-10 bg-gray-300 rounded-full w-3/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </td>
      </tr>
    ))}
  </tbody>
);

// Modal Component for Preview
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
        >
          <FiX size={24} />
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const SalarySlipGenerator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // UI State
  const [view, setView] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [slipToPreview, setSlipToPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const initialFormState = {
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    earnings: [
      { description: "Basic Salary", amount: "" },
      { description: "House Rent Allowance (HRA)", amount: "" },
      { description: "Conveyance Allowance", amount: "" },
    ],
    deductions: [
      { description: "Professional Tax", amount: "" },
      { description: "Provident Fund (PF)", amount: "" },
      { description: "Loss of Pay", amount: "" },
    ],
  };
  const [form, setForm] = useState(initialFormState);

  // Redux State
  const { employees, status: employeeStatus } = useSelector(
    (state) => state.adminEmployees
  );
  const {
    employeeDetails,
    userSlips,
    status: salaryStatus,
    error: salaryError,
    success: salarySuccess,
  } = useSelector((state) => state.salary);

  useEffect(() => {
    dispatch(fetchEmployees());
    return () => {
      dispatch(resetEmployees());
      dispatch(clearSalaryState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (salaryError) {
      toast.error(salaryError);
      dispatch(clearSalaryState());
    }
    if (salarySuccess) {
      toast.success(salarySuccess);
      dispatch(clearSalaryState());
    }
  }, [salaryError, salarySuccess, dispatch]);

  // --- Handlers ---
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    dispatch(fetchSlipsForUserByAdmin(employee._id));
    setView("manage");
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setView("list");
    dispatch(clearSalaryState());
  };

  const handleGoToGenerator = () => {
    setForm(initialFormState); // Reset form
    dispatch(
      fetchEmployeeDetailsForSalary({
        userId: selectedEmployee._id,
        month: form.month,
        year: form.year,
      })
    );
    setView("generate");
  };

  const handleFormChange = (type, index, field, value) => {
    const updatedItems = [...form[type]];
    updatedItems[index][field] = value;
    setForm({ ...form, [type]: updatedItems });
  };

const handleDynamicRowChange = (type, index, field, value) => {
    const updatedItems = [...form[type]];
    updatedItems[index][field] = value;
    setForm({ ...form, [type]: updatedItems });
};

const addRow = (type) => {
    setForm(prevForm => ({
        ...prevForm,
        [type]: [...prevForm[type], { description: '', amount: '' }]
    }));
};

const removeRow = (type, index) => {
    setForm(prevForm => ({
        ...prevForm,
        [type]: prevForm[type].filter((_, i) => i !== index)
    }));
};

  const handleCreateDraft = (e) => {
    e.preventDefault();
    const totalEarnings = form.earnings.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    const totalDeductions = form.deductions.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );

    const slipData = {
      month: form.month,
      year: form.year,
      presentDays: employeeDetails.presentDays,
      lossOfPayDays: employeeDetails.lossOfPayDays,
      basicSalary:
        Number(
          form.earnings.find((e) => e.description === "Basic Salary")?.amount
        ) || 0,
      earnings: form.earnings.filter(
        (item) => item.description && Number(item.amount) > 0
      ),
      deductions: form.deductions.filter(
        (item) => item.description && Number(item.amount) > 0
      ),
      totalEarnings,
      totalDeductions,
      netSalary: totalEarnings - totalDeductions,
    };

    dispatch(createDraftSlip({ userId: selectedEmployee._id, slipData })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          handleSelectEmployee(selectedEmployee);
        }
      }
    );
  };

  const handlePublish = (slipId) => {
    if (
      window.confirm(
        "Are you sure you want to send this slip to the employee? This action cannot be undone."
      )
    ) {
      dispatch(publishSlip(slipId));
    }
  };

  const handlePreview = async (slip) => {
    // Step 1: Check if profile details are already in the Redux state.
    if (!employeeDetails) {
      // Step 2: If not, fetch them. We use 'unwrap' to wait for the thunk to finish.
      try {
        const details = await dispatch(
          fetchEmployeeDetailsForSalary({
            userId: selectedEmployee._id,
            month: slip.month, // Use the slip's month/year
            year: slip.year,
          })
        ).unwrap(); // .unwrap() thunk ka result (payload) deta hai ya error throw karta hai

        // Step 3: Now that we have the details, construct the preview data.
        const previewData = {
          employeeData: {
            name: selectedEmployee.name,
            dateofjoining: details.dateOfJoining,
            designation: details.designation,
            workingday: slip.presentDays,
            pan: details.pan,
            bankAccount: details.bankAccountNumber,
          },
          salaryData: {
            month: slip.month,
            year: slip.year,
            earnings: slip.earnings,
            deductions: slip.deductions,
          },
        };
        setSlipToPreview(previewData);
        setIsModalOpen(true);
      } catch (error) {
        toast.error("Could not fetch employee details for preview.");
      }
    } else {
      // Step 4: If details are already present, just use them.
      const previewData = {
        employeeData: {
          name: selectedEmployee.name,
          dateofjoining: employeeDetails.dateOfJoining,
          designation: employeeDetails.designation,
          workingday: slip.presentDays,
          pan: employeeDetails.pan,
          bankAccount: employeeDetails.bankAccountNumber,
        },
        salaryData: {
          month: slip.month,
          year: slip.year,
          earnings: slip.earnings,
          deductions: slip.deductions,
        },
      };
      setSlipToPreview(previewData);
      setIsModalOpen(true);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Logic ---

  // View 1: Employee List
  if (view === "list") {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
  {/* Left Section - Heading */}
  <div>
    <h1 className="text-2xl font-bold text-gray-800">Generate Salary Slip</h1>
    <p className="text-gray-500 mt-1">
      Select an employee to begin the process.
    </p>
  </div>

  {/* Right Section - Search + Button */}
  <div className="flex items-center gap-3 mt-4 sm:mt-0">
    {/* Search Box */}
    <div className="relative w-full sm:w-64">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Button */}
    <button
      onClick={() => navigate("/admin/salary-history")}
      className="flex items-center gap-2 bg-[#03286d] text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-900"
    >
      <FiClock /> History
    </button>
  </div>
</div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {employeeStatus === "loading" ? (
                <SkeletonLoader />
              ) : (
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {getInitials(emp.name)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {emp.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleSelectEmployee(emp)}
                          className="px-4 py-2 bg-[#03286d] text-white rounded-md hover:bg-blue-900"
                        >
                          Manage Slips
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }

  // View 2: Manage Slips for a User
  if (view === "manage") {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Slips for {selectedEmployee.name}
          </h2>
          <div className="flex items-center gap-3">
          <button
            onClick={handleGoToGenerator}
            className="flex items-center gap-2 bg-[#03286d] text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            <FiPlus /> Generate New Slip
          </button>
        <button
          onClick={handleBackToList}
          className="bg-[#03286d] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
        >
           Back 
        </button>
        </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Month-Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Net Salary
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userSlips.length > 0 ? (
                  userSlips.map((slip) => (
                    <tr
                      key={slip._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {slip.month} {slip.year}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800 font-semibold">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(slip.netSalary)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            slip.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {slip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handlePreview(slip)}
                            className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors duration-150"
                            title="Preview Slip"
                          >
                            <FiEye />
                            <span>Preview</span>
                          </button>
                          {slip.status === "Draft" && (
                            <button
                              onClick={() => handlePublish(slip._id)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-900 transition-colors duration-150"
                              title="Send to Employee"
                            >
                              <FiSend />
                              <span>Send</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      No salary slips found for this employee.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {slipToPreview && (
            <SalarySlip
              employeeData={slipToPreview.employeeData}
              salaryData={slipToPreview.salaryData}
            />
          )}
        </Modal>
      </div>
    );
  }

  // View 3: Generate a New Slip
  // --- SalarySlipGenerator.js component ke andar ---

if (view === "generate") {
    // Live calculation ke liye values derive karein
    const totalEarnings = form.earnings.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalDeductions = form.deductions.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const netSalary = totalEarnings - totalDeductions;
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800   ">
              New Slip for <span className="text-[#03286d]">{selectedEmployee.name}</span>
              <span className="block text-lg font-normal text-gray-500">{form.month} {form.year}</span>
            </h2>
          </div>
          <button
            onClick={() => setView("manage")}
            className="bg-[#03286d] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
          >
             Back 
          </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">

            {/* Employee Details Section */}
            {salaryStatus === "loading" && !employeeDetails ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 p-4 bg-gray-50 rounded-lg border animate-pulse">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-8 bg-gray-200 rounded"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2 p-4 bg-gray-50 rounded-lg border text-sm">
                <div><strong>Present:</strong> <span className="font-semibold text-gray-700">{employeeDetails?.presentDays} days</span></div>
                <div><strong>LOP:</strong> <span className="font-semibold text-gray-700">{employeeDetails?.lossOfPayDays} days</span></div>
                <div><strong>PAN:</strong> <span className="font-semibold text-gray-700">{employeeDetails?.pan}</span></div>
                <div><strong>Bank A/C:</strong> <span className="font-semibold text-gray-700">{employeeDetails?.bankAccountNumber}</span></div>
              </div>
            )}

            <form onSubmit={handleCreateDraft} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* --- Earnings Section --- */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Earnings</h3>
                  {form.earnings.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Earning Description"
                        value={item.description}
                        onChange={(e) => handleDynamicRowChange("earnings", index, "description", e.target.value)}
                        required
                        className="flex-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleDynamicRowChange("earnings", index, "amount", e.target.value)}
                        required
                        className="w-32 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {index > 2 && ( // Pehle 3 items (default) ko delete na karne dein
                         <button type="button" onClick={() => removeRow("earnings", index)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addRow("earnings")} className="text-sm flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800"><FiPlus /> Add Earning</button>
                </div>

                {/* --- Deductions Section --- */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Deductions</h3>
                  {form.deductions.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Deduction Description"
                        value={item.description}
                        onChange={(e) => handleDynamicRowChange("deductions", index, "description", e.target.value)}
                        required
                        className="flex-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleDynamicRowChange("deductions", index, "amount", e.target.value)}
                        required
                        className="w-32 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                       {index > 2 && (
                         <button type="button" onClick={() => removeRow("deductions", index)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addRow("deductions")} className="text-sm flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800"><FiPlus /> Add Deduction</button>
                </div>
              </div>
              
              {/* --- Summary Section --- */}
              <div className="mt-8 pt-6 border-t-2 border-dashed">
                <div className="max-w-sm ml-auto space-y-3 text-right">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Earnings (A):</span>
                        <span className="font-bold text-lg text-green-600">{formatCurrency(totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Deductions (B):</span>
                        <span className="font-bold text-lg text-red-600">{formatCurrency(totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2 mt-2">
                        <span className="font-bold text-gray-800">Net Salary (A-B):</span>
                        <span className="font-bold text-xl text-indigo-700">{formatCurrency(netSalary)}</span>
                    </div>
                </div>
              </div>

              {/* --- Action Button --- */}
              <div className="text-right pt-6 border-t">
                <button
                  type="submit"
                  disabled={salaryStatus === "loading" || !employeeDetails}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#03286d] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                  {salaryStatus === "loading" ? (
                    <>
                      <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Saving Draft...
                    </>
                  ) : (
                    "Save as Draft"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default SalarySlipGenerator;
