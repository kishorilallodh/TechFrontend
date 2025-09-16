// src/employee/pages/AttendanceEmployee.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiLogIn, FiLogOut, FiX,FiCalendar as FiLeave } from "react-icons/fi";

// Redux thunks ko import karein
import {
  doClockIn,
  doClockOut,
  fetchTodayAttendance,
  fetchMonthlyAttendance,
  doRequestLeave,
  reset,
} from "../../../features/employee/attendance/attendanceSlice"; // Sahi path daalein

const AttendanceEmployee = () => {
  const dispatch = useDispatch();

  // Redux store se data lein
  const { todayAttendance, monthlyRecords, status, error } = useSelector(
    (state) => state.attendance
  );

  // Local UI states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workedDuration, setWorkedDuration] = useState({ h: 0, m: 0, s: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [workNote, setWorkNote] = useState("");
  const [date, setDate] = useState(new Date());

  // Check karein ki user clocked in hai ya nahi
  const isClockedIn = todayAttendance?.status === 'Present' && !todayAttendance.clockOutTime;
  const isAttendanceMarked = todayAttendance && todayAttendance.status !== 'NotClockedIn';
  const isDayComplete = isAttendanceMarked && (todayAttendance.clockOutTime || todayAttendance.status === 'Leave' || todayAttendance.status === 'Holiday');
  const clockInTime = isClockedIn ? new Date(todayAttendance.clockInTime) : null;

  // Component load hone par aaj ka data fetch karein
  useEffect(() => {
    dispatch(fetchTodayAttendance());
    return () => {
      dispatch(reset());
    }; // Cleanup
  }, [dispatch]);

  // Error handling
  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [status, error, dispatch]);

  // Timer for current time and worked duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isClockedIn && clockInTime) {
        const diff = new Date() - clockInTime;
        setWorkedDuration({
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isClockedIn, clockInTime]);

  // Calendar month change hone par data fetch karein
  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    dispatch(fetchMonthlyAttendance({ year, month }));
  }, [date, dispatch]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setWorkNote("");
  };

 const handleModalSubmit = (e) => {
    e.preventDefault();
    let action;
    
    // highlight-start
    // Modal submit logic me 'requestLeave' ka case add karein
    switch (modalType) {
      case 'clockIn':
        action = doClockIn(workNote);
        break;
      case 'clockOut':
        action = doClockOut(workNote);
        break;
      case 'requestLeave':
        action = doRequestLeave(workNote);
        break;
      default:
        return;
    }
    // highlight-end

    dispatch(action)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        setIsModalOpen(false);
      })
      .catch((err) => { /* Error handled by useEffect */ });
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const status = monthlyRecords[dateStr];

      switch (status) {
        case "Present":
          return "present-day";
        case "Absent":
          return "absent-day";
        case "Leave":
          return "leave-day";
        case "Holiday":
          return "holiday-day";
        default:
          return null;
      }
    }
  };

  // Monthly summary ko dynamically calculate karein
  const monthlySummary = Object.values(monthlyRecords).reduce(
    (acc, status) => {
      if (status === "Present") acc.present++;
      else if (status === "Absent") acc.absent++;
      else if (status === "Leave") acc.leave++;
      return acc;
    },
    { present: 0, absent: 0, leave: 0 }
  );

  return (
    <>
      <style>{`
            .react-calendar { 
                border: none !important; 
                width: 100%; /* ✅ YEH LINE AAPKI PROBLEM SOLVE KAR DEGI */
                font-family: inherit; 
            }
            .react-calendar__navigation button { font-weight: bold; }
            .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none !important; font-weight: 600; padding-bottom: 2px; border-bottom: 2px dotted #ccc; }
            .react-calendar__tile { border-radius: 9999px !important; padding: 0.6rem 0.5rem; }
            .react-calendar__tile--active { background: #1e3a8a !important; color: white !important; }
            .react-calendar__tile--now { background: #e0e7ff !important; font-weight: bold; }
            .present-day { background-color: #d1fae5; color: #065f46; }
            .absent-day { background-color: #fee2e2; color: #991b1b; }
            .leave-day { background-color: #fef3c7; color: #92400e; }
            .holiday-day { background-color: #dbeafe; color: #1e40af; }
        `}</style>
      <div className="bg-gray-100 min-h-full p-4 ">
        {/* Clock In/Out Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Mark Your Attendance
          </h2>
          <p className="text-gray-500 mb-4">
            {currentTime.toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="text-4xl font-bold text-gray-900 mb-6">
            {currentTime.toLocaleTimeString()}
          </div>

          {status === "loading" && !isAttendanceMarked && <p className="text-gray-500">Loading status...</p>}

           {/* Case 1: Agar din ki attendance poori ho chuki hai (clock-out ya leave) */}
          {isDayComplete && (
            <div className="p-3 bg-gray-100 rounded-lg text-gray-600 font-semibold">
              Today's attendance has been marked.
            </div>
          )}

          {/* Case 2: Agar user clocked-in hai (lekin clock-out nahi kiya) */}
          {isClockedIn && (
            <button
              onClick={() => openModal("clockOut")}
              className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-red-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              <FiLogOut /> Clock Out
            </button>
          )}
          
          {/* Case 3: Agar user ne abhi tak koi attendance nahi lagayi hai */}
          {!isAttendanceMarked && status !== 'loading' && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal("clockIn")}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                <FiLogIn /> Clock In
              </button>
              <button
                onClick={() => openModal("requestLeave")}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                <FiLeave /> Request Leave
              </button>
            </div>
          )}

          {isClockedIn && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-xl mx-auto text-left">
              <div className="flex justify-between items-center">
                <p className="text-sm text-blue-800">
                  Clocked in at: {clockInTime.toLocaleTimeString()}
                </p>
                <p className="text-lg font-semibold text-blue-900">
                  Worked: {String(workedDuration.h).padStart(2, "0")}:
                  {String(workedDuration.m).padStart(2, "0")}:
                  {String(workedDuration.s).padStart(2, "0")}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm font-semibold text-gray-700">
                  Today's Plan:
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {todayAttendance?.workPlan}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Calendar and Side Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={getTileClassName}
              onActiveStartDateChange={({ activeStartDate }) =>
                setDate(activeStartDate)
              }
            />
          </div>
          {/* Monthly Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Summary for {date.toLocaleString("default", { month: "long" })}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-600">Present</span><span className="font-bold text-green-600 text-lg">{monthlySummary.present}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Leave</span><span className="font-bold text-yellow-600 text-lg">{monthlySummary.leave}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Absent</span><span className="font-bold text-red-600 text-lg">{monthlySummary.absent}</span></div>
                {/* CHANGE 3: Loss of Pay Days add kiya */}
                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">Loss of Pay Days</span>
                  <span className="font-bold text-red-700 text-lg">{monthlySummary.absent + monthlySummary.leave}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Work Description Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                {/* highlight-start */}
                {/* Modal ka title dynamic banaya */}
                <h2 className="text-xl font-bold text-gray-800">
                  {modalType === 'clockIn' && "Today's Work Plan"}
                  {modalType === 'clockOut' && "Today's Work Summary"}
                  {modalType === 'requestLeave' && "Reason for Leave"}
                </h2>
                {/* highlight-end */}
                <button onClick={() => setIsModalOpen(false)}><FiX className="text-gray-500" /></button>
              </div>
              <form onSubmit={handleModalSubmit}>
                <textarea
                  value={workNote}
                  onChange={(e) => setWorkNote(e.target.value)}
                  required
                  rows="5"
                  // highlight-start
                  // Placeholder bhi dynamic banaya
                  placeholder={
                    modalType === 'clockIn' ? "List the tasks you plan to work on today..." :
                    modalType === 'clockOut' ? "Summarize the tasks you have completed today..." :
                    "Please provide a reason for your leave..."
                  }
                  // highlight-end
                  className="w-full p-2 border border-gray-300 rounded-md ..."
                ></textarea>
                <div className="mt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 ...">Cancel</button>
                  {/* highlight-start */}
                  {/* Submit button ko bhi dynamic banaya */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`px-4 py-2 text-white font-semibold rounded-lg ${
                      modalType === 'clockIn' ? 'bg-green-500 hover:bg-green-600' :
                      modalType === 'clockOut' ? 'bg-red-500 hover:bg-red-600' :
                      'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  >
                    {status === "loading" ? "Submitting..." : 
                     modalType === 'clockIn' ? "Confirm Clock In" : 
                     modalType === 'clockOut' ? "Confirm Clock Out" : 
                     "Submit Leave"}
                  </button>
                  {/* highlight-end */}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceEmployee;
