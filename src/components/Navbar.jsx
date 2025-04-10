import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGraduationCap, FaMoon, FaSun, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useOCAuthState } from '../hooks/useOCAuthState';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, isLoading, OCId, logout } = useOCAuthState();

  // Close menus when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navElement = event.target.closest('nav');
      const isNavClick = navElement && navElement.classList.contains('main-nav');
      
      if (!isNavClick) {
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/courses', label: 'Courses' },
    { path: '/roadmap', label: 'Learning Roadmap' },
    { path: '/assignments', label: 'Assignments' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const getActiveClasses = (path) => {
    if (isActive(path)) {
      return darkMode
        ? 'text-blue-400 border-b-2 border-blue-400 font-semibold'
        : 'text-blue-600 border-b-2 border-blue-600 font-semibold';
    }
    return darkMode
      ? 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-300'
      : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-400';
  };

  const getMobileActiveClasses = (path) => {
    if (isActive(path)) {
      return darkMode
        ? 'bg-gray-800 text-blue-400 font-semibold'
        : 'bg-blue-50 text-blue-600 font-semibold';
    }
    return darkMode
      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  };

  return (
    <nav className={`main-nav ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaGraduationCap className={`text-2xl ${darkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-500'} transition-colors duration-200`} />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mentora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 py-1 text-sm lg:text-base ${getActiveClasses(link.path)} transition-all duration-200`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              } transition-all duration-200 transform hover:scale-105`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {/* Authentication */}
            {!isLoading && (
              isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                      darkMode 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-blue-100 hover:bg-blue-200'
                    } transition-all duration-200`}
                    aria-label="User profile"
                  >
                    <FaUser className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <span className={`hidden sm:inline truncate max-w-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {OCId.substring(0, 20)}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <div className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span className="block">OCId:</span>
                        <span className={`font-mono text-xs truncate block ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {OCId}
                        </span>
                      </div>
                      <Link 
                        to="/dashboard" 
                        className={`block px-4 py-2 text-sm ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={logout}
                        className={`w-full text-left block px-4 py-2 text-sm ${
                          darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <LoginButton />
              )
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-md ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors duration-200`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <FaBars className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Animated Slide Down */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-2 py-3 space-y-1 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${getMobileActiveClasses(link.path)} block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;