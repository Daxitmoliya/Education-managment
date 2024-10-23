import {
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "New Admission", href: "/newadmission", icon: UserPlusIcon },
  { name: "All Students", href: "/allstudents", icon: UsersIcon },
  { name: "Attendance", href: "/attendance", icon: ShieldCheckIcon },
];

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } bg-gray-900 text-white`}
    >
      {/* Sidebar content */}
      <div className="flex flex-col h-full justify-between">
        {/* Toggle Button */}
        <button
          className={`absolute top-5 right-[-15px] bg-gray-700 p-1 rounded-full ${
            isExpanded ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "←" : "→"}
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-2 mt-6 px-4">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"
                }`
              }
            >
              <item.icon className="h-6 w-6" />
              <span className={`${isExpanded ? "block" : "hidden"} transition-all duration-300`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* User Section */}
        <div className="p-4">
          <div className="flex items-center gap-4">
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
            <div className={`${isExpanded ? "block" : "hidden"} transition-all duration-300`}>
              <div className="text-base font-semibold">Admin</div>
              <span className="text-sm text-gray-400">admin@example.com</span>
            </div>
          </div>
          <button className="flex items-center mt-4 gap-3 p-2 text-sm text-gray-400 hover:text-red-500">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span className={`${isExpanded ? "block" : "hidden"} transition-all duration-300`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-y-auto h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Main Content Area</h1>
        <p className="mt-4">
          This is the main content. Only this section should scroll while the sidebar stays fixed on the left.
        </p>
        {/* Add more content here to test scrolling */}
        <div className="mt-10">
          {[...Array(100).keys()].map((_, idx) => (
            <p key={idx}>Scroll content {idx + 1}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Layout;
