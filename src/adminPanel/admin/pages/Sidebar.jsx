import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  HomeIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  // 👉 Step 1: Naye icons ko import karein
  ChatBubbleLeftRightIcon, // Testimonials ke liye
  BuildingOfficeIcon,     // Job Section ke liye
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import img from "../../../assets/TechDigi_Logo.png";
import { logout, reset } from "../../../features/auth/authSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const activeClass = "bg-blue-900 text-white font-semibold";
  const inactiveClass = "text-slate-600 hover:bg-slate-200";

  const navItems = [
    {
      group: "Main",
      items: [{ to: "/admin", end: true, icon: HomeIcon, label: "Dashboard" }],
    },
    {
      group: "Services",
      items: [
        { to: "/admin/all-services", icon: FolderIcon, label: "All Services" },
        { to: "/admin/manage-services", icon: BriefcaseIcon, label: "Manage Services" },
      ],
    },
    {
      group: "Employee Management",
      items: [
        { to: "/admin/all-team", icon: ClipboardDocumentListIcon, label: "All Team" },
        { to: "/admin/salary-slip", icon: FolderIcon, label: "salary-slip" },
        { to: "/admin/attendance", icon: ChatBubbleBottomCenterTextIcon, label: " Attendance" },
        { to: "/admin/request-dashboard", icon: EnvelopeIcon, label: "Certificate Request" },
      ],
    }, 
    // 👉 Step 2: Naya group "Website Management" add karein
    {
      group: "Website Management",
      items: [
        { to: "/admin/testimonials", icon: ChatBubbleLeftRightIcon, label: "Testimonials" },
        { to: "/admin/careers", icon: BuildingOfficeIcon, label: "Job Section" },
      ],
    },
    {
      group: "Communication",
      items: [
        { to: "/admin/applications", icon: BriefcaseIcon, label: "Job Applications" },
        { to: "/admin/query", icon: ClipboardDocumentListIcon, label: "Query" },
        // { to: "/admin/notification", icon: ChatBubbleBottomCenterTextIcon, label: "Notification" },
      ],
    },
  ];

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(reset());
        toast.success("Logout successful!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.message || "Logout failed. Please try again.");
      });
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 lg-hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center flex-shrink-0">
          <Link to={"/admin"}>  
        <img src={img} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-800"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 flex-grow overflow-y-auto">
          {navItems.map((navGroup, groupIndex) => (
            <div key={groupIndex} className={groupIndex > 0 ? "mt-4" : ""}>
              <h3 className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {navGroup.group}
              </h3>
              <ul className="space-y-1">
                {navItems[groupIndex].items.map((item, itemIndex) => (
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