import React, { useState } from "react";
import { useCompanyContext } from "../context/CompanyContext";

const UserDashboard = () => {
  const { state, logCommunication } = useCompanyContext();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logData, setLogData] = useState({ type: "", date: "", notes: "" });
  const [formError, setFormError] = useState("");

  const handleLogSubmit = () => {
    // Validate the form inputs
    if (!logData.type.trim()) {
      setFormError("Type is required.");
      return;
    }
    if (!logData.date.trim()) {
      setFormError("Date is required.");
      return;
    }
    if (isNaN(new Date(logData.date))) {
      setFormError("Invalid date format.");
      return;
    }

    // If validation passes, reset errors and proceed
    setFormError("");
    logCommunication(selectedCompany.id, logData);
    setShowLogModal(false);
    setLogData({ type: "", date: "", notes: "" });
  };

  const categorizedCompanies = state.companies.map((company) => {
    const nextCommunication = new Date(company.nextCommunication.date);
    const today = new Date();

    const nextCommunicationDate = nextCommunication.toISOString().split("T")[0];
    const todayDate = today.toISOString().split("T")[0];

    if (nextCommunicationDate < todayDate) {
      return { ...company, status: "Overdue" };
    } else if (nextCommunicationDate === todayDate) {
      return { ...company, status: "Today" };
    } else {
      return { ...company, status: "Upcoming" };
    }
  });

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2 text-left border border-gray-300">Company Name</th>
              <th className="p-2 text-left border border-gray-300">Last 5 Communications</th>
              <th className="p-2 text-left border border-gray-300">Next Scheduled Communication</th>
              <th className="p-2 text-center border border-gray-300">Status</th>
              <th className="p-2 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorizedCompanies.map((company) => (
              <tr key={company.id} className="border-b border-gray-300">
                <td className="p-2 border border-gray-300">{company.name}</td>
                <td className="p-2 border border-gray-300">
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {company.lastCommunications.slice(0, 5).map((comm, index) => (
                      <li key={index} className="mb-1">
                        <span className="font-medium">{comm.type}:</span> {comm.date}
                        {comm.notes && (
                          <span className="text-gray-500"> - {comm.notes.slice(0, 20)}...</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border border-gray-300">
                  {company.nextCommunication.type}: {company.nextCommunication.date}
                </td>
                <td
                  className={`p-2 text-center border border-gray-300 ${
                    company.status === "Overdue"
                      ? "bg-red-200"
                      : company.status === "Today"
                      ? "bg-blue-200"
                      : "bg-green-200"
                  }`}
                >
                  {company.status}
                </td>
                <td className="p-2 text-center border border-gray-300">
                  <button
                    aria-label={`Log communication for ${company.name}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowLogModal(true);
                    }}
                  >
                    Log Communication
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Communication Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96 relative">
            <h3 className="text-lg font-semibold mb-4">Log Communication</h3>
            {formError && (
              <div className="bg-red-100 text-red-800 text-sm p-2 mb-4 rounded">
                {formError}
              </div>
            )}
            <input
              aria-label="Communication type"
              type="text"
              placeholder="Type"
              value={logData.type}
              onChange={(e) => setLogData({ ...logData, type: e.target.value })}
              className="block mb-3 p-2 border rounded w-full"
            />
            <input
              aria-label="Communication date"
              type="date"
              value={logData.date}
              onChange={(e) => setLogData({ ...logData, date: e.target.value })}
              className="block mb-3 p-2 border rounded w-full"
            />
            <textarea
              aria-label="Communication notes"
              placeholder="Notes"
              value={logData.notes}
              onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
              className="block mb-3 p-2 border rounded w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleLogSubmit}
                className="px-3 py-1 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowLogModal(false)}
                className="px-3 py-1 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
