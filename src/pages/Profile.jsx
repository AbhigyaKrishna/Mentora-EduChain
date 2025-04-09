// src/pages/Profile.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaBell, FaBars, FaGraduationCap } from 'react-icons/fa';
import { User, LogOut, Award, Settings } from 'lucide-react';
import Aurora from './Aurora';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import Overview from '../components/Profile/OverView';
import Certificates from '../components/Profile/Certificates';
import Achievements from '../components/Profile/Achievements';
import SettingsComponent from '../components/Profile/Settings';

// Mock user data
const userData = {
  name: "Vaibhav Kothari",
  email: "contact.vaibhavkothari@gmail.com",
  role: "Blockchain Developer",
  joined: "March 2025",
  profileImage: "https://avatars.githubusercontent.com/u/129139486?v=4",
  problemStats: {
    totalSolved: 12,
    streak: 5,
    easy: 3,
    medium: 5,
    hard: 4
  },
  activityData: {
    lastWeekSessions: 5,
    averageSessionTime: 45,
    completionRate: 85,
    weeklyActivity: [7, 1, 4, 0, 2, 50, 1]
  },
  goals: {
    daily: { current: 2, target: 3 },
    weekly: { current: 12, target: 15 },
    monthly: { current: 45, target: 60 }
  }
};

const certificates = [
  {
    tokenId: "NFT-001",
    courseId: "CERT-BF-101",
    courseName: "Blockchain Fundamentals",
    studentName: "Vaibhav Kothari",
    completionDate: "2024-03-15",
    score: "95",
    image: "./block.png"
  },
  {
    tokenId: "NFT-002",
    courseId: "CERT-SC-201",
    courseName: "Web Development with React",
    studentName: "Vaibhav Kothari",
    completionDate: "2024-03-20",
    score: "88",
    image: "./react.png"
  }
];

const badges = [
  { id: 1, name: "Problem Solver", description: "Solved 10+ problems", icon: "FaCode", date: "Mar 25, 2024" },
  { id: 2, name: "Streak Master", description: "Maintained a 5-day streak", icon: "FaFire", date: "Apr 01, 2024" },
  { id: 3, name: "Blockchain Enthusiast", description: "Completed 10+ courses", icon: "FaCertificate", date: "Apr 05, 2024" },
  { id: 4, name: "Web3 Developer", description: "Completed 10+ courses", icon: "FaClock", date: "Apr 05, 2024" },
  { id: 5, name: "Blockchain Enthusiast", description: "Completed 10+ courses", icon: "FaCode", date: "Apr 05, 2024" },
];

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New course recommendation available", isNew: true, time: "2 hours ago" },
    { id: 2, text: "You've earned a new badge: 'Streak Master'", isNew: true, time: "Yesterday" },
    { id: 3, text: "Course 'Advanced Smart Contracts' has been updated", isNew: false, time: "2 days ago" },
  ]);

  const { theme } = useTheme();

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Background Aurora Effect */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={2.0}
          speed={0.5}
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-3 rounded-full bg-gray-800/70 backdrop-blur-sm text-white shadow-lg"
        >
          <FaBars />
        </button>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 right-0 w-80 h-auto max-h-screen z-50 bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-bl-2xl border-l border-b border-gray-700/50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700/50 flex justify-between items-center sticky top-0 bg-gray-800/95 backdrop-blur-md z-10">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors ${notification.isNew ? 'bg-blue-900/20' : ''
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${notification.isNew ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400'}`}>
                        <FaBell className="text-sm" />
                      </div>
                      <div>
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-400">
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-72 z-40 bg-gray-800/95 backdrop-blur-md shadow-2xl border-l border-gray-700/50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
              <h3 className="font-semibold">Menu</h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center p-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-bold">{userData.name}</h2>
                <div className="text-sm text-gray-400">{userData.role}</div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => { setActiveTab('overview'); setShowMobileMenu(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                    }`}
                >
                  <User className="w-5 h-5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => { setActiveTab('certificates'); setShowMobileMenu(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'certificates' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                    }`}
                >
                  <FaCertificate className="w-5 h-5" />
                  <span>Certificates</span>
                </button>

                <button
                  onClick={() => { setActiveTab('achievements'); setShowMobileMenu(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'achievements' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                    }`}
                >
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </button>

                <button
                  onClick={() => { setActiveTab('settings'); setShowMobileMenu(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                    }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>

                <div className="pt-4 mt-4 border-t border-gray-700">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500 p-1">
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <div className="text-gray-400 text-sm">{userData.role}</div>
                  <div className="text-gray-500 text-xs mt-1">Member since {userData.joined}</div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Overview</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'certificates' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                  >
                    <FaCertificate className="w-5 h-5" />
                    <span>Certificates</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('achievements')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'achievements' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                  >
                    <Award className="w-5 h-5" />
                    <span>Achievements</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>

                  <Link to="/course/1" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-700/70">
                    <FaGraduationCap className="w-5 h-5" />
                    <span>Go to Course</span>
                  </Link>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-700">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="relative z-10 mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <div className="text-gray-400">Welcome back, {userData.name}! Here's an overview of your learning journey.</div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-full bg-gray-800/70 backdrop-blur-sm text-white hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <FaBell />
                  {notifications.some(n => n.isNew) && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            {activeTab === 'overview' && <Overview userData={userData} />}
            {activeTab === 'certificates' && <Certificates certificates={certificates} />}
            {activeTab === 'achievements' && <Achievements badges={badges} />}
            {activeTab === 'settings' && <SettingsComponent userData={userData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

