// src/components/Profile/Overview.jsx

import React, { useState, useRef } from 'react';
import { FaPlay, FaEllipsisV, FaPause, FaVolumeMute, FaVolumeUp, FaExpand, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BarChart, Code } from 'lucide-react';

const Overview = ({ userData }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Quick Stats */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Quick Stats</h2>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">This Month</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Problems Solved</div>
            <div className="text-2xl font-bold text-white">{userData.problemStats.totalSolved}</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Current Streak</div>
            <div className="text-2xl font-bold text-green-400">{userData.problemStats.streak} days</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Avg Session</div>
            <div className="text-2xl font-bold text-white">{userData.activityData.averageSessionTime} min</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Completion Rate</div>
            <div className="text-2xl font-bold text-white">{userData.activityData.completionRate}%</div>
          </div>
        </div>
      </div>
      
      {/* Problem Solving Stats */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex items-center mb-4">
          <Code className="w-5 h-5 mr-2 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Problem Solving</h2>
        </div>

        <div className="space-y-4">
          {/* Easy */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-300">Easy</span>
              <span className="text-sm text-green-400">{userData.problemStats.easy}</span>
            </div>
            <div className="w-full bg-gray-700/70 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{ width: `${(userData.problemStats.easy / userData.problemStats.totalSolved) * 100}%` }}
              />
            </div>
          </div>

          {/* Medium */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-300">Medium</span>
              <span className="text-sm text-yellow-400">{userData.problemStats.medium}</span>
            </div>
            <div className="w-full bg-gray-700/70 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full" 
                style={{ width: `${(userData.problemStats.medium / userData.problemStats.totalSolved) * 100}%` }}
              />
            </div>
          </div>

          {/* Hard */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-300">Hard</span>
              <span className="text-sm text-red-400">{userData.problemStats.hard}</span>
            </div>
            <div className="w-full bg-gray-700/70 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full" 
                style={{ width: `${(userData.problemStats.hard / userData.problemStats.totalSolved) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Link to="/problems" className="text-sm text-blue-400 hover:underline flex items-center">
            View all problems <FaPlay className="ml-2 text-xs" />
          </Link>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
          </div>
          <button className="text-gray-400 hover:text-white">
            <FaEllipsisV className="text-sm" />
          </button>
        </div>
        
        <div className="flex items-end justify-between h-32 mb-2">
          {userData.activityData.weeklyActivity.map((value, index) => (
            <div key={index} className="w-8 flex items-end justify-center">
              <div 
                className={`w-6 rounded-t-sm ${value > 0 ? 'bg-gradient-to-t from-blue-500 to-purple-500' : 'bg-gray-700'}`} 
                style={{ height: `${(value / 10) * 100}%`, minHeight: value > 0 ? '90px' : '0' }}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-xs text-gray-500 w-8 text-center">{day}</div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Link to="/activity" className="text-sm text-blue-400 hover:underline flex items-center">
            View detailed statistics <FaPlay className="ml-2 text-xs" />
          </Link>
        </div>
      </div>

      {/* Navigate to Course Page */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Courses</h2>
        </div>
        <div className="flex justify-center">
          <Link to="/course/1" className="text-sm text-blue-400 hover:underline flex items-center">
            Go to Course Page <FaGraduationCap className="ml-2 text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;