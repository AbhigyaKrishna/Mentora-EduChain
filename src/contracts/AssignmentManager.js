import BaseContract from './BaseContract';
import AssignmentManagerAbi from './abis/AssignmentManager.json';
/**
 * AssignmentManager wrapper for AssignmentManager smart contract interactions
 * Inherits from BaseContract base class
 */
class AssignmentManager extends BaseContract {
  /**
   * Creates a new AssignmentManager wrapper instance
   * @param {string|object} provider - Web3 provider URL or provider instance
   * @param {string} [privateKey] - Optional private key for signing transactions
   */
  constructor(provider, privateKey = null) {
    super(provider, import.meta.env.VITE_ASSIGNMENT_MANAGER_ADDRESS, AssignmentManagerAbi, privateKey);
  }

  // ================ Assignment Management ================ //

  /**
   * Creates a new assignment
   * @param {string} title - Assignment title
   * @param {string} description - Assignment description
   * @param {string} question - Assignment question
   * @param {string[]} evaluationCriteria - List of evaluation criteria
   * @param {string} metaPromptIpfsHash - IPFS hash of meta prompt
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async createAssignment(title, description, question, evaluationCriteria, metaPromptIpfsHash, options = {}) {
    const tx = this.contract.methods.createAssignment(
      title, description, question, evaluationCriteria, metaPromptIpfsHash
    );
    return this._sendTransaction(tx, options);
  }

  /**
   * Updates an existing assignment
   * @param {number} assignmentId - Assignment ID
   * @param {string} title - New title
   * @param {string} description - New description
   * @param {string} question - New question
   * @param {string[]} evaluationCriteria - New evaluation criteria
   * @param {string} metaPromptIpfsHash - New IPFS hash of meta prompt
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async updateAssignment(assignmentId, title, description, question, evaluationCriteria, metaPromptIpfsHash, options = {}) {
    const tx = this.contract.methods.updateAssignment(
      assignmentId, title, description, question, evaluationCriteria, metaPromptIpfsHash
    );
    return this._sendTransaction(tx, options);
  }

  /**
   * Deactivates an assignment
   * @param {number} assignmentId - Assignment ID
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async deactivateAssignment(assignmentId, options = {}) {
    const tx = this.contract.methods.deactivateAssignment(assignmentId);
    return this._sendTransaction(tx, options);
  }

  /**
   * Gets an assignment details
   * @param {number} assignmentId - Assignment ID
   * @returns {Promise<object>} Assignment details
   */
  async getAssignment(assignmentId) {
    return this.call('getAssignment', [assignmentId]);
  }

  /**
   * Gets assignment question
   * @param {number} assignmentId - Assignment ID
   * @returns {Promise<string>} Assignment question
   */
  async getAssignmentQuestion(assignmentId) {
    return this.call('getAssignmentQuestion', [assignmentId]);
  }

  /**
   * Gets assignment evaluation criteria
   * @param {number} assignmentId - Assignment ID
   * @returns {Promise<string[]>} Evaluation criteria
   */
  async getAssignmentEvaluationCriteria(assignmentId) {
    return this.call('getAssignmentEvaluationCriteria', [assignmentId]);
  }

  /**
   * Gets assignment meta prompt IPFS hash
   * @param {number} assignmentId - Assignment ID
   * @returns {Promise<string>} Meta prompt IPFS hash
   */
  async getAssignmentMetaPromptIpfsHash(assignmentId) {
    return this.call('getAssignmentMetaPromptIpfsHash', [assignmentId]);
  }

  /**
   * Gets the number of submissions for an assignment
   * @param {number} assignmentId - Assignment ID
   * @returns {Promise<number>} Submission count
   */
  async getAssignmentSubmissionCount(assignmentId) {
    return this.call('getAssignmentSubmissionCount', [assignmentId]);
  }

  /**
   * Gets the total number of assignments created
   * @returns {Promise<number>} Assignment counter
   */
  async getAssignmentCounter() {
    return this.call('assignmentCounter');
  }

  // ================ Submission Management ================ //

  /**
   * Submits an assignment solution
   * @param {number} assignmentId - Assignment ID
   * @param {string} solutionIpfsHash - IPFS hash of the solution
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async submitAssignment(assignmentId, solutionIpfsHash, options = {}) {
    const tx = this.contract.methods.submitAssignment(assignmentId, solutionIpfsHash);
    return this._sendTransaction(tx, options);
  }

  /**
   * Gets a submission details
   * @param {number} assignmentId - Assignment ID
   * @param {string} student - Student address
   * @returns {Promise<object>} Submission details
   */
  async getSubmission(assignmentId, student) {
    return this.call('getSubmission', [assignmentId, student]);
  }

  /**
   * Gets number of submissions by a student
   * @param {string} student - Student address
   * @returns {Promise<number>} Submission count
   */
  async getStudentSubmissionCount(student) {
    return this.call('getStudentSubmissionCount', [student]);
  }

  /**
   * Grades an assignment submission
   * @param {number} assignmentId - Assignment ID
   * @param {string} student - Student address
   * @param {number} grade - Grade (0-100)
   * @param {string} feedback - Feedback text
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async gradeAssignment(assignmentId, student, grade, feedback, options = {}) {
    const tx = this.contract.methods.gradeAssignment(assignmentId, student, grade, feedback);
    return this._sendTransaction(tx, options);
  }

  // ================ System Configuration ================ //

  /**
   * Sets the passing grade threshold
   * @param {number} threshold - New threshold (0-100)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async setPassingGradeThreshold(threshold, options = {}) {
    const tx = this.contract.methods.setPassingGradeThreshold(threshold);
    return this._sendTransaction(tx, options);
  }

  /**
   * Gets the passing grade threshold
   * @returns {Promise<number>} Current threshold
   */
  async getPassingGradeThreshold() {
    return this.call('passingGradeThreshold');
  }

  /**
   * Sets the Mentora token address
   * @param {string} tokenAddress - New token address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async setMentoraToken(tokenAddress, options = {}) {
    const tx = this.contract.methods.setMentoraToken(tokenAddress);
    return this._sendTransaction(tx, options);
  }

  /**
   * Checks if contract is paused
   * @returns {Promise<boolean>} Paused status
   */
  async isPaused() {
    return this.call('paused');
  }

  /**
   * Pauses the contract (owner only)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async pause(options = {}) {
    const tx = this.contract.methods.pause();
    return this._sendTransaction(tx, options);
  }

  /**
   * Unpauses the contract (owner only)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async unpause(options = {}) {
    const tx = this.contract.methods.unpause();
    return this._sendTransaction(tx, options);
  }

  // ================ Role Management ================ //

  /**
   * Gets the DEFAULT_ADMIN_ROLE constant
   * @returns {Promise<string>} Role hash
   */
  async getDefaultAdminRole() {
    return this.call('DEFAULT_ADMIN_ROLE');
  }

  /**
   * Gets the TEACHER_ROLE constant
   * @returns {Promise<string>} Role hash
   */
  async getTeacherRole() {
    return this.call('TEACHER_ROLE');
  }

  /**
   * Gets the GRADER_ROLE constant
   * @returns {Promise<string>} Role hash
   */
  async getGraderRole() {
    return this.call('GRADER_ROLE');
  }

  /**
   * Gets the STUDENT_ROLE constant
   * @returns {Promise<string>} Role hash
   */
  async getStudentRole() {
    return this.call('STUDENT_ROLE');
  }

  /**
   * Checks if an account has a specific role
   * @param {string} role - Role hash
   * @param {string} account - Account address
   * @returns {Promise<boolean>} True if account has the role
   */
  async hasRole(role, account) {
    return this.call('hasRole', [role, account]);
  }

  /**
   * Grants a role to an account (requires admin role)
   * @param {string} role - Role hash
   * @param {string} account - Account address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async grantRole(role, account, options = {}) {
    const tx = this.contract.methods.grantRole(role, account);
    return this._sendTransaction(tx, options);
  }

  /**
   * Revokes a role from an account (requires admin role)
   * @param {string} role - Role hash
   * @param {string} account - Account address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async revokeRole(role, account, options = {}) {
    const tx = this.contract.methods.revokeRole(role, account);
    return this._sendTransaction(tx, options);
  }

  /**
   * Renounces a role (caller gives up their own role)
   * @param {string} role - Role hash
   * @param {string} account - Account address (must be the caller's address)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async renounceRole(role, account, options = {}) {
    const tx = this.contract.methods.renounceRole(role, account);
    return this._sendTransaction(tx, options);
  }

  /**
   * Gets the admin role for a role
   * @param {string} role - Role hash
   * @returns {Promise<string>} Admin role hash
   */
  async getRoleAdmin(role) {
    return this.call('getRoleAdmin', [role]);
  }

  // ================ Ownership Management ================ //

  /**
   * Gets the contract owner
   * @returns {Promise<string>} Owner address
   */
  async getOwner() {
    return this.call('owner');
  }

  /**
   * Transfers contract ownership to a new owner
   * @param {string} newOwner - New owner address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async transferOwnership(newOwner, options = {}) {
    const tx = this.contract.methods.transferOwnership(newOwner);
    return this._sendTransaction(tx, options);
  }

  /**
   * Renounces ownership (owner only)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async renounceOwnership(options = {}) {
    const tx = this.contract.methods.renounceOwnership();
    return this._sendTransaction(tx, options);
  }

  // ================ Event Listeners ================ //

  /**
   * Subscribes to contract events
   * @param {string} eventName - Name of the event to subscribe to
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToEvent(eventName, options = {}, callback) {
    return this.contract.events[eventName](options, callback);
  }

  /**
   * Subscribes to AssignmentCreated events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentCreated(options = {}, callback) {
    return this.subscribeToEvent('AssignmentCreated', options, callback);
  }

  /**
   * Subscribes to AssignmentUpdated events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentUpdated(options = {}, callback) {
    return this.subscribeToEvent('AssignmentUpdated', options, callback);
  }

  /**
   * Subscribes to AssignmentDeactivated events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentDeactivated(options = {}, callback) {
    return this.subscribeToEvent('AssignmentDeactivated', options, callback);
  }

  /**
   * Subscribes to AssignmentSubmitted events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentSubmitted(options = {}, callback) {
    return this.subscribeToEvent('AssignmentSubmitted', options, callback);
  }

  /**
   * Subscribes to AssignmentGraded events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentGraded(options = {}, callback) {
    return this.subscribeToEvent('AssignmentGraded', options, callback);
  }

  /**
   * Subscribes to AssignmentRewarded events
   * @param {object} [options] - Event filter options
   * @param {function} callback - Callback function for events
   * @returns {object} Event subscription
   */
  subscribeToAssignmentRewarded(options = {}, callback) {
    return this.subscribeToEvent('AssignmentRewarded', options, callback);
  }

  /**
   * Gets past events
   * @param {string} eventName - Event name
   * @param {object} [options] - Filter options
   * @returns {Promise<Array>} List of events
   */
  async getPastEvents(eventName, options = {}) {
    return this.contract.getPastEvents(eventName, options);
  }
}

export default AssignmentManager;