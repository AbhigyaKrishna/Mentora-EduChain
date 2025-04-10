import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaBell, FaBars, FaGraduationCap, FaCoins, FaEthereum } from 'react-icons/fa';
import { User, Award, Settings, Wallet, X } from 'lucide-react';
import Aurora from './Aurora';
import { Link, useNavigate } from 'react-router-dom';
import Overview from '../components/Profile/OverView';
import Certificates from '../components/Profile/Certificates';
import Achievements from '../components/Profile/Achievements';
import SettingsComponent from '../components/Profile/Settings';
import { useWalletConnection } from '../hooks/useWalletConnection';

import Rewards from './Rewards';
// Skeleton components for loading states
const ProfileSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-col items-center mb-6">
      <div className="w-24 h-24 rounded-full bg-gray-700 mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-36 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
      <div className="h-3 bg-gray-700 rounded w-32 mt-1 mb-4"></div>
      <div className="h-10 bg-gray-700 rounded w-full"></div>
    </div>
    <div className="space-y-2 pt-4 border-t border-gray-700">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-gray-700 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-40 bg-gray-700 rounded"></div>
      ))}
    </div>

    <div className="h-64 bg-gray-700 rounded mb-8"></div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-700 rounded"></div>
      ))}
    </div>
  </div>
);

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

// Available wallet connectors
const walletOptions = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '/metamask-logo.svg', // You'll need to add these images to your public folder
    description: 'Connect to your MetaMask wallet',
    color: '#E2761B'
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '/rainbow-logo.svg',
    description: 'Connect using Rainbow wallet',
    color: '#036FC7'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/walletconnect-logo.svg',
    description: 'Scan with WalletConnect to connect',
    color: '#3B99FC'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '/coinbase-logo.svg',
    description: 'Connect to Coinbase Wallet',
    color: '#0052FF'
  }
];

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeWallet, setActiveWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const navigate = useNavigate();
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState({
    profile: false,
    certificates: false,
    achievements: false
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New course recommendation available", isNew: true, time: "2 hours ago" },
    { id: 2, text: "You've earned a new badge: 'Streak Master'", isNew: true, time: "Yesterday" },
    { id: 3, text: "Course 'Advanced Smart Contracts' has been updated", isNew: false, time: "2 days ago" },
  ]);
  function WalletComponent() {
    const {
      walletAddress,
      activeWallet,
      isConnected,
      connectWallet,
      disconnectWallet
    } = useWalletConnection({ notifications: true });

    return (
      <div>
        {isConnected ? (
          <>
            <p>Connected with {activeWallet}: {walletAddress}</p>
            {/* <button onClick={disconnectWallet}>Disconnect</button> */}
          </>
        ) : (
          <button onClick={() => connectWallet('metamask')}>
            Connect MetaMask
          </button>
        )}
      </div>
    );
  }

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // Check connection status on component mount
  useEffect(() => {
    // Simulate staggered data loading
    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, profile: true }));
    }, 800);

    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, certificates: true }));
    }, 1500);

    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, achievements: true }));
      setIsLoading(false);
    }, 2200);

    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });

          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setActiveWallet('metamask');
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress('');
          setActiveWallet(null);
        }
      });
    }

    return () => {
      // Clean up listeners when component unmounts
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => { });
      }
    };
  }, []);

  const connectWallet = async (walletType) => {
    setIsConnecting(true);
    setConnectionError('');

    try {
      let accounts = [];

      switch (walletType) {
        case 'metamask':
          if (!isMetaMaskInstalled()) {
            throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
          }
          accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          break;

        case 'rainbow':
          // In a real implementation, you would use the Rainbow SDK
          // This is a simplified example
          if (window.rainbow) {
            accounts = await window.rainbow.connect();
          } else {
            throw new Error('Rainbow wallet not detected. Please install the Rainbow wallet extension.');
          }
          break;

        case 'walletconnect':
          // In a real implementation, you would use the WalletConnect SDK
          // This is a simplified example
          console.log('WalletConnect would open here');
          // Simulate a connection for demo purposes
          accounts = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
          break;

        case 'coinbase':
          // In a real implementation, you would use the Coinbase Wallet SDK
          // This is a simplified example
          if (window.coinbaseWalletSDK) {
            accounts = await window.coinbaseWalletSDK.connect();
          } else {
            throw new Error('Coinbase Wallet not detected.');
          }
          break;

        default:
          throw new Error('Unknown wallet type');
      }

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setActiveWallet(walletType);
        setShowWalletModal(false);

        // Add a notification about successful connection
        const walletName = walletOptions.find(w => w.id === walletType)?.name || walletType;
        setNotifications([
          {
            id: Date.now(),
            text: `Connected to ${walletName}: ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
            isNew: true,
            time: "Just now"
          },
          ...notifications
        ]);
      }
    } catch (error) {
      console.error(`Error connecting to ${walletType}:`, error);
      setConnectionError(error.message || `Failed to connect to ${walletType}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    const walletName = walletOptions.find(w => w.id === activeWallet)?.name || activeWallet;

    setWalletAddress('');
    setActiveWallet(null);

    // Add a notification about disconnection
    setNotifications([
      {
        id: Date.now(),
        text: `Disconnected from ${walletName}`,
        isNew: true,
        time: "Just now"
      },
      ...notifications
    ]);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  // Function to reload data (simulates refresh)
  const refreshData = () => {
    setIsLoading(true);
    setIsDataLoaded({
      profile: false,
      certificates: false,
      achievements: false
    });

    // Simulate staggered data loading
    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, profile: true }));
    }, 800);

    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, certificates: true }));
    }, 1500);

    setTimeout(() => {
      setIsDataLoaded(prev => ({ ...prev, achievements: true }));
      setIsLoading(false);
    }, 2200);
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

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowWalletModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-auto">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Connect Wallet</h3>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-4 text-gray-400 text-sm">
                    Connect with one of the available wallet providers or create a new wallet.
                  </div>

                  <div className="space-y-3">
                    {walletOptions.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => connectWallet(wallet.id)}
                        disabled={isConnecting}
                        className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 transition-all"
                        style={{ boxShadow: `0 0 0 1px rgba(${parseInt(wallet.color.substring(1, 3), 16)}, ${parseInt(wallet.color.substring(3, 5), 16)}, ${parseInt(wallet.color.substring(5, 7), 16)}, 0.05)` }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {/* Replace with actual wallet icon */}
                          <FaEthereum className="text-xl" style={{ color: wallet.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-xs text-gray-400">{wallet.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {connectionError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      {connectionError}
                    </div>
                  )}

                  <div className="mt-4 text-center text-xs text-gray-500">
                    By connecting a wallet, you agree to our Terms of Service and Privacy Policy
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              {isLoading ? (
                <div className="flex flex-col items-center p-6 mb-6 animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-700 mb-4"></div>
                  <div className="h-5 bg-gray-700 rounded w-36 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-24 mb-3"></div>

                  <div className="w-full h-10 bg-gray-700 rounded mt-3"></div>
                </div>
              ) : (
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

                  {/* Wallet Display/Connect for Mobile */}
                  <div className="mt-3 w-full">
                    {!walletAddress ? (
                      <button
                        onClick={() => setShowWalletModal(true)}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-colors"
                      >
                        <Wallet size={18} />
                        <span>Connect Wallet</span>
                      </button>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-700/50 rounded-lg text-white mb-2">
                          <FaEthereum className="text-blue-400" />
                          <span className="text-sm">{formatAddress(walletAddress)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rewards link for mobile */}
                  <div className="mt-3 w-full">
                    <Link
                      to="/rewards"
                      className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white font-medium transition-colors"
                    >
                      <FaCoins className="text-amber-200" />
                      <span>450 Coins</span>
                    </Link>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="space-y-2 animate-pulse">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-12 bg-gray-700 rounded w-full"></div>
                  ))}
                </div>
              ) : (
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('overview'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'}`}
                  >
                    <User className="w-5 h-5" />
                    <span>Overview</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('certificates'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'certificates' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'}`}
                  >
                    <FaCertificate className="w-5 h-5" />
                    <span>Certificates</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('achievements'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'achievements' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'}`}
                  >
                    <Award className="w-5 h-5" />
                    <span>Achievements</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('settings'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'}`}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => { navigate('/rewards'); setShowMobileMenu(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'rewards' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'}`}
                  >
                    <FaCoins className="w-5 h-5 text-amber-500" />
                    <span>Rewards</span>
                  </button>

                  <Link to="/course/1" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-700/70">
                    <FaGraduationCap className="w-5 h-5" />
                    <span>Go to Course</span>
                  </Link>
                </nav>
              )}
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
                  {/* Wallet Connect Button */}
                  <div className="mt-4 w-full">
                    {!walletAddress ? (
                      <button
                        onClick={() => setShowWalletModal(true)}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-colors"
                      >
                        <Wallet size={18} />
                        <span>Connect Wallet</span>
                      </button>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-700/50 rounded-lg text-white mb-2">
                          {activeWallet === 'metamask' && <FaEthereum className="text-orange-400" />}
                          {activeWallet === 'rainbow' && <FaEthereum className="text-blue-400" />}
                          {activeWallet === 'walletconnect' && <FaEthereum className="text-blue-500" />}
                          {activeWallet === 'coinbase' && <FaEthereum className="text-blue-600" />}
                          {!activeWallet && <FaEthereum className="text-gray-400" />}
                          <span className="text-sm">{formatAddress(walletAddress)}</span>
                        </div>
                      </div>
                    )}
                  </div>
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
                  <button
                    onClick={() => navigate('/rewards')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'rewards' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                  >
                    <FaCoins className="w-5 h-5" />
                    <span>Rewards</span>
                  </button>

                  <Link to="/course/1" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-700/70">
                    <FaGraduationCap className="w-5 h-5" />
                    <span>Go to Course</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="relative z-10 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <div className="text-gray-400">Welcome back, {userData.name}! Here's an overview of your learning journey.</div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Mobile wallet connect button (only visible on small screens) */}
                <div className="block sm:hidden">
                  {!walletAddress ? (
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                    >
                      <Wallet size={18} />
                      <span>Connect</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-700/50 rounded-lg text-white">
                      <FaEthereum className="text-blue-400" />
                      <span className="text-sm">{formatAddress(walletAddress)}</span>
                    </div>
                  )}
                </div>
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
            {isLoading ? (
              <ContentSkeleton />
            ) : (
              <>
                {activeTab === 'overview' && <Overview userData={userData} walletAddress={walletAddress} />}
                {activeTab === 'certificates' && <Certificates certificates={certificates} walletAddress={walletAddress} />}
                {activeTab === 'achievements' && <Achievements badges={badges} />}
                {activeTab === 'settings' && <SettingsComponent userData={userData} walletAddress={walletAddress} />}
                {activeTab === 'rewards' && <Rewards userData={userData} walletAddress={walletAddress} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;