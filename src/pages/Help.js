import React from "react";

const Help = () => {
  return (
    <div className="App-header text-white p-8 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto text-gray-800 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Help Center</h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to the Help Center! Here, you’ll find comprehensive guidance on using the features of this application effectively. Whether you're an administrator managing companies or a user tracking communications, this guide has you covered.
        </p>

        {/* Admin Module Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Admin Module</h2>
          <p className="text-gray-700 mb-4">
            The Admin Module allows administrators to configure the application and manage its foundational data. This module provides tools to define and manage companies, communication methods, and default settings. 
          </p>
          <h3 className="text-xl font-semibold text-blue-500 mb-2">Company Management</h3>
          <p className="text-gray-700 mb-4">
            Company management is the heart of the Admin Module. You can add new companies, update their details, or remove them from the system. Each company entry includes vital details like the company’s name, location, contact information, and communication preferences. 
          </p>
          <p className="text-gray-700 mb-4">
            Communication periodicity allows you to set a default time interval (e.g., weekly, bi-weekly) for follow-ups, ensuring no opportunities are missed. Use the "Add Company" button to create a new entry or select a company from the list to edit or delete its information.
          </p>

          <h3 className="text-xl font-semibold text-blue-500 mt-4 mb-2">Communication Method Management</h3>
          <p className="text-gray-700 mb-4">
            Administrators can also manage communication methods, which define how interactions with companies are conducted. These methods, such as "LinkedIn Post" or "Phone Call," have attributes like sequence (order of communication), description, and a mandatory flag that ensures critical steps aren’t skipped.
          </p>
          <p className="text-gray-700 mb-4">
            By default, the system includes these methods in the following order:
          </p>
          <ul className="list-decimal list-inside text-gray-700 mb-4">
            <li>LinkedIn Post</li>
            <li>LinkedIn Message</li>
            <li>Email</li>
            <li>Phone Call</li>
            <li>Other</li>
          </ul>
        </section>

        {/* User Module Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">User Module</h2>
          <p className="text-gray-700 mb-4">
            The User Module provides an intuitive interface for tracking, managing, and performing communication tasks. It includes features like a dashboard, notifications, and a calendar view, allowing users to stay organized and proactive.
          </p>

          <h3 className="text-xl font-semibold text-blue-500 mb-2">Dashboard</h3>
          <p className="text-gray-700 mb-4">
            The dashboard is your primary tool for managing communications. Each row represents a company, displaying its name, a summary of the last five communications, and the next scheduled communication. Companies are categorized as overdue, due today, or upcoming based on their next scheduled communication.
          </p>
          <p className="text-gray-700 mb-4">
            A color-coded system helps you quickly identify priorities:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><span className="bg-red-200 text-red-800 px-2 py-1 rounded">Red:</span> Overdue communication.</li>
            <li><span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Yellow:</span> Communication due today.</li>
            <li><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Green:</span> Communication scheduled for the future.</li>
          </ul>

          <h3 className="text-xl font-semibold text-blue-500 mt-4 mb-2">Notifications</h3>
          <p className="text-gray-700 mb-4">
            The Notifications section keeps you informed about overdue and due communications. A badge on the notification icon shows the total count of pending tasks. Clicking on a notification brings up a detailed grid for overdue and today's communications, enabling quick action.
          </p>

          <h3 className="text-xl font-semibold text-blue-500 mt-4 mb-2">Logging Communications</h3>
          <p className="text-gray-700 mb-4">
            Logging communication is simple and efficient. Select a company, choose the type of communication (e.g., LinkedIn Post, Email), and input details like the date and notes. Upon submission, the communication log is updated, and any overdue highlights for the company are reset.
          </p>
        </section>

        {/* Calendar View */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Calendar View</h2>
          <p className="text-gray-700 mb-4">
            The calendar view provides a visual timeline of all communication activities. You can view past communications with details like dates and methods and manage upcoming interactions by updating or rescheduling them as needed.
          </p>
        </section>

        {/* Reporting and Analytics Module */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Reporting and Analytics Module</h2>
          <p className="text-gray-700 mb-4">
            This module offers valuable insights into your communication strategies. Analyze performance metrics, track overdue trends, and identify the most effective communication methods. Features include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Communication Frequency Report:</strong> Charts showing the frequency of methods used over time.</li>
            <li><strong>Engagement Effectiveness Dashboard:</strong> Metrics on response rates by communication method.</li>
            <li><strong>Overdue Communication Trends:</strong> Heatmaps or trendlines highlighting overdue patterns.</li>
            <li><strong>Downloadable Reports:</strong> Export insights in PDF or CSV format.</li>
            <li><strong>Real-Time Activity Log:</strong> A live feed of all communication activities for transparency.</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-500">
            Need further assistance? Contact support at <a href="mailto:communicationTracker@gmail.com" className="text-blue-600 underline">communicationTracker@gmail.com</a>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Help;
