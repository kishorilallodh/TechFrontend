import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";
import serviceReducer from "../features/admin/service/serviceSlice";
import profileReducer from "../features/employee/profile/profileSlice";
import attendanceReducer from "../features/employee/attendance/attendanceSlice";
import testimonialReducer from "../features/admin/testimonials/testimonialSlice";
import employeeAdminReducer from "../features/admin/AllUser/employeeAdminSlice";
import jobReducer from "../features/admin/jobs/jobSlice";
import applicationReducer from "../features/admin/applications/applicationSlice";
import queryReducer from "../features/admin/queries/querySlice";
import adminAttendanceReducer from "../features/admin/allAttendance/adminAttendanceSlice";
import certificateReducer from "../features/admin/certificate/certificateSlice";
import letterReducer from "../features/admin/letter/letterSlice";
import salaryReducer from "../features/admin/salaryslip/salarySlice";
import technologyReducer from '../features/admin/technology/technologySlice';

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  services: serviceReducer,
  technologies: technologyReducer,
  attendance: attendanceReducer,
  testimonials: testimonialReducer,
  adminEmployees: employeeAdminReducer,
  adminJobs: jobReducer,
  adminApplications: applicationReducer,
  adminQueries: queryReducer,
  adminAttendance: adminAttendanceReducer,
  certificates: certificateReducer,
  letters: letterReducer,
  salary: salaryReducer,
});

const rootReducer = (state, action) => {
  // Jab logout successful ho, toh poore state ko undefined kar do
  if (action.type === logout.fulfilled.type) {
    // Sirf auth state ko chhodkar (kyunki woh apne slice me handle ho raha hai),
    // baaki sab ko undefined kar do. combineReducers unhe unki initial state par le aayega.
    // Ya aasan tareeka hai poore state ko hi undefined kar dena.
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer, // 👈 Yahan rootReducer ka use karein
});
