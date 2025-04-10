import { useState, useEffect, useCallback } from 'react';
import CourseManager from '../contracts/CourseManager';
import AssignmentManager from '../contracts/AssignmentManager';
import MentoraToken from '../contracts/MentoraToken';
import { useOCAuthState } from './useOCAuthState';

/**
 * Custom hook for managing blockchain clients (CourseManager, AssignmentManager, and MentoraToken)
 * @param {string} contract - Type of client to use ('course', 'assignment', 'mentora', or 'both')
 * @returns {Object} Client instances and utility functions
 */
export const useContract = (contract = 'both') => {
  const [courseManager, setCourseManager] = useState(null);
  const [assignmentManager, setAssignmentManager] = useState(null);
  const [mentoraToken, setMentoraToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const { ethAddress } = useOCAuthState();

  // Initialize the clients
  const initialize = useCallback((provider = window.ethereum, account = ethAddress ? ethAddress : window.ethereum?.selectedAddress) => {
    try {
      if (isInitialized) return;

      // Check and initialize CourseManager if not already initialized
      if (!courseManager) {
        const newCourseManager = new CourseManager(provider);
        setCourseManager(newCourseManager);
      }

      // Check and initialize AssignmentManager if not already initialized
      if (!assignmentManager) {
        const newAssignmentManager = new AssignmentManager(provider);
        setAssignmentManager(newAssignmentManager);
      }

      // Check and initialize MentoraToken if not already initialized
      if (!mentoraToken) {
        const newMentoraToken = new MentoraToken(provider);
        setMentoraToken(newMentoraToken);
      }

      if (mentoraToken && assignmentManager && courseManager) {
        setIsInitialized(true);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [ethAddress, courseManager, assignmentManager, mentoraToken]);

  // Get the client instance(s), initializing if needed
  const getClient = useCallback(() => {
    if ((!courseManager && (contract === 'course' || contract === 'both')) ||
        (!assignmentManager && (contract === 'assignment' || contract === 'both')) ||
        (!mentoraToken && (contract === 'mentora' || contract === 'both'))) {
      try {
        return initialize();
      } catch (err) {
        setError(err.message);
        throw new Error(`Failed to initialize blockchain client(s): ${err.message}`);
      }
    }
    
    if (contract === 'course') return courseManager;
    if (contract === 'assignment') return assignmentManager;
    if (contract === 'mentora') return mentoraToken;
    return { course: courseManager, assignment: assignmentManager, mentora: mentoraToken };
  }, [courseManager, assignmentManager, mentoraToken, ethAddress, initialize, contract]);

  // Reset the client(s)
  const reset = useCallback(() => {
    if (contract === 'course' || contract === 'both') {
      setCourseManager(null);
    }
    if (contract === 'assignment' || contract === 'both') {
      setAssignmentManager(null);
    }
    if (contract === 'mentora' || contract === 'both') {
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
           contract === 'mentora' ? mentoraToken : 
           { course: courseManager, assignment: assignmentManager, mentora: mentoraToken },
    isInitialized,
    error,
    initialize,
    getClient,
    reset
  };
};