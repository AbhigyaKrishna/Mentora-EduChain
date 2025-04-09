import React, { useState } from 'react';
import { useOCAuthState } from '../hooks/useOCAuthState';

const RoomSidebar = ({ room, activeFile, onFileSelect, connectedUsers = [] }) => {
  const [activeTab, setActiveTab] = useState('files'); // 'files' or 'members'
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileLanguage, setNewFileLanguage] = useState('javascript');
  const { OCId } = useOCAuthState();

  const handleAddFile = () => {
    // This would typically make an API call first
    const newFile = {
      id: Date.now().toString(),
      name: newFileName,
      language: newFileLanguage,
      content: ''
    };
    
    // Update room files (this would be handled by your state management in a real app)
    room.files = [...(room.files || []), newFile];
    
    // Select the new file
    onFileSelect(newFile);
    
    // Reset form and close modal
    setNewFileName('');
    setNewFileLanguage('javascript');
    setShowAddFileModal(false);
  };

  const renderMembers = () => {
    return (
      <div className="p-4">
        <h3 className="font-medium mb-2">Connected Users ({connectedUsers.length})</h3>
        <ul className="space-y-2">
          {connectedUsers.map(user => (
            <li key={user.id} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-sm">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: user.color }}
              />
              <div className="flex-1">
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-gray-500 ml-2">({user.id})</span>
              </div>
            </li>
          ))}
        </ul>
        {connectedUsers.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No users currently connected
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab selector */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center ${activeTab === 'files' ? ' border-b-2 border-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeTab === 'members' ? ' border-b-2 border-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'files' && (
          <div>
            {/* Files list */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Project Files</h3>
                <button
                  onClick={() => setShowAddFileModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add File
                </button>
              </div>

              {room.files && room.files.length > 0 ? (
                <ul className="space-y-1">
                  {room.files.map(file => (
                    <li key={file.id}>
                      <button
                        onClick={() => onFileSelect(file)}
                        className={`w-full text-left px-3 py-2 rounded text-sm flex items-center ${
                          activeFile && activeFile.id === file.id
                            ? 'bg-blue-100 text-blue-800'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <FileIcon language={file.language} />
                        <span className="ml-2 truncate">{file.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No files in this project yet
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'members' && renderMembers()}
      </div>

      {/* Room details footer */}
      <div className="mt-auto border-t p-4">
        <h4 className="font-medium">{room.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{room.description}</p>
      </div>

      {/* Add file modal */}
      {showAddFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium mb-4">Add New File</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Name
              </label>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="e.g. index.js"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={newFileLanguage}
                onChange={(e) => setNewFileLanguage(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="javascript">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="python">Python</option>
                <option value="json">JSON</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddFileModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFile}
                disabled={!newFileName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                Add File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for file icons
const FileIcon = ({ language }) => {
  const getIconClass = () => {
    switch (language) {
      case 'javascript':
        return 'text-yellow-600';
      case 'html':
        return 'text-orange-600';
      case 'css':
        return 'text-blue-600';
      case 'python':
        return 'text-green-600';
      case 'json':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`${getIconClass()} text-lg`}>
      <i className="fas fa-file-code"></i>
    </div>
  );
};

export default RoomSidebar;