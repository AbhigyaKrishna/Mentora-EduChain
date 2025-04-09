// src/pages/CoursePage.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGraduationCap } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import CourseModule from '../components/Profile/CourseModule';
import Aurora from './Aurora';

const CoursePage = () => {
  const { courseId } = useParams();
  
  // Mock course data - In a real app, fetch this based on courseId
  const courseData = {
    id: courseId,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology and its applications.",
    instructor: "John Doe",
    topics: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        duration: "15:30",
        videoUrl: "https://bafybeici6bd5egsbfcpwb3pnwznfpaunr2cs3tugshlkvgwhycckuvs2wa.ipfs.w3s.link/What%20is%20Blockchain.mp4",
        description: "Learn the fundamental concepts of blockchain technology and its applications.",
        objectives: [
          "Understand blockchain basics",
          "Learn about distributed ledgers",
          "Explore blockchain use cases"
        ],
        resources: [
          { type: 'pdf', name: 'Blockchain Basics Guide', url: 'https://example.com/blockchain-guide.pdf' },
          { type: 'link', name: 'Additional Reading', url: 'https://example.com/reading' }
        ],
        isLocked: false
      },
      {
        id: 2,
        title: "Cryptography Basics",
        duration: "20:45",
        videoUrl: "https://bafybeihubwvljhf4nsfqeape7d62ka27d5hpajpjj2wnloazpsi67rsdeu.ipfs.w3s.link/Smart%20Contract.mp4",
        description: "Understanding the cryptographic principles behind blockchain.",
        objectives: [
          "Learn about encryption",
          "Understand hashing functions",
          "Explore digital signatures"
        ],
        resources: [
          { type: 'pdf', name: 'Cryptography Guide', url: 'https://example.com/crypto-guide.pdf' }
        ],
        isLocked: false
      },
      {
        id: 3,
        title: "Smart Contracts",
        duration: "25:15",
        videoUrl: "https://bafybeih2s6sohmlaoeji6v46ulacoxd57qpxl2plrrba4frog3wl2sufgi.ipfs.w3s.link/DeFi.mp4",
        description: "Introduction to smart contracts and their applications.",
        objectives: [
          "Understand smart contracts",
          "Learn Solidity basics",
          "Deploy your first contract"
        ],
        isLocked: true
      }
    ]
  };

  const [courseProgress, setCourseProgress] = useState(0);

  const handleProgressUpdate = (progress) => {
    setCourseProgress(progress);
    // Here you would typically also save the progress to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={2.0}
          speed={0.5}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <FaArrowLeft className="text-white" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">{courseData.title}</h1>
                  <p className="text-gray-400 text-sm">Instructor: {courseData.instructor}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-gray-400">
                  <span className="font-medium text-white">{courseProgress}%</span> completed
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaGraduationCap className="text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Course Description */}
            <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-2">About This Course</h2>
              <p className="text-gray-300">{courseData.description}</p>
            </div>

            {/* Course Module Component */}
            <CourseModule 
              topics={courseData.topics}
              onUpdateProgress={handleProgressUpdate}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;