import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <nav className="w-full lg:w-1/4 bg-gray-800 text-white p-6">
        {/* Toggle Button for Mobile View */}
        <button
          className="block lg:hidden bg-gray-700 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            const sidebar = document.getElementById("user-sidebar");
            sidebar.classList.toggle("hidden");
          }}
        >
          Menu
        </button>
        <ul id="user-sidebar" className="space-y-6 hidden lg:block">
          <li>
            <Link
              to="/user/userdashboard"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              User Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user/notifications"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/user/calendar-view"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Calendar View
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
