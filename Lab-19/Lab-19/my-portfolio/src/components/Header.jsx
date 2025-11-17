import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Dynamic classes based on theme
  const headerClasses = isDarkMode 
    ? 'bg-gray-900 text-white shadow-lg' 
    : 'bg-gray-800 text-white shadow-md';
  
  const linkHoverClass = isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-400';

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-bold ${linkHoverClass} transition-colors duration-200`}>
          MyPortfolio
        </Link>
        
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className={`${linkHoverClass} transition-colors duration-200`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className={`${linkHoverClass} transition-colors duration-200`}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/blog" className={`${linkHoverClass} transition-colors duration-200`}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${linkHoverClass} transition-colors duration-200`}>
                Contact
              </Link>
            </li>

            {/* Auth-aware navigation */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/admin" className={`${linkHoverClass} transition-colors duration-200`}>
                    Admin
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`${linkHoverClass} transition-colors duration-200`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={`${linkHoverClass} transition-colors duration-200`}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={`${linkHoverClass} transition-colors duration-200`}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              isDarkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;