import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiX, FiMaximize2, FiMinimize2, FiUsers, FiInfo, FiSettings } from 'react-icons/fi';
import CollaborativeEditor from '../components/CollaborativeEditor';
import RoomChat from '../components/RoomChat';
import RoomSidebar from '../components/RoomSidebar';
import { useOCAuthState } from '../hooks/useOCAuthState';
import { toast, Toaster } from 'react-hot-toast';

const ProjectRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { OCId } = useOCAuthState();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [showRoomInfo, setShowRoomInfo] = useState(false);

  const fetchRoomDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/api/v1/rooms/${roomId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Room not found');
        }
        throw new Error('Failed to fetch room details');
      }
      
      const data = await response.json();
      setRoom(data);
      
      if (data.files?.length > 0) {
        setActiveFile(data.files[0]);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load room. Using sample data.');
      // Development fallback data
      setRoom({
        id: roomId,
        name: 'Sample Project Room',
        description: 'This is a sample collaborative project room',
        createdAt: new Date().toISOString(),
        members: [
          { id: '1', name: 'John Doe', online: true },
          { id: '2', name: 'Jane Smith', online: false },
        ],
        files: [
          { id: '1', name: 'index.js', language: 'javascript', content: '// Your code here' },
          { id: '2', name: 'styles.css', language: 'css', content: '/* Your CSS here */' }
        ]
      });
      setActiveFile({
        id: '1',
        name: 'index.js',
        language: 'javascript',
        content: '// Your code here'
      });
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchRoomDetails();
  }, [fetchRoomDetails]);

  const handleFileChange = (file) => {
    setActiveFile(file);
    toast.success(`Switched to ${file.name}`);
  };

  const handleLeaveRoom = async () => {
    try {
      await fetch(`http://localhost:8000/api/v1/rooms/${roomId}/leave`, {
        method: 'POST',
      });
      toast.success('Left room successfully');
      navigate('/rooms');
    } catch (err) {
      toast.error('Failed to leave room');
    }
  };

  const handleUsersChange = (users) => {
    setConnectedUsers(users);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          <p className="mt-4 text-blue-400 font-medium">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-md w-full mx-4">
          <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/50 text-red-100 px-6 py-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-300">Error</h2>
            <p className="mb-4 opacity-90">{error}</p>
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 font-inter">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#F3F4F6',
            borderRadius: '0.5rem',
            border: '1px solid rgba(75, 85, 99, 0.2)',
          },
        }}
      />

      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-4 flex items-center border-b border-gray-700/50 shadow-md">
        <button
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 hover:bg-gray-700/50 rounded-lg mr-4 transition-colors"
        >
          <FiUsers className="w-5 h-5 text-blue-400" />
        </button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-white tracking-tight">{room.name}</h1>
          <p className="text-sm text-blue-400/90 font-medium mt-0.5">
            {connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''} connected
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowRoomInfo(!showRoomInfo)}
            className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors group"
            title="Room Information"
          >
            <FiInfo className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </button>
          <button
            onClick={() => toast.success('Settings coming soon!')}
            className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors group"
            title="Room Settings"
          >
            <FiSettings className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </button>
          <button 
            onClick={handleLeaveRoom}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <FiX className="w-5 h-5" />
            <span>Leave Room</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${
          isSidebarCollapsed ? 'w-0' : 'w-72'
        } transition-all duration-300 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50`}>
          {!isSidebarCollapsed && (
            <RoomSidebar 
              room={room} 
              activeFile={activeFile}
              onFileSelect={handleFileChange}
              connectedUsers={connectedUsers}
            />
          )}
        </div>

        {/* Editor and Chat */}
        <div className="flex flex-1">
          {/* Editor */}
          <div className={`flex-1 overflow-hidden ${isChatExpanded ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
            {activeFile ? (
              <CollaborativeEditor 
                roomId={roomId}
                file={activeFile}
                onUsersChange={handleUsersChange}
                OCId={OCId}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800/20">
                <div className="text-center px-6 py-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                  <p className="text-gray-400 mb-4 text-lg">No file selected</p>
                  <button 
                    onClick={() => document.getElementById('createFile')?.click()}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-6 py-3 rounded-lg transition-all duration-200 font-medium"
                  >
                    Create New File
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className={`border-l border-gray-700/50 transition-all duration-300 ${
            isChatExpanded ? 'w-1/2' : 'w-72'
          }`}>
            <div className="flex flex-col h-full bg-gray-800/30 backdrop-blur-sm">
              <div className="px-4 py-3 bg-gray-800/50 flex justify-between items-center border-b border-gray-700/50">
                <h3 className="font-medium text-blue-400">Room Chat</h3>
                <button
                  onClick={() => setIsChatExpanded(!isChatExpanded)}
                  className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  {isChatExpanded ? <FiMinimize2 className="text-gray-400" /> : <FiMaximize2 className="text-gray-400" />}
                </button>
              </div>
              <RoomChat 
                roomId={roomId}
                expanded={isChatExpanded}
                currentUser={OCId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Room Info Modal */}
      {showRoomInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800/90 rounded-xl max-w-md w-full p-6 border border-gray-700/50 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-white">Room Information</h2>
              <button
                onClick={() => setShowRoomInfo(false)}
                className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400 hover:text-gray-300" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-1">Room ID</h3>
                <p className="font-mono bg-gray-900/50 px-3 py-2 rounded-lg text-gray-300">{room.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-1">Description</h3>
                <p className="text-gray-300">{room.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-1">Created</h3>
                <p className="text-gray-300">{new Date(room.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-2">Connected Users</h3>
                <div className="space-y-2 bg-gray-900/50 p-3 rounded-lg">
                  {connectedUsers.map(user => (
                    <div key={user.id} className="flex items-center space-x-3 px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: user.color }}
                      />
                      <span className="text-gray-300">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRoom;
