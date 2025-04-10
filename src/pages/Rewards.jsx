// // src/pages/Rewards.jsx

// import React from 'react';
// import { FaCoins, FaUserCheck, FaCalendarAlt, FaGraduationCap, FaTasks, FaTrophy, FaCode, FaFire } from 'react-icons/fa';

// const Rewards = () => {
//   // Sample data for coin rewards
//   const coinRewards = [
//     {
//       id: 1,
//       name: 'Profile Completion',
//       description: 'Complete your profile information',
//       coins: 100,
//       icon: <FaUserCheck className="text-blue-500" />,
//       completed: true,
//       progress: 100
//     },
//     {
//       id: 2,
//       name: 'Daily Check-in',
//       description: 'Check in to the platform daily',
//       coins: 5,
//       icon: <FaCalendarAlt className="text-purple-500" />,
//       completed: true,
//       progress: 100
//     },
//     {
//       id: 3,
//       name: '30-Day Login Streak',
//       description: 'Log in for 30 consecutive days',
//       coins: 500,
//       icon: <FaFire className="text-red-500" />,
//       completed: true,
//       progress: 15, // 15 days out of 30
//       progressText: '15/30 days'
//     },
//     {
//       id: 4,
//       name: 'Course Completion',
//       description: 'Complete a full course',
//       coins: 200,
//       icon: <FaGraduationCap className="text-emerald-500" />,
//       completed: false,
//       progress: 65, // 65% of course completed
//       progressText: '65% completed'
//     },
//     {
//       id: 5,
//       name: 'Assignment Streak',
//       description: 'Complete assignments for 5 days in a row',
//       coins: 150,
//       icon: <FaTasks className="text-amber-500" />,
//       completed: false,
//       progress: 60, // 3 out of 5 days
//       progressText: '3/5 days'
//     },
//     {
//       id: 6,
//       name: 'Code Review Master',
//       description: 'Review and provide feedback on 10 peer assignments',
//       coins: 400,
//       icon: <FaCode className="text-indigo-500" />,
//       completed: false,
//       progress: 30, // 3 out of 10 reviews
//       progressText: '3/10 reviews'
//     },
//     {
//       id: 7,
//       name: 'Daily Assignment',
//       description: 'Complete an assignment every day for 30 days',
//       coins: 400,
//       icon: <FaTasks className="text-indigo-500" />,
//       completed: false,
//       progress: 10, // 3 out of 30 days
//       progressText: '3/30 days'
//     },
//     {
//       id: 8,
//       name: 'Perfect Score',
//       description: 'Get 100% on 5 assignments in a row',
//       coins: 500,
//       icon: <FaTasks className="text-amber-500" />,
//       completed: false,
//       progress: 40, // 2 out of 5 perfect scores
//       progressText: '2/5 perfect scores'
//     },
//     {
//       id: 9,
//       name: 'Assignment Contribution',
//       description: 'Submit 10 high-quality assignments',
//       coins: 300,
//       icon: <FaCode className="text-indigo-500" />,
//       completed: false,
//       progress: 20, // 2 out of 10 assignments
//       progressText: '2/10 assignments'
//     }
//   ];

//   // Calculate total coins earned
//   const totalCoins = coinRewards.reduce((total, reward) => reward.completed ? total + reward.coins : total, 0);

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Rewards</h1>
//           <p className="text-gray-700 dark:text-gray-300">Track your achievements and earn coins for your learning journey</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex items-center space-x-4">
//           <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-lg shadow-lg">
//             <FaCoins className="text-xl" />
//             <span className="text-xl font-bold">{totalCoins}</span>
//             <span className="font-medium">Coins</span>
//           </div>
//         </div>
//       </div>

//       {/* Rewards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {coinRewards.map((reward) => (
//           <div
//             key={reward.id}
//             className={`group relative overflow-hidden rounded-xl border ${
//               reward.completed
//                 ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:border-emerald-700'
//                 : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
//             } shadow-sm hover:shadow-md transition-all duration-300`}
//           >
//             <div className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className={`p-3 rounded-xl ${
//                     reward.completed 
//                       ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' 
//                       : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
//                   }`}>
//                     {reward.icon}
//                   </div>
//                   <div>
//                     <div className="flex items-center space-x-2">
//                       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{reward.name}</h2>
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-300 mt-1">{reward.description}</p>
//                   </div>
//                 </div>
//                 <div className={`flex items-center space-x-2 ${
//                   reward.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'
//                 }`}>
//                   <FaCoins className="text-lg" />
//                   <span className="font-bold text-lg">{reward.coins}</span>
//                 </div>
//               </div>
              
//               {reward.completed ? (
//                 <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
//                   <span className="flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span>Completed</span>
//                   </span>
//                 </div>
//               ) : (
//                 <div className="mt-4">
//                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                     <div 
//                       className="bg-amber-400 h-2 rounded-full transition-all duration-500" 
//                       style={{ width: `${reward.progress}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                     {reward.progressText || `Progress: ${reward.progress}%`}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rewards;

// src/pages/Rewards.jsx

import React, { useState } from 'react';
import { FaCoins, FaUserCheck, FaCalendarAlt, FaGraduationCap, FaTasks, FaTrophy, 
  FaCode, FaFire, FaLock, FaUnlock, FaChartLine, FaMedal, FaCertificate, 
  FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import CoinsDisplay from '../components/CoinsDisplay';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Sample data for coin rewards
  const dailyRewards = [
    {
      id: 1,
      name: 'Daily Check-in',
      description: 'Check in to the platform daily',
      coins: 5,
      icon: <FaCalendarAlt className="text-purple-500" />,
      completed: true,
      progress: 100,
      category: 'daily'
    },
    {
      id: 2,
      name: 'Daily Assignment',
      description: 'Complete today\'s assigned task',
      coins: 15,
      icon: <FaTasks className="text-blue-500" />,
      completed: false,
      progress: 0,
      category: 'daily'
    },
    {
      id: 3,
      name: 'Daily Quiz',
      description: 'Complete today\'s learning quiz',
      coins: 10,
      icon: <FaGraduationCap className="text-green-500" />,
      completed: false,
      progress: 0,
      category: 'daily'
    }
  ];
  
  const achievementRewards = [
    {
      id: 4,
      name: 'Profile Completion',
      description: 'Complete your profile information',
      coins: 100,
      icon: <FaUserCheck className="text-blue-500" />,
      completed: true,
      progress: 100,
      category: 'achievement'
    },
    {
      id: 5,
      name: '30-Day Login Streak',
      description: 'Log in for 30 consecutive days',
      coins: 500,
      icon: <FaFire className="text-red-500" />,
      completed: false,
      progress: 50,
      progressText: '15/30 days',
      category: 'achievement'
    },
    {
      id: 6,
      name: 'Course Completion',
      description: 'Complete a full course',
      coins: 200,
      icon: <FaGraduationCap className="text-emerald-500" />,
      completed: false,
      progress: 65,
      progressText: '65% completed',
      category: 'achievement'
    },
    {
      id: 7,
      name: 'Assignment Streak',
      description: 'Complete assignments for 5 days in a row',
      coins: 150,
      icon: <FaTasks className="text-amber-500" />,
      completed: false,
      progress: 60,
      progressText: '3/5 days',
      category: 'achievement'
    }
  ];
  
  const expertRewards = [
    {
      id: 8,
      name: 'Code Review Master',
      description: 'Review and provide feedback on 10 peer assignments',
      coins: 400,
      icon: <FaCode className="text-indigo-500" />,
      completed: false,
      progress: 30,
      progressText: '3/10 reviews',
      category: 'expert'
    },
    {
      id: 9,
      name: 'Perfect Score',
      description: 'Get 100% on 5 assignments in a row',
      coins: 500,
      icon: <FaTrophy className="text-amber-500" />,
      completed: false,
      progress: 40,
      progressText: '2/5 perfect scores',
      category: 'expert'
    },
    {
      id: 10,
      name: 'Assignment Contribution',
      description: 'Submit 10 high-quality assignments',
      coins: 300,
      icon: <FaCode className="text-indigo-500" />,
      completed: false,
      progress: 20,
      progressText: '2/10 assignments',
      category: 'expert'
    }
  ];

  // Mission checkpoints - unlocked at specific coin thresholds
  const missionCheckpoints = [
    {
      id: 'bronze',
      name: 'Bronze Level',
      description: 'Unlock exclusive bronze level content and features',
      requiredCoins: 500,
      icon: <FaMedal className="text-amber-600" />,
      rewards: ['Bronze profile badge', 'Access to bonus assignments'],
      unlocked: true
    },
    {
      id: 'silver',
      name: 'Silver Level',
      description: 'Reach silver status in the Mentora community',
      requiredCoins: 1500,
      icon: <FaMedal className="text-gray-400" />,
      rewards: ['Silver profile badge', 'Priority support', '10% bonus coins on all rewards'],
      unlocked: false
    },
    {
      id: 'gold',
      name: 'Gold Level',
      description: 'Become a gold member with premium benefits',
      requiredCoins: 5000,
      icon: <FaMedal className="text-yellow-400" />,
      rewards: ['Gold profile badge', 'Access to exclusive workshops', 'Custom learning path'],
      unlocked: false
    },
    {
      id: 'platinum',
      name: 'Platinum Expert',
      description: 'Join the elite group of Mentora platinum experts',
      requiredCoins: 10000,
      icon: <FaCertificate className="text-blue-400" />,
      rewards: ['Platinum certification', 'Mentorship opportunities', 'Featured on leaderboard'],
      unlocked: false
    }
  ];

  // Combine all rewards
  const allRewards = [...dailyRewards, ...achievementRewards, ...expertRewards];

  // Calculate total coins earned
  const totalCoins = allRewards.reduce((total, reward) => reward.completed ? total + reward.coins : total, 0);

  // Current active rewards based on tab
  const getActiveRewards = () => {
    let rewards;
    switch(activeTab) {
      case 'daily':
        rewards = dailyRewards;
        break;
      case 'achievements':
        rewards = achievementRewards;
        break;
      case 'expert':
        rewards = expertRewards;
        break;
      case 'missions':
        return []; // Handled separately
      default:
        rewards = allRewards;
    }

    // Apply search filter
    if (searchTerm) {
      rewards = rewards.filter(reward => 
        reward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        reward.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply completion filter
    if (filterCompleted !== 'all') {
      rewards = rewards.filter(reward => 
        filterCompleted === 'completed' ? reward.completed : !reward.completed
      );
    }

    // Apply sorting
    if (sortBy === 'coins-high') {
      rewards = [...rewards].sort((a, b) => b.coins - a.coins);
    } else if (sortBy === 'coins-low') {
      rewards = [...rewards].sort((a, b) => a.coins - b.coins);
    } else if (sortBy === 'progress') {
      rewards = [...rewards].sort((a, b) => b.progress - a.progress);
    }

    return rewards;
  };

  const currentRewards = getActiveRewards();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Rewards Center</h1>
          <p className="text-gray-700 dark:text-gray-300">Track achievements and earn coins on your learning journey</p>
        </div>
        <div className="mt-4 md:mt-0">
          <CoinsDisplay coins={totalCoins} size="lg" />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b dark:border-gray-700">
        <nav className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {['daily', 'achievements', 'expert', 'missions', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters for rewards */}
      {activeTab !== 'missions' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search rewards..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by Default</option>
            <option value="coins-high">Highest Coins</option>
            <option value="coins-low">Lowest Coins</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      )}

      {/* Mission Checkpoints */}
      {activeTab === 'missions' && (
        <div className="space-y-8 mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Unlock special privileges and recognition by reaching coin milestones on your learning journey.
          </p>
          
          {/* Progress timeline */}
          <div className="relative">
            <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>
            <div 
              className="absolute left-0 top-5 h-1 bg-blue-500 transition-all duration-700"
              style={{ width: `${Math.min(100, (totalCoins / 10000) * 100)}%` }}
            ></div>
            <div className="flex justify-between relative">
              {missionCheckpoints.map((checkpoint, index) => (
                <div key={checkpoint.id} className="flex flex-col items-center relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${
                      checkpoint.unlocked 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
                    }`}
                  >
                    {checkpoint.unlocked ? (
                      <FaUnlock className="text-white" />
                    ) : (
                      <FaLock className="text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <p className="mt-2 font-medium text-sm text-center">
                    {checkpoint.requiredCoins} Coins
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {missionCheckpoints.map((checkpoint) => (
              <div 
                key={checkpoint.id}
                className={`relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ${
                  checkpoint.unlocked
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-80'
                }`}
              >
                <div className="p-6">
                  {!checkpoint.unlocked && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                        <FaLock />
                        <span className="text-sm font-medium">
                          {checkpoint.requiredCoins - totalCoins} coins needed
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      checkpoint.unlocked
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}>
                      {checkpoint.icon}
                    </div>
                    <div>
                      <h2 className={`text-xl font-semibold ${
                        checkpoint.unlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {checkpoint.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {checkpoint.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pl-14">
                    <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Rewards:
                    </p>
                    <ul className="space-y-2">
                      {checkpoint.rewards.map((reward, index) => (
                        <li 
                          key={index}
                          className="flex items-center text-sm"
                        >
                          <span className={`mr-2 text-xs ${
                            checkpoint.unlocked ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            ●
                          </span>
                          <span className={checkpoint.unlocked 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-gray-500 dark:text-gray-500'}
                          >
                            {reward}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {checkpoint.unlocked && (
                    <div className="mt-6 pl-14">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        Access Benefits
                      </button>
                    </div>
                  )}
                </div>
                
                {checkpoint.unlocked && (
                  <div className="absolute -top-10 -right-10 w-40 h-40 rotate-45 bg-blue-500/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Rewards Grid */}
      {activeTab !== 'missions' && (
        <>
          {currentRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentRewards.map((reward) => (
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
                      <div className="flex items-center">
                        <CoinsDisplay coins={reward.coins} size="sm" />
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
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${reward.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {reward.progressText || `Progress: ${reward.progress}%`}
                          </p>
                          {reward.progress > 0 && (
                            <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                              Continue
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Category tag */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reward.category === 'daily' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        : reward.category === 'achievement'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                    }`}>
                      {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No rewards found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search term</p>
            </div>
          )}
        </>
      )}

      {/* Stats Section */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Rewards Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Completion Rate</h3>
              <FaChartLine className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
              {Math.round((allRewards.filter(r => r.completed).length / allRewards.length) * 100)}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {allRewards.filter(r => r.completed).length} of {allRewards.length} rewards completed
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Daily Streak</h3>
              <FaFire className="text-orange-500" />
            </div>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">15 days</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your longest streak was 22 days
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Next Level</h3>
              <FaMedal className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">Silver</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {1500 - totalCoins} coins needed to unlock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;