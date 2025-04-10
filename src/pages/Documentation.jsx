import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FaUserPlus, FaWallet, FaBookOpen, FaUsers, FaCoins, 
  FaFileContract, FaCode, FaSearch, FaChevronDown, FaChevronRight,
  FaGithub, FaSlack, FaDiscord, FaVideo, FaClipboardCheck
} from 'react-icons/fa';

const Documentation = () => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <FaUserPlus />,
      content: [
        {
          id: 'account-creation',
          heading: 'Account Creation',
          text: 'To get started with our platform, create an account using OpenCampus authentication. Click the "Connect" button in the top navigation bar and follow the prompts.',
          steps: [
            'Visit the Mentora homepage and click "Sign Up"',
            'Choose OpenCampus authentication method',
            'Complete the registration form with your information',
            'Verify your email address via the confirmation link',
            'Set up your profile with your interests and learning goals'
          ]
        },
        {
          id: 'wallet-connection',
          heading: 'Wallet Connection',
          text: 'After creating an account, connect your Web3 wallet to access blockchain features. We support MetaMask, Coinbase Wallet, and other popular wallet providers.',
          steps: [
            'Go to your Profile page',
            'Click on "Connect Wallet" button',
            'Select your preferred wallet provider',
            'Approve the connection request in your wallet',
            'Your wallet address will appear in your profile'
          ]
        }
      ]
    },
    {
      id: 'platform-features',
      title: 'Platform Features',
      icon: <FaBookOpen />,
      content: [
        {
          id: 'courses',
          heading: 'Courses',
          text: 'Browse our course catalog to find Web3 learning content. Each course includes video lectures, assignments, and hands-on projects.',
          steps: [
            'Navigate to the Courses page',
            'Browse courses by category or use the search function',
            'Click on a course to view its details',
            'Enroll in the course to access all content',
            'Track your progress through the dashboard'
          ]
        },
        {
          id: 'project-rooms',
          heading: 'Project Rooms',
          icon: <FaUsers />,
          text: 'Join collaborative project rooms to work with other learners on real blockchain projects. Create or join existing rooms based on your interests.',
          steps: [
            'Go to the Project Rooms page',
            'Browse available rooms or create a new one',
            'Request to join or start your own project',
            'Collaborate with team members using integrated tools',
            'Showcase completed projects in your portfolio'
          ]
        },
        {
          id: 'rewards',
          heading: 'Rewards System',
          icon: <FaCoins />,
          text: 'Earn tokens by completing courses, contributing to projects, and participating in the community. Tokens can be used for certificates and special features.',
          steps: [
            'Earn tokens through platform activities',
            'View your token balance in the Rewards section',
            'Use tokens to unlock premium content',
            'Purchase NFT certificates with your tokens',
            'Participate in governance with token voting'
          ]
        }
      ]
    },
    {
      id: 'technical-docs',
      title: 'Technical Documentation',
      icon: <FaCode />,
      content: [
        {
          id: 'smart-contracts',
          heading: 'Smart Contracts',
          icon: <FaFileContract />,
          text: 'Our platform uses smart contracts for course certificates, rewards distribution, and project collaboration. All contracts are audited and deployed on multiple networks.',
          networks: [
            { name: 'Ethereum Mainnet', address: '0x1234...5678' },
            { name: 'Arbitrum Sepolia', address: '0xabcd...efgh' },
            { name: 'Sepolia Testnet', address: '0x9876...5432' }
          ]
        },
        {
          id: 'api-integration',
          heading: 'API Integration',
          text: 'Developers can integrate with our platform using our REST API. Documentation for API endpoints is available in our GitHub repository.',
          endpoints: [
            { method: 'GET', path: '/api/courses', description: 'List all courses' },
            { method: 'GET', path: '/api/courses/:id', description: 'Get course details' },
            { method: 'POST', path: '/api/enroll', description: 'Enroll in a course' },
            { method: 'GET', path: '/api/certificates', description: 'List user certificates' }
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <FaClipboardCheck />,
      content: [
        {
          id: 'common-issues',
          heading: 'Common Issues',
          text: 'Solutions to frequently encountered problems on our platform.',
          issues: [
            { 
              question: 'Wallet won\'t connect', 
              solution: 'Ensure your browser has the wallet extension installed and you\'re logged in. Try refreshing the page and connecting again.' 
            },
            { 
              question: 'Can\'t view course content', 
              solution: 'Verify that you\'ve enrolled in the course and that your account has the necessary permissions.' 
            },
            { 
              question: 'Certificate not appearing', 
              solution: 'Certificates may take up to 24 hours to be minted on the blockchain. Check your wallet address on the blockchain explorer.' 
            }
          ]
        },
        {
          id: 'contact-support',
          heading: 'Contact Support',
          text: 'If you\'re experiencing issues that aren\'t covered in our documentation, our support team is ready to help.',
          contactMethods: [
            { method: 'Email', contact: 'support@mentora.com' },
            { method: 'Discord', contact: 'Join our #help channel' },
            { method: 'Live Chat', contact: 'Available Mon-Fri, 9am-5pm EST' }
          ]
        }
      ]
    }
  ];

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? sections.map(section => ({
        ...section,
        content: section.content.filter(item =>
          item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.content.length > 0)
    : sections;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${darkMode ? 'from-blue-900/20 via-purple-900/10 to-gray-900' : 'from-blue-100/50 via-purple-100/30 to-white'}`}></div>
      </div>
      
      {/* Hero Section */}
      <div className={`relative z-10 w-full ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-purple-50'} py-16`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Mentora Documentation
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to know about using our blockchain education platform
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className={`flex items-center rounded-full overflow-hidden border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-300'} focus-within:ring-2 focus-within:ring-blue-500`}>
                <FaSearch className={`ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className={`w-full p-4 pl-3 focus:outline-none ${darkMode ? 'bg-gray-800/70 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Quick Links */}
        <div className={`mb-12 p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-md`}>
          {sections.map((section, index) => (
            <motion.a
              key={index}
              href={`#${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} transition-colors`}
            >
              <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                {section.icon}
              </div>
              <span className="font-medium">{section.title}</span>
            </motion.a>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {filteredSections.map((section, index) => (
            <motion.div
              key={index}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} rounded-xl p-6 shadow-md backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              
              <div className="space-y-8">
                {section.content.map((item, i) => (
                  <div key={i} id={item.id} className={`p-5 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setActiveSection(activeSection === `${section.id}-${i}` ? null : `${section.id}-${i}`)}
                    >
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{item.heading}</h3>
                      </div>
                      {activeSection === `${section.id}-${i}` ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    
                    {/* Item content - always visible */}
                    <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</p>
                    
                    {/* Expandable content */}
                    {activeSection === `${section.id}-${i}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-dashed"
                      >
                        {/* Steps */}
                        {item.steps && (
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Step-by-Step Guide</h4>
                            <ol className="space-y-2 ml-5">
                              {item.steps.map((step, stepIdx) => (
                                <li key={stepIdx} className="list-decimal">
                                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {/* Networks */}
                        {item.networks && (
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Deployed Networks</h4>
                            <div className="space-y-2">
                              {item.networks.map((network, netIdx) => (
                                <div key={netIdx} className={`p-3 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{network.name}</span>
                                    <code className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{network.address}</code>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* API Endpoints */}
                        {item.endpoints && (
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>API Endpoints</h4>
                            <div className="overflow-x-auto">
                              <table className={`min-w-full border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                  <tr>
                                    <th className="py-2 px-4 border-b text-left">Method</th>
                                    <th className="py-2 px-4 border-b text-left">Endpoint</th>
                                    <th className="py-2 px-4 border-b text-left">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.endpoints.map((endpoint, epIdx) => (
                                    <tr key={epIdx} className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} border-b`}>
                                      <td className={`py-2 px-4 ${endpoint.method === 'GET' ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-yellow-400' : 'text-yellow-600')} font-mono`}>{endpoint.method}</td>
                                      <td className="py-2 px-4 font-mono">{endpoint.path}</td>
                                      <td className="py-2 px-4">{endpoint.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        
                        {/* Issues and Solutions */}
                        {item.issues && (
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Common Issues</h4>
                            <div className="space-y-3">
                              {item.issues.map((issue, issueIdx) => (
                                <div key={issueIdx} className={`p-4 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                  <h5 className={`font-medium mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{issue.question}</h5>
                                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{issue.solution}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Contact Methods */}
                        {item.contactMethods && (
                          <div className="mb-4">
                            <h4 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Support Channels</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {item.contactMethods.map((contact, contactIdx) => (
                                <div key={contactIdx} className={`p-4 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-center`}>
                                  <div className="font-medium mb-1">{contact.method}</div>
                                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{contact.contact}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 p-8 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'} shadow-md`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://github.com/AbhigyaKrishna/Mentora-EduChain"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors text-center`}
            >
              <FaGithub className="text-3xl mb-3" />
              <h3 className="font-semibold text-lg mb-2">GitHub Repository</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Access our source code, contribute, and report issues
              </p>
            </a>
            
            <a
              href="#"
              className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors text-center`}
            >
              <FaDiscord className="text-3xl mb-3 text-indigo-500" />
              <h3 className="font-semibold text-lg mb-2">Discord Community</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Join our community for live help and discussions
              </p>
            </a>
            
            <a
              href="#"
              className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors text-center`}
            >
              <FaVideo className="text-3xl mb-3 text-red-500" />
              <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Watch step-by-step guides on using our platform
              </p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;