// src/components/Profile/Certificates.jsx

import React from 'react';
import { FaPlay, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Certificates = ({ certificates }) => {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-2xl mr-3 text-blue-400" />
          <h2 className="text-2xl font-bold">My Certificates</h2>
        </div>
        <p className="text-gray-400">Track your learning achievements and showcase your skills with blockchain-verified certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.tokenId}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.courseName} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 rounded-full bg-blue-500/80 backdrop-blur-sm">
                    <FaPlay className="text-3xl text-white" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-2">
                <div className="text-xs text-gray-400 mb-1">Certificate ID</div>
                <div className="flex items-center">
                  <div className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded text-gray-300 overflow-hidden text-ellipsis">
                    {cert.tokenId}
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mt-4 mb-1">
                {cert.courseName}
              </h3>
              <div className="text-sm text-gray-400 mb-4">{cert.courseId}</div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm py-2 border-b border-gray-700">
                  <span className="text-gray-400">Completed</span>
                  <span className="font-medium text-white">{new Date(cert.completionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Score</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    {cert.score}/100
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm">
                  View Certificate
                </button>
                <button className="py-2 px-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <FaShare className="text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link to="/certificates" className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center">
          View All Certificates <FaPlay className="ml-2 text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default Certificates;