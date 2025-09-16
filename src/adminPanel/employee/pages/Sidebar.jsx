import { NavLink, useNavigate } from "react-router-dom"; // ✅ useNavigate import
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HomeIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  QuestionMarkCircleIcon,
  BellIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon
} from "@heroicons/react/24/solid";
import img from "../../../assets/TechDigi_Logo.png";
import { logout, reset } from "../../../features/auth/authSlice";
import { MdOutlineCurrencyRupee } from "react-icons/md";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ navigate hook

  const navLinkClasses =
    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors duration-200";
  const activeClass = "bg-blue-900 text-white font-semibold";
  const inactiveClass = "text-slate-600 hover:bg-slate-200";

  const navItems = [
    {
      group: "Menu",
      items: [
        { to: "/employee", end: true, icon: HomeIcon, label: "Dashboard" },
        { to: "/employee/profile", icon: UserCircleIcon, label: "Profile" },
      ],
    },
    {
      group: "Activities",
      items: [
         {
          to: "/employee/user-letter", // The new route for viewing letters
          icon: EnvelopeIcon,      // Using the EnvelopeIcon
          label: "My Letters",
        },
        {
          to: "/employee/attendance-employee",
          icon: ClipboardDocumentCheckIcon,
          label: "Attendance",
        },
        {
          to: "/employee/certificate-request",
          icon: DocumentTextIcon,
          label: "Certificate Request",
        },
        {
          to: "/employee/internship-certificate",
          icon: DocumentTextIcon,
          label: "Certificate",
        },
        
      ],
    },

    {
      group: "Revenue",
      items: [
        {
          to: "/employee/salary-slip",
          icon: MdOutlineCurrencyRupee ,
          label: "salary-slip",
        },
      ],
    },
    
  ];

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout successful!");
        dispatch(reset());
        navigate("/login"); // ✅ redirect to login page
      })
      .catch((err) => {
        toast.error(err || "Logout failed");
      });
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-white z-30 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-white z-40 flex flex-col transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center flex-shrink-0 ">
           <Link to={"/"}>  
        <img src={img} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-3 flex-grow overflow-y-auto">
          {navItems.map((navGroup, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {navGroup.group}
              </h3>
              <ul className="space-y-1">
                {navGroup.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `${navLinkClasses} ${
                          isActive ? activeClass : inactiveClass
                        }`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon className="w-6 h-6 flex-shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout button at the bottom */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-900 hover:text-white w-full"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
