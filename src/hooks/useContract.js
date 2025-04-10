import { useState, useEffect, useCallback } from 'react';
import CourseManager from '../contracts/CourseManager';
import AssignmentManager from '../contracts/AssignmentManager';
import MentoraToken from '../contracts/MentoraToken';
import { useOCAuthState } from './useOCAuthState';

/**
 * Custom hook for managing blockchain clients (CourseManager, AssignmentManager, and MentoraToken)
 * @param {string} contract - Type of client to use ('course', 'assignment', 'token', or 'all')
 * @returns {Object} Client instances and utility functions
 */
export const useContract = (contract = 'all') => {
  const [courseManager, setCourseManager] = useState(null);
  const [assignmentManager, setAssignmentManager] = useState(null);
  const [mentoraToken, setMentoraToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const { ethAddress } = useOCAuthState();

  // Initialize the clients
  const initialize = useCallback((provider = window.ethereum) => {
    try {
      if (isInitialized) return;

      // Initialize all managers first
      const newCourseManager = new CourseManager(provider);
      const newAssignmentManager = new AssignmentManager(provider);
      const newMentoraToken = new MentoraToken(provider);
      
      // Then update state
      setCourseManager(newCourseManager);
      setAssignmentManager(newAssignmentManager);
      setMentoraToken(newMentoraToken);
      
      // Set initialized after all state updates
      setIsInitialized(true);
      
      return {
        courseManager: newCourseManager,
        assignmentManager: newAssignmentManager,
        mentoraToken: newMentoraToken
      };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [ethAddress, isInitialized]);

  // Get the client instance(s), initializing if needed
  const getClient = useCallback(() => {
    if (!isInitialized) {
      try {
        const clients = initialize();
        
        if (contract === 'course') return clients.courseManager;
        if (contract === 'assignment') return clients.assignmentManager;
        if (contract === 'token') return clients.mentoraToken;
        return clients;
      } catch (err) {
        setError(err.message);
        throw new Error(`Failed to initialize blockchain client(s): ${err.message}`);
      }
    }
    
    if (contract === 'course') return courseManager;
    if (contract === 'assignment') return assignmentManager;
    if (contract === 'token') return mentoraToken;
    return { course: courseManager, assignment: assignmentManager, token: mentoraToken };
  }, [courseManager, assignmentManager, mentoraToken, initialize, contract, isInitialized]);

  // Reset the client(s)
  const reset = useCallback(() => {
    if (contract === 'course' || contract === 'all') {
      setCourseManager(null);
    }
    if (contract === 'assignment' || contract === 'all') {
      setAssignmentManager(null);
    }
    if (contract === 'token' || contract === 'all') {
      setMentoraToken(null);
    }
    setIsInitialized(false);
    setError(null);
  }, [contract]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Optionally reset clients when component unmounts
      // Uncomment the line below if you want this behavior
      // reset();
    };
  }, [reset]);

  return {
    courseManager,
    assignmentManager,
    mentoraToken,
    client: contract === 'course' ? courseManager : 
           contract === 'assignment' ? assignmentManager : 
           contract === 'token' ? mentoraToken : 
           { course: courseManager, assignment: assignmentManager, token: mentoraToken },
    isInitialized,
    error,
    initialize,
    getClient,
    reset
  };
};