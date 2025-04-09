// src/components/Profile/Settings.jsx

import React from 'react';
import {  FaLock, FaDownload } from 'react-icons/fa';
import { Settings } from 'lucide-react';

const SettingsComponent = ({ userData }) => {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Settings className="text-2xl mr-3 text-blue-400" />
          <h2 className="text-2xl font-bold">Account Settings</h2>
        </div>
        <p className="text-gray-400">Manage your account preferences and settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                defaultValue={userData.name} 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={userData.email} 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Professional Role</label>
              <input 
                type="text" 
                defaultValue={userData.role} 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-white">Email Notifications</h4>
                <p className="text-sm text-gray-400">Receive updates about your courses and progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-white">Course Reminders</h4>
                <p className="text-sm text-gray-400">Get reminded about deadlines and upcoming events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-white">Achievement Alerts</h4>
                <p className="text-sm text-gray-400">Be notified when you earn badges or certificates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-white">Marketing Communications</h4>
                <p className="text-sm text-gray-400">Receive updates about new courses and features</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Account Security */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Account Security</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-white mb-4">Change Password</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-base font-medium text-white mb-4">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
              
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                <FaLock className="mr-2" /> Enable 2FA
              </button>
            </div>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Danger Zone</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
              <h4 className="text-base font-medium text-red-400 mb-2">Delete Account</h4>
              <p className="text-sm text-gray-400 mb-4">This action cannot be undone. All your data, progress, and certificates will be permanently deleted.</p>
              
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
            
            <div className="p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/10">
              <h4 className="text-base font-medium text-yellow-400 mb-2">Export Your Data</h4>
              <p className="text-sm text-gray-400 mb-4">Download a copy of your personal data, including profile information, course progress, and certificates.</p>
              
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                <FaDownload className="mr-2" /> Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;