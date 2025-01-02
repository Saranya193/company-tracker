import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./pages/NavBar"; // Import NavBar component
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import CompanyOverview from "./pages/CompanyOverview";
import ManageCompany from "./pages/ManageCompany";
import ManageCommunicationMethods from "./pages/ManageCommunicationMethods";
import UserDashboard from "./pages/UserDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import CalendarView from "./pages/CalendarView";
import Help from "./pages/Help";
import ReportingAndAnalytics from "./pages/ReportingAndAnalytics";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        {/* NavBar Component */}
        <NavBar />

        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div
                className="h-screen flex items-center justify-center bg-cover bg-center text-white text-center"
                style={{
                  backgroundImage: "url('/anima3.gif')",
                }}
              >
                <div className="bg-black bg-opacity-50 p-8 rounded-lg space-y-6">
                  <h1 className="text-4xl font-bold">
                    Welcome to the Communication Tracker
                  </h1>
                  <p className="text-xl">Choose an option to get started</p>
                  <div className="flex justify-center gap-6">
                    <Link
                      to="/admin/overview"
                      className="button type1"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/user/userdashboard"
                      className="button type2"
                    >
                      User Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            }
          />

          {/* Admin Module */} 
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="overview" element={<CompanyOverview />} />
            <Route path="manage-company" element={<ManageCompany />} />
            <Route path="manage-communication" element={<ManageCommunicationMethods />} />
          </Route>

          {/* User Module */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="calendar-view" element={<CalendarView />} />
          </Route>

          {/* Help Page */}
          <Route path="/help" element={<Help />} />
          <Route path="/reports" element={<ReportingAndAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
