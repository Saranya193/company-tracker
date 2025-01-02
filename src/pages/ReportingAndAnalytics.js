import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { companies } from "../data/mockData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ReportingAndAnalytics = () => {
  const [filters, setFilters] = useState({
    company: "",
    method: "",
    startDate: "",
    endDate: "",
  });

  const [selectedChart, setSelectedChart] = useState("");
  const [showLog, setShowLog] = useState(false);

  // Filter Data
  const applyFilters = () => {
    const { company, method, startDate, endDate } = filters;

    return companies
      .flatMap((c) =>
        c.lastCommunications.map((comm) => ({
          company: c.name,
          method: comm.type,
          date: comm.date,
          notes: comm.notes,
          ...c.communicationMethods.find((m) => m.name === comm.type),
        }))
      )
      .filter((item) => {
        const date = new Date(item.date);
        return (
          (!company || item.company === company) &&
          (!method || item.method === method) &&
          (!startDate || date >= new Date(startDate)) &&
          (!endDate || date <= new Date(endDate))
        );
      });
  };

  const filteredData = applyFilters();

  // Helper function to calculate overdue trends for all companies
  const calculateOverdueTrends = () => {
    const overdueData = companies.reduce((acc, company) => {
      acc[company.name] = {
        "Jan": 0,
        "Feb": 0,
        "Mar": 0,
        "Apr": 0,
        "May": 0,
        "Jun": 0,
        "Jul": 0,
        "Aug": 0,
        "Sep": 0,
        "Oct": 0,
        "Nov": 0,
        "Dec": 0,
      };

      company.lastCommunications.forEach((comm) => {
        const commDate = new Date(comm.date);
        const commMonth = commDate.toLocaleString("default", { month: "short" });
        
        if (commDate < new Date()) {
          acc[company.name][commMonth]++;
        }
      });

      return acc;
    }, {});

    return overdueData;
  };

  // Chart Data
  const generateChartData = (type) => {
    const methods = filteredData.reduce((acc, item) => {
      acc[item.method] = (acc[item.method] || 0) + 1;
      return acc;
    }, {});

    const overdue = companies
      .flatMap((c) => c.lastCommunications)
      .filter((comm) => new Date(comm.date) < new Date()).length;

    return {
      bar: {
        labels: Object.keys(methods),
        datasets: [
          {
            label: "Frequency of Communication Methods",
            data: Object.values(methods),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      pie: {
        labels: Object.keys(methods),
        datasets: [
          {
            data: Object.values(methods),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      },
      line: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Overdue Communication Trends",
            data: [2, 4, overdue, 6, 3],
            borderColor: "#FF6384",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    }[type];
  };

  const generateOverdueChartData = () => {
    const overdueData = calculateOverdueTrends();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const datasets = Object.keys(overdueData).map((companyName) => ({
      label: companyName,
      data: months.map((month) => overdueData[companyName][month]),
      borderColor: "#" + Math.floor(Math.random()*16777215).toString(16),
      borderWidth: 2,
      fill: false,
    }));

    return {
      labels: months,
      datasets: datasets,
    };
  };

  // Download Reports
  const downloadCSV = () => {
    const csvContent = `Company,Method,Date,Notes\n${filteredData
      .map((item) => `${item.company},${item.method},${item.date},${item.notes}`)
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "report.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Communication Report", 10, 10);
    filteredData.forEach((item, i) => {
      doc.text(
        `${item.company}, ${item.method}, ${item.date}, ${item.notes}`,
        10,
        20 + i * 10
      );
    });
    doc.save("report.pdf");
  };

  // Get unique company names and communication methods for dropdowns
  const uniqueCompanies = Array.from(new Set(companies.map((c) => c.name)));
  const uniqueMethods = Array.from(new Set(companies.flatMap((c) => c.communicationMethods.map((m) => m.name))));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Reporting and Analytics</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        <div className="flex-1 min-w-[180px] mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Select Company</label>
          <select
            id="company"
            className="border p-2 rounded w-full"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          >
            <option value="">All Companies</option>
            {uniqueCompanies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px] mb-4">
          <label htmlFor="method" className="block text-sm font-medium text-gray-700">Select Method</label>
          <select
            id="method"
            className="border p-2 rounded w-full"
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
          >
            <option value="">All Methods</option>
            {uniqueMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px] mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Starting Date</label>
          <input
            type="date"
            id="startDate"
            className="border p-2 rounded w-full"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div className="flex-1 min-w-[180px] mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Ending Date</label>
          <input
            type="date"
            id="endDate"
            className="border p-2 rounded w-full"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      {/* Buttons to Display Charts and Real-Time Activity Log */}
      <div className="space-x-4 mb-6 text-center flex flex-wrap justify-center">
        <button
          onClick={() => { setShowLog(false); setSelectedChart("bar"); }}
          className="px-4 py-2 border-2 border-gray-550 rounded mb-4 relative group focus:outline-none"
        >
          Show Communication Frequency
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500 transform scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
        </button>
        <button
          onClick={() => { setShowLog(false); setSelectedChart("pie"); }}
          className="px-4 py-2 border-2 border-gray-550 rounded mb-4 relative group focus:outline-none"
        >
          Show Engagement Effectiveness
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500 transform scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
        </button>
        <button
          onClick={() => { setShowLog(false); setSelectedChart("line"); }}
          className="px-4 py-2 border-2 border-gray-550 rounded mb-4 relative group focus:outline-none"
        >
          Show Overdue Trends
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500 transform scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
        </button>
        <button
          onClick={() => { setShowLog(!showLog); setSelectedChart(""); }}
          className="px-4 py-2 border-2 border-gray-550 rounded mb-4 relative group focus:outline-none"
        >
          {showLog ? "Hide Activity Log" : "Show Activity Log"}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500 transform scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
        </button>
      </div>

      {/* Conditional Rendering of Charts or Activity Log */}
      <div className="mt-4 flex justify-center">
        {!showLog && selectedChart === "bar" && (
          <div className="w-full max-w-[600px]">
            <h2 className="text-lg font-medium mb-2 text-center">Bar Chart for Communication Frequency</h2>
            <Bar data={generateChartData("bar")} />
          </div>
        )}
        {!showLog && selectedChart === "pie" && (
          <div className="w-full max-w-[400px]">
            <h2 className="text-lg font-medium mb-2 text-center">Pie Chart for Engagement Effectiveness</h2>
            <Pie data={generateChartData("pie")} />
          </div>
        )}
        {!showLog && selectedChart === "line" && (
          <div className="w-full max-w-[600px]">
            <h2 className="text-lg font-medium mb-2 text-center">Line Chart for Overdue Trends</h2>
            <Line data={generateOverdueChartData()} />
          </div>
        )}
      </div>

      {/* Download Buttons */}
      <div className="mt-6 space-x-4 text-center">
        <button
          onClick={downloadCSV}
          className="px-4 py-2 border-2 border-blue-800 text-blue-800 rounded mb-4 hover:bg-blue-800 hover:text-white focus:outline-none"
        >
          Download CSV
        </button>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded mb-4 hover:bg-blue-500 hover:text-white focus:outline-none"
        >
          Download PDF
        </button>
      </div>

      {/* Real-Time Activity Log */}
      {showLog && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Real-Time Activity Log</h2>
          <ul className="border p-4 rounded space-y-2 text-left">
            {filteredData.map((item, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded">
                {item.date}: {item.method} with {item.company} - {item.notes}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportingAndAnalytics;
