import React from "react";
import { useCompanyContext } from "../context/CompanyContext";

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};

const getNotifications = (companies) => {
  const today = new Date();
  const todayFormatted = formatDate(today);

  const overdue = companies.filter(
    (company) => formatDate(company.nextCommunication.date) < todayFormatted
  );

  const todayTasks = companies.filter(
    (company) => formatDate(company.nextCommunication.date) === todayFormatted
  );

  return { overdue, todayTasks };
};

const NotificationsPage = () => {
  const { state } = useCompanyContext();

  if (!state || !state.companies || !Array.isArray(state.companies)) {
    return <p>Error: Invalid company data</p>;
  }

  const { overdue, todayTasks } = getNotifications(state.companies);
  const totalNotifications = overdue.length + todayTasks.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
        <div
          className={`flex items-center justify-center w-10 h-10 ${
            totalNotifications > 0 ? "bg-red-500" : "bg-gray-300"
          } text-white text-lg font-bold rounded-full`}
        >
          {totalNotifications}
        </div>
      </header>

      {/* Overdue Communications Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Overdue Communications</h3>
        {overdue.length > 0 ? (
          <table className="w-full table-auto bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-2 text-left text-sm text-gray-700">Company</th>
                <th className="px-4 py-2 text-left text-sm text-gray-700">Next Communication Date</th>
              </tr>
            </thead>
            <tbody>
              {overdue.map((company) => (
                <tr key={company.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{company.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {formatDate(company.nextCommunication.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No overdue communications.</p>
        )}
      </section>

      {/* Today's Communications Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today’s Communications</h3>
        {todayTasks.length > 0 ? (
          <table className="w-full table-auto bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-2 text-left text-sm text-gray-700">Company</th>
                <th className="px-4 py-2 text-left text-sm text-gray-700">Next Communication Date</th>
              </tr>
            </thead>
            <tbody>
              {todayTasks.map((company) => (
                <tr key={company.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{company.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {formatDate(company.nextCommunication.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No communications scheduled for today.</p>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;
