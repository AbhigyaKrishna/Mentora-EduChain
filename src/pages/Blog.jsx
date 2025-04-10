import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa';

const Blog = () => {
  const { theme } = useTheme();

  const blogPosts = [
    {
      title: "Getting Started with Web3 Development",
      author: "John Smith",
      date: "March 15, 2024",
      category: "Development",
      excerpt: "Learn the fundamentals of Web3 development and how to build your first decentralized application...",
      readTime: "8 min read"
    },
    {
      title: "Understanding Smart Contract Security",
      author: "Alice Johnson",
      date: "March 12, 2024", 
      category: "Security",
      excerpt: "Explore best practices for smart contract security and common vulnerabilities to watch out for...",
      readTime: "10 min read"
    },
    {
      title: "The Future of Decentralized Education",
      author: "Mark Wilson",
      date: "March 10, 2024",
      category: "Education",
      excerpt: "Discover how blockchain technology is revolutionizing traditional education systems...",
      readTime: "6 min read"
    }
  ];

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Colorful background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -translate-y-1/4"></div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Mentora Blog</h1>
          <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto`}>
            Insights, tutorials, and updates from the world of Web3 education
          </p>
        </motion.div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-opacity-90`}
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-semibold hover:text-blue-500 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    <span className={theme.text.secondary}>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2 text-blue-500" />
                    <span className={theme.text.secondary}>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaTag className="mr-2 text-blue-500" />
                    <span className={theme.text.secondary}>{post.category}</span>
                  </div>
                </div>

                <p className={`${theme.text.secondary} line-clamp-3`}>
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4">
                  <button className={`${theme.primary} text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity`}>
                    Read More
                  </button>
                  <span className={`text-sm ${theme.text.secondary}`}>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
