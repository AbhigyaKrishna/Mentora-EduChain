// src/components/Profile/Achievements.jsx

import React from 'react';
import { FaCode, FaFire, FaGraduationCap, FaClock, FaCertificate } from 'react-icons/fa';
import { Award } from 'lucide-react';

const Achievements = ({ badges }) => {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Award className="text-2xl mr-3 text-blue-400" />
          <h2 className="text-2xl font-bold">My Achievements</h2>
        </div>
        <p className="text-gray-400">Track your progress and showcase your skills with badges and rewards.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700/50 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-4">
                {badge.icon === "FaCode" && <FaCode className="text-xl" />}
                {badge.icon === "FaFire" && <FaFire className="text-xl" />}
                {badge.icon === "FaGraduationCap" && <FaGraduationCap className="text-xl" />}
                {badge.icon === "FaClock" && <FaClock className="text-xl" />}
                {badge.icon === "FaCertificate" && <FaCertificate className="text-xl" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{badge.name}</h3>
                <p className="text-sm text-gray-400">{badge.description}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Earned on {badge.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;