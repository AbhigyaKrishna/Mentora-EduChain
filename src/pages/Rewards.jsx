// src/pages/Rewards.jsx

import React from 'react';
import { FaCoins, FaUserCheck, FaCalendarAlt, FaGraduationCap, FaTasks, FaTrophy, FaCode, FaFire } from 'react-icons/fa';

const Rewards = () => {
  // Sample data for coin rewards
  const coinRewards = [
    {
      id: 1,
      name: 'Profile Completion',
      description: 'Complete your profile information',
      coins: 100,
      icon: <FaUserCheck className="text-blue-500" />,
      completed: true,
      progress: 100
    },
    {
      id: 2,
      name: 'Daily Check-in',
      description: 'Check in to the platform daily',
      coins: 5,
      icon: <FaCalendarAlt className="text-purple-500" />,
      completed: true,
      progress: 100
    },
    {
      id: 3,
      name: '30-Day Login Streak',
      description: 'Log in for 30 consecutive days',
      coins: 500,
      icon: <FaFire className="text-red-500" />,
      completed: false,
      progress: 15, // 15 days out of 30
      progressText: '15/30 days'
    },
    {
      id: 4,
      name: 'Course Completion',
      description: 'Complete a full course',
      coins: 200,
      icon: <FaGraduationCap className="text-emerald-500" />,
      completed: false,
      progress: 65, // 65% of course completed
      progressText: '65% completed'
    },
    {
      id: 5,
      name: 'Assignment Streak',
      description: 'Complete assignments for 5 days in a row',
      coins: 150,
      icon: <FaTasks className="text-amber-500" />,
      completed: false,
      progress: 60, // 3 out of 5 days
      progressText: '3/5 days'
    },
    {
      id: 6,
      name: 'Code Review Master',
      description: 'Review and provide feedback on 10 peer assignments',
      coins: 400,
      icon: <FaCode className="text-indigo-500" />,
      completed: false,
      progress: 30, // 3 out of 10 reviews
      progressText: '3/10 reviews'
    },
    {
      id: 7,
      name: 'Daily Assignment',
      description: 'Complete an assignment every day for 30 days',
      coins: 400,
      icon: <FaTasks className="text-indigo-500" />,
      completed: false,
      progress: 10, // 3 out of 30 days
      progressText: '3/30 days'
    },
    {
      id: 8,
      name: 'Perfect Score',
      description: 'Get 100% on 5 assignments in a row',
      coins: 500,
      icon: <FaTasks className="text-amber-500" />,
      completed: false,
      progress: 40, // 2 out of 5 perfect scores
      progressText: '2/5 perfect scores'
    },
    {
      id: 9,
      name: 'Assignment Contribution',
      description: 'Submit 10 high-quality assignments',
      coins: 300,
      icon: <FaCode className="text-indigo-500" />,
      completed: false,
      progress: 20, // 2 out of 10 assignments
      progressText: '2/10 assignments'
    }
  ];

  // Calculate total coins earned
  const totalCoins = coinRewards.reduce((total, reward) => reward.completed ? total + reward.coins : total, 0);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Rewards</h1>
          <p className="text-gray-700 dark:text-gray-300">Track your achievements and earn coins for your learning journey</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <FaCoins className="text-xl" />
            <span className="text-xl font-bold">{totalCoins}</span>
            <span className="font-medium">Coins</span>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coinRewards.map((reward) => (
          <div
            key={reward.id}
            className={`group relative overflow-hidden rounded-xl border ${
              reward.completed
                ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:border-emerald-700'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            } shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    reward.completed 
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {reward.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{reward.name}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{reward.description}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 ${
                  reward.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'
                }`}>
                  <FaCoins className="text-lg" />
                  <span className="font-bold text-lg">{reward.coins}</span>
                </div>
              </div>
              
              {reward.completed ? (
                <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Completed</span>
                  </span>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-amber-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${reward.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {reward.progressText || `Progress: ${reward.progress}%`}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;