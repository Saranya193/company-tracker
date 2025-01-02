import React, { useState, useEffect } from "react";
import { useCompanyContext } from "../context/CompanyContext";

const ManageCommunicationMethods = () => {
  const {
    state,
    setSelectedCompany,
    addCommunicationMethod,
    updateCommunicationMethod,
    updateCommunicationMethodsForCompany,
    deleteCommunicationMethod,
  } = useCompanyContext();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  const selectedCompany = state.selectedCompany || state.companies[0]; // Default to first company if no selection

  useEffect(() => {
    if (selectedCompany) {
      setFormData({
        id: "",
        name: "",
        description: "",
        sequence: "",
        mandatory: false,
      });
    }
  }, [selectedCompany]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure at least one mandatory communication method exists
    const mandatoryMethods = selectedCompany.communicationMethods.filter(
      (method) => method.mandatory
    );
    if (formData.mandatory && mandatoryMethods.length >= 1) {
      alert("You can only have one mandatory communication method at a time.");
      return;
    }

    if (formData.id) {
      updateCommunicationMethod(selectedCompany.id, formData);
    } else {
      addCommunicationMethod(selectedCompany.id, {
        ...formData,
        id: Date.now(),
      });
    }
  };

  const handleEdit = (method) => {
    setFormData(method);
  };

  const handleDelete = (methodId) => {
    if (window.confirm("Are you sure you want to delete this communication method?")) {
      deleteCommunicationMethod(selectedCompany.id, methodId);
      const updatedMethods = selectedCompany.communicationMethods
        .filter((method) => method.id !== methodId)
        .map((method, index) => ({
          ...method,
          sequence: index + 1,
        }));
      updateCommunicationMethodsForCompany(selectedCompany.id, updatedMethods);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-200 p-4 rounded shadow-md">
        <h3 className="font-semibold text-lg mb-4">Companies</h3>
        <ul className="space-y-2">
          {state.companies.map((company) => (
            <li
              key={company.id}
              className={`cursor-pointer text-blue-500 hover:text-blue-700 ${
                selectedCompany.id === company.id ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCompany(company)}
            >
              {company.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="md:w-3/4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Manage Communication Methods for {selectedCompany.name}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sequence</label>
            <input
              type="number"
              name="sequence"
              value={formData.sequence}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Mandatory</label>
            <input
              type="checkbox"
              name="mandatory"
              checked={formData.mandatory}
              onChange={handleChange}
              className="rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            {formData.id ? "Update" : "Add New"} Communication Method
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-2 text-left border border-gray-300">Name</th>
                <th className="p-2 text-left border border-gray-300">Description</th>
                <th className="p-2 text-left border border-gray-300">Sequence</th>
                <th className="p-2 text-left border border-gray-300">Mandatory</th>
                <th className="p-2 text-center border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCompany.communicationMethods.map((method) => (
                <tr key={method.id} className="border-b border-gray-300">
                  <td className="p-2 border border-gray-300">{method.name}</td>
                  <td className="p-2 border border-gray-300">{method.description}</td>
                  <td className="p-2 border border-gray-300">{method.sequence}</td>
                  <td className="p-2 border border-gray-300">
                    {method.mandatory ? "Yes" : "No"}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(method)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(method.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCommunicationMethods;
