import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./adminPanel/commonPage/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";
import Careers from "./pages/Careers";
// import Crm from "./components/serviceExplore/Crm";
// import ChatBot from "./components/serviceExplore/ChatBot";
// import SchoolErp from "./components/serviceExplore/SchoolErp";
import AuthPage from "./adminPanel/commonPage/Login";
import AdminLayout from "./adminPanel/admin/AdminLayout";
import AdminDashboard from "./adminPanel/admin/pages/AdminDashboard";
import AllTeam from "./adminPanel/admin/pages/AllTeam";
import AllServices from "./adminPanel/admin/pages/AllServices";
import ManageServices from "./adminPanel/admin/pages/ManageServices";
import EmployeeLayout from "./adminPanel/employee/EmployeeLayout";
import EmployeeDashboard from "./adminPanel/employee/pages/EmployeeDashboard";
import Profile from "./adminPanel/employee/pages/Profile";
import UpdateProfile from "./adminPanel/employee/components/UpdateProfile";
import EmployeeCertificateRequest from "./adminPanel/employee/pages/EmployeeCertificateRequest";
import AttendanceEmployee from "./adminPanel/employee/pages/AttendanceEmployee";
import InternshipCertificateRequest from "./adminPanel/employee/pages/InternshipCertificate";
import Attendance from "./adminPanel/admin/pages/attendance/Attendance";
import Query from "./adminPanel/admin/pages/Query";
import CertificateVerification from "./pages/CertificateVerification";
import AdminTestimonials from "./adminPanel/admin/pages/AdminTestimonials";
import AdminCareersPage from "./adminPanel/admin/pages/AdminCareersPage";
import AdminApplicationsPage from "./adminPanel/admin/pages/AdminApplicationsPage";
import ForgotPassword from "./adminPanel/commonPage/ForgotPassword";
import ResetPassword from "./adminPanel/commonPage/ResetPassword";
import UserLettersPage from "./adminPanel/employee/pages/UserLettersPage";
import NotFoundPage from "./adminPanel/commonPage/NotFoundPage";
import EmployeeSalarySlip from "./adminPanel/employee/pages/EmployeeSalarySlip";
import SalarySlipGenerator from "./adminPanel/admin/pages/SalarySlipGenerator";
import ServiceDetails from "./components/ServiceDetails";
import SalaryHistory from "./adminPanel/admin/pages/SalaryHistory";
import AdminCertificateRequest from "./adminPanel/admin/pages/AdminCertificateRequest";

export const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        children: [
          {
            index: true,
            element: <Services />,
          },
          {
            path: ":slug",
            element: <ServiceDetails />,
          },

          // {
          //   path: "crm",
          //   element: <Crm />,
          // },
          // {
          //   path: "chatbot",
          //   element: <ChatBot />,
          // },
          // {
          //   path: "school-erp",
          //   element: <SchoolErp />,
          // },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "certificate-verification",
        element: <CertificateVerification />,
      },
    ],
  },
  {
    path: "admin/",
    element: <ProtectedRoute allowedRoles={["admin"]} />, // ✅ Admin ko bhi protect kiya
    children: [
      {
        element: <AdminLayout />, // ✅ Layout ko nested kiya
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "all-team",
            element: <AllTeam />,
          },
          {
            path: "all-services",
            element: <AllServices />,
          },
          {
            path: "manage-services",
            element: <ManageServices />,
          },
          {
            path: "request-dashboard",
            element: <AdminCertificateRequest />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "query",
            element: <Query />,
          },
          {
            path: "testimonials",
            element: <AdminTestimonials />,
          },
          {
            path: "careers",
            element: <AdminCareersPage />,
          },
          {
            path: "applications",
            element: <AdminApplicationsPage />,
          },
          {
            path: "salary-slip",
            element: <SalarySlipGenerator />,
          },
          {
            path: "salary-history",
            element: <SalaryHistory />,
          },
        ],
      },
    ],
  },
  {
    path: "employee/",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <EmployeeLayout />,
        children: [
          {
            index: true,
            element: <EmployeeDashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "certificate-request",
            element: <EmployeeCertificateRequest />,
          },
          {
            path: "attendance-employee",
            element: <AttendanceEmployee />,
          },
          {
            path: "internship-certificate",
            element: <InternshipCertificateRequest />,
          },
          {
            path: "user-letter",
            element: <UserLettersPage />,
          },
          {
            path: "salary-slip",
            element: <EmployeeSalarySlip />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <AuthPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
