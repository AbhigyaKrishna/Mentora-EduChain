import React, { useEffect, useRef, useState } from 'react';
import Editor from "@monaco-editor/react";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { FiCopy, FiDownload, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { MonacoBinding } from 'y-monaco';

// Language map with icons and display names
const languageMap = {
  javascript: {
    id: 'javascript',
    icon: '📜',
    displayName: 'JavaScript',
    fileExt: '.js'
  },
  html: {
    id: 'html',
    icon: '🌐',
    displayName: 'HTML',
    fileExt: '.html'
  },
  css: {
    id: 'css',
    icon: '🎨',
    displayName: 'CSS',
    fileExt: '.css'
  },
  python: {
    id: 'python',
    icon: '🐍',
    displayName: 'Python',
    fileExt: '.py'
  },
  json: {
    id: 'json',
    icon: '📋',
    displayName: 'JSON',
    fileExt: '.json'
  }
};

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 2000;

const CollaborativeEditor = ({ roomId, file, onUsersChange, OCId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const [value, setValue] = useState(file?.content || '');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const ydocRef = useRef(null);
  const providerRef = useRef(null);
  const bindingRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      editorRef.current?.parentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCopyContent = () => {
    const content = editorRef.current?.getValue() || '';
    navigator.clipboard.writeText(content).then(() => {
      toast.success('Code copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy code');
    });
  };

  const handleDownload = () => {
    const content = editorRef.current?.getValue() || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const language = languageMap[file.language];
    const fileExtension = language ? language.fileExt : '.txt';
    a.href = url;
    a.download = `${file.name}${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success('File downloaded successfully!');
  };

  const handleReconnect = () => {
    if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttemptsRef.current++;
      
      // Clear any existing timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Show reconnection attempt toast
      toast(`Reconnecting... (${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`, {
        duration: 2000,
        icon: '🔄'
      });

      // Set new timeout for reconnection
      reconnectTimeoutRef.current = setTimeout(() => {
        if (providerRef.current && !providerRef.current.shouldConnect) {
          providerRef.current.connect();
        }
      }, RECONNECT_DELAY);
    } else {
      setError('Failed to connect after multiple attempts');
      toast.error('Connection failed. Please refresh the page.');
    }
  };

  const setupCollaboration = async () => {
    try {
      if (!OCId || !roomId || !file?.id) {
        throw new Error('Missing required collaboration parameters');
      }

      // Clean up existing instances
      if (bindingRef.current) bindingRef.current.destroy();
      if (providerRef.current) providerRef.current.disconnect();
      if (ydocRef.current) ydocRef.current.destroy();

      // Reset reconnection attempts
      reconnectAttemptsRef.current = 0;

      // Create new Y.js document
      const ydoc = new Y.Doc();
      ydocRef.current = ydoc;

      // Create text type for editor content
      const ytext = ydoc.getText('monaco');

      // Initialize with file content if empty
      if (ytext.toString() === '') {
        ytext.insert(0, file.content || '');
      }

      // Generate a random color for the user
      const userColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;

      // Create WebSocket provider
      const wsProvider = new WebsocketProvider(
        'ws://localhost:8000',
        `ws/collaboration/${roomId}/${OCId}/${file.id}`,
        ydoc
      );

      providerRef.current = wsProvider;

      // Set up awareness state
      wsProvider.awareness.setLocalState({
        user: {
          name: `User ${OCId.slice(-4)}`,
          color: userColor,
          id: OCId
        }
      });

      // Handle awareness updates
      const updateAwareness = () => {
        const states = Array.from(wsProvider.awareness.getStates().values());
        const users = states
          .filter(state => state?.user)
          .map(state => state.user);
        
        if (onUsersChange) {
          onUsersChange(users);
        }
      };

      // Listen for awareness changes
      wsProvider.awareness.on('change', updateAwareness);

      // Handle connection status
      wsProvider.on('status', ({ status }) => {
        console.log('Connection status:', status);
        
        if (status === 'connected') {
          setIsConnected(true);
          reconnectAttemptsRef.current = 0;
          setError(null);
          toast.success('Connected to collaboration server');
          updateAwareness();
        } else if (status === 'disconnected') {
          setIsConnected(false);
          toast('Disconnected from server', {
            icon: '⚠️',
            duration: 3000
          });
          handleReconnect();
        }
      });

      // Handle connection errors
      wsProvider.on('connection-error', (err) => {
        console.error('Connection error:', err);
        setIsConnected(false);
        setError('Failed to connect to collaboration server');
        handleReconnect();
      });

      // Set up Monaco binding if editor is ready
      if (editorRef.current) {
        setupMonacoBinding(ytext, wsProvider.awareness);
      }

    } catch (err) {
      console.error('Error setting up collaboration:', err);
      setError(`Error setting up collaboration: ${err.message}`);
      toast.error('Failed to initialize collaboration');
    }
  };

  const setupMonacoBinding = (ytext, awareness) => {
    if (!editorRef.current) return;

    try {
      const binding = new MonacoBinding(
        ytext,
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        awareness
      );
      bindingRef.current = binding;
    } catch (err) {
      console.error('Error setting up Monaco binding:', err);
      toast.error('Failed to set up editor binding');
    }
  };

  useEffect(() => {
    setupCollaboration();

    // Cleanup function
    return () => {
      // Clear any pending reconnection timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Clean up Y.js instances
      if (bindingRef.current) {
        bindingRef.current.destroy();
      }
      if (providerRef.current) {
        providerRef.current.disconnect();
        providerRef.current.awareness.setLocalState(null);
        providerRef.current.destroy();
      }
      if (ydocRef.current) {
        ydocRef.current.destroy();
      }
    };
  }, [roomId, OCId, file.id]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      padding: { top: 10 },
    });

    if (ydocRef.current) {
      const ytext = ydocRef.current.getText('monaco');
      setupMonacoBinding(ytext, providerRef.current.awareness);
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      {/* Editor header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <span className="text-lg">
            {languageMap[file?.language]?.icon || '📄'}
          </span>
          <div className="flex flex-col">
            <span className="text-gray-200 font-medium">{file?.name}</span>
            <span className="text-xs text-gray-400">
              {languageMap[file?.language]?.displayName || 'Plain Text'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-gray-400">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyContent}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
              title="Copy code"
            >
              <FiCopy className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
              title="Download file"
            >
              <FiDownload className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <FiMinimize2 className="w-4 h-4" />
              ) : (
                <FiMaximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 p-4 text-sm">
          <p className="font-medium">{error}</p>
          <button 
            onClick={setupCollaboration}
            className="mt-2 text-red-300 hover:text-red-200 underline"
          >
            Try reconnecting
          </button>
        </div>
      )}

      {/* Editor container */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={file.language || 'javascript'}
          defaultValue={file.content || ''}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            readOnly: !isConnected,
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            padding: { top: 10 },
          }}
        />
      </div>
    </div>
  );
};

export default CollaborativeEditor;