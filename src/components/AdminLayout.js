import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <nav className="w-full lg:w-1/4 bg-gray-800 text-white p-6">
        <button
          className="block lg:hidden bg-gray-700 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("hidden");
          }}
        >
          Menu
        </button>
        <ul
          id="sidebar"
          className="space-y-6 hidden lg:block"
        >
          <li>
            <Link
              to="/admin/overview"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Company Overview
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-company"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Manage Company
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-communication"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded"
            >
              Manage Communication Methods
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

export default AdminLayout;
