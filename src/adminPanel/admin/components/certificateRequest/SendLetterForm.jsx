import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createOfferLetter,
  createExperienceLetter,
  fetchAllUsers,
  reset,
} from "../../../../features/admin/letter/letterSlice";
import {
  FiMail,
  FiFileText,
  FiBriefcase,
  FiUserCheck,
  FiCalendar,
  FiClock,
  FiAward,
} from "react-icons/fi";
import Select from "react-select";

// --- Reusable Input Component with Icon ---
const Input = ({ id, label, icon, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        {...props}
        className="mt-1 block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </div>
);

// --- Reusable Select Component with Icon ---
const CustomSelect = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
   
      <Select
        id={id}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: "#D1D5DB",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            minHeight: "25px",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#4338CA"
              : state.isFocused
              ? "#E0E7FF"
              : null,
            color: state.isSelected ? "white" : "black",
          }),
          input: (provided) => ({
            ...provided,
            paddingLeft: "0.2rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            marginLeft: "0.2rem",
          }),
          singleValue: (provided) => ({
            ...provided,
            marginLeft: "0.2rem",
          }),
        }}
      />
    </div>
  </div>
);

const SendLetterForm = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.letters);

  const [letterType, setLetterType] = useState("offer");
  const [selectedUser, setSelectedUser] = useState(null);

  // Common state for position (using react-select object)
  const [position, setPosition] = useState(null);

  // Offer Letter State
  const [joiningDate, setJoiningDate] = useState("");

  // Experience Letter State
  const [issueDate, setIssueDate] = useState("");
  const [duration, setDuration] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  // --- Predefined Positions ---
  const POSITIONS = [
    { value: "Software Engineer Intern", label: "Software Engineer Intern" },
    { value: "Frontend Developer Intern", label: "Frontend Developer Intern" },
    { value: "Backend Developer Intern", label: "Backend Developer Intern" },
    {
      value: "Full Stack Developer Intern",
      label: "Full Stack Developer Intern",
    },
    { value: "Data Science Intern", label: "Data Science Intern" },
    { value: "UI/UX Design Intern", label: "UI/UX Design Intern" },
    { value: "Product Management Intern", label: "Product Management Intern" },
  ];

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error || "Something went wrong.");
      dispatch(reset());
    }
    if (status === "succeeded") {
      toast.success(`Letter sent successfully!`);
      // Reset form fields
      setSelectedUser(null);
      setPosition(null);
      setJoiningDate("");
      setIssueDate("");
      setDuration("");
      setTimePeriod("");
      dispatch(reset());
    }
  }, [status, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return toast.error("Please select a user.");
    }
    if (!position) {
      return toast.error("Please select a position/role.");
    }

    const userId = selectedUser.value;

    if (letterType === "offer") {
      if (!joiningDate) return toast.error("Please enter a joining date.");
      dispatch(
        createOfferLetter({ userId, position: position.value, joiningDate })
      );
    } else {
      if (!issueDate || !duration || !timePeriod)
        return toast.error("Please fill all fields for the experience letter.");
      dispatch(
        createExperienceLetter({
          userId,
          issueDate,
          position: position.value,
          duration,
          timePeriod,
        })
      );
    }
  };

  const userOptions = users.map((user) => ({
    value: user._id,
    label: `${user.name} (${user.email})`,
  }));

  const activeBtn = "bg-[#03286d] text-white shadow-md";
  const inactiveBtn = "bg-slate-200 text-slate-600 hover:bg-slate-300";

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200/80">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-full">
          <FiMail className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Generate & Send Letter
          </h2>
          <p className="text-gray-500">
            Select a letter type, recipient, and fill in the details.
          </p>
        </div>
      </div>

      {/* Letter Type Switcher */}
      <div className="flex gap-4 rounded-lg p-1.5 bg-slate-100 mb-8">
        <button
          onClick={() => setLetterType("offer")}
          className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
            letterType === "offer" ? activeBtn : inactiveBtn
          }`}
        >
          <FiFileText /> Offer Letter
        </button>
        <button
          onClick={() => setLetterType("experience")}
          className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
            letterType === "experience" ? activeBtn : inactiveBtn
          }`}
        >
          <FiBriefcase /> Experience Letter
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Recipient Details Section --- */}
        <div className="p-6 rounded-lg bg-slate-50 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recipient
          </h3>
          <CustomSelect
            id="user"
            label="Select User"
            icon={<FiUserCheck className="w-5 h-5 text-gray-400" />}
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Search for a user by name or email..."
          />
        </div>

        {/* --- Letter Details Section --- */}
        <div className="p-6 rounded-lg bg-slate-50 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Letter Details
          </h3>
          {/* --- Common Field --- */}
          <div className="mb-6">
            <CustomSelect
              id="position"
              label="Position / Role"
              icon={<FiAward className="w-5 h-5 text-gray-400" />}
              options={POSITIONS}
              value={position}
              onChange={setPosition}
              placeholder="Select the position..."
            />
          </div>

          {/* --- Conditional Fields with Transition --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {letterType === "offer" && (
              <div className="animate-fade-in">
                <Input
                  id="joiningDate"
                  label="Joining Date"
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                  icon={<FiCalendar className="w-5 h-5 text-gray-400" />}
                />
              </div>
            )}
            {letterType === "experience" && (
              <>
                <div className="animate-fade-in">
                  <Input
                    id="duration"
                    label="Work Duration"
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 6 months"
                    required
                    icon={<FiClock className="w-5 h-5 text-gray-400" />}
                  />
                </div>
                <div className="animate-fade-in">
                  <Input
                    id="timePeriod"
                    label="Time Period"
                    type="text"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    placeholder="e.g., Jan 2024 to June 2024"
                    required
                    icon={<FiCalendar className="w-5 h-5 text-gray-400" />}
                  />
                </div>
                <div className="animate-fade-in md:col-span-2">
                  <Input
                    id="issueDate"
                    label="Letter Issue Date"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                    icon={<FiCalendar className="w-5 h-5 text-gray-400" />}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex justify-center items-center gap-3 bg-[#03286d] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              {letterType === "offer" ? (
                <FiFileText size={20} />
              ) : (
                <FiBriefcase size={20} />
              )}
              Send {letterType === "offer" ? "Offer" : "Experience"} Letter
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendLetterForm;
