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
      const clients = {};

      // Initialize CourseManager if needed
      if ((contract === 'course' || contract === 'both') && !courseManager) {
        const newCourseManager = new CourseManager(provider, import.meta.env.VITE_COURSE_MANAGER_ADDRESS);
        newCourseManager.setDefaultAccount(account);
        setCourseManager(newCourseManager);
        clients.course = newCourseManager;
      } else if (courseManager) {
        clients.course = courseManager;
      }

      // Initialize AssignmentManager if needed
      if ((contract === 'assignment' || contract === 'both') && !assignmentManager) {
        const newAssignmentManager = new AssignmentManager(provider, import.meta.env.VITE_ASSIGNMENT_MANAGER_ADDRESS);
        newAssignmentManager.setDefaultAccount(account);
        setAssignmentManager(newAssignmentManager);
        clients.assignment = newAssignmentManager;
      } else if (assignmentManager) {
        clients.assignment = assignmentManager;
      }

      // Initialize MentoraToken if needed
      if ((contract === 'mentora' || contract === 'both') && !mentoraToken) {
        const newMentoraToken = new MentoraToken(provider, import.meta.env.VITE_MENTORA_TOKEN_ADDRESS);
        newMentoraToken.setDefaultAccount(account);
        setMentoraToken(newMentoraToken);
        clients.mentora = newMentoraToken;
      } else if (mentoraToken) {
        clients.mentora = mentoraToken;
      }

      setIsInitialized(true);
      
      // Return the appropriate client(s) based on type
      if (contract === 'course') return clients.course;
      if (contract === 'assignment') return clients.assignment;
      if (contract === 'mentora') return clients.mentora;
      return clients;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [courseManager, assignmentManager, mentoraToken, ethAddress, contract]);

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