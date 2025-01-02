import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SwitchStyles.css"; // Custom switch styles
import "./NavBarStyles.css"; // Link styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome styles

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/Communication_20241231_072136_0000.png"
                alt="CommTracker Logo"
                className="h-20 w-20 rounded-full mr-2"
              />
              <span className="text-white text-2xl font-bold">
                Communication Tracker
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="nav-link">
              <i className="fas fa-home mr-2"></i>Home
            </Link>
            <Link to="/help" className="nav-link">
              <i className="fas fa-question-circle mr-2"></i>Help
            </Link>
            <Link to="/reports" className="nav-link">
              <i className="fas fa-chart-bar mr-2"></i>Reports
            </Link>
          </div>

          {/* Mobile Menu Button with Styled Toggle */}
          <div className="md:hidden">
            <div className="switch">
              <input
                id="toggle"
                type="checkbox"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />
              <label className="toggle" htmlFor="toggle">
                <i></i>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="nav-link">
              <i className="fas fa-home mr-2"></i>Home
            </Link>
            <Link to="/help" className="nav-link">
              <i className="fas fa-question-circle mr-2"></i>Help
            </Link>
            <Link to="/reports" className="nav-link">
              <i className="fas fa-chart-bar mr-2"></i>Reports
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
