import BaseContract from './BaseContract';
import CourseManagerAbi from './abis/CourseManager.json';

/**
 * A wrapper class for the CourseManager smart contract
 * that provides methods to interact with the course management system
 */
class CourseManager extends BaseContract {
  /**
   * Creates a new instance of CourseManager
   * @param {string|object} provider - Web3 provider URL or provider instance
   * @param {string} [privateKey] - Optional private key for signing transactions
   */
  constructor(provider, privateKey = null) {
    super(provider, import.meta.env.VITE_COURSE_MANAGER_ADDRESS, CourseManagerAbi, privateKey);
  }

  // ==================== Course Management ====================

  /**
   * Creates a new course on the platform
   * @param {string} title - Course title
   * @param {string} description - Course description
   * @param {string} category - Course category
   * @param {string} thumbnailIpfsHash - IPFS hash of the course thumbnail
   * @param {string} contentIpfsHash - IPFS hash of the course content
   * @param {number} difficulty - Course difficulty level (1-5)
   * @param {number} duration - Course duration in minutes
   * @param {number} price - Course price in wei
   * @param {number} moduleCount - Number of modules in the course
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async createCourse(
    title,
    description,
    category,
    thumbnailIpfsHash,
    contentIpfsHash,
    difficulty,
    duration,
    price,
    moduleCount,
    options = {}
  ) {
    const tx = this.contract.methods.createCourse(
      title,
      description,
      category,
      thumbnailIpfsHash,
      contentIpfsHash,
      difficulty,
      duration,
      price,
      moduleCount
    );
    return this._sendTransaction(tx, options);
  }

  /**
   * Updates an existing course
   * @param {number} courseId - ID of the course to update
   * @param {string} title - New course title
   * @param {string} description - New course description
   * @param {string} thumbnailIpfsHash - New IPFS hash of the course thumbnail
   * @param {string} contentIpfsHash - New IPFS hash of the course content
   * @param {number} price - New course price in wei
   * @param {boolean} isActive - Course active status
   * @param {number} moduleCount - New number of modules in the course
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async updateCourse(
    courseId,
    title,
    description,
    thumbnailIpfsHash,
    contentIpfsHash,
    price,
    isActive,
    moduleCount,
    options = {}
  ) {
    const tx = this.contract.methods.updateCourse(
      courseId,
      title,
      description,
      thumbnailIpfsHash,
      contentIpfsHash,
      price,
      isActive,
      moduleCount
    );
    return this._sendTransaction(tx, options);
  }

  /**
   * Updates the content of an existing course
   * @param {number} courseId - ID of the course to update
   * @param {string} contentIpfsHash - New IPFS hash of the course content
   * @param {number} moduleCount - New number of modules in the course
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async updateCourseContent(courseId, contentIpfsHash, moduleCount, options = {}) {
    const tx = this.contract.methods.updateCourseContent(courseId, contentIpfsHash, moduleCount);
    return this._sendTransaction(tx, options);
  }

  /**
   * Removes a course from active listings
   * @param {number} courseId - ID of the course to delist
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async delistCourse(courseId, options = {}) {
    const tx = this.contract.methods.delistCourse(courseId);
    return this._sendTransaction(tx, options);
  }

  /**
   * Updates the material count for a course
   * @param {number} courseId - ID of the course
   * @param {number} materialCount - New material count
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async updateMaterialCount(courseId, materialCount, options = {}) {
    const tx = this.contract.methods.updateMaterialCount(courseId, materialCount);
    return this._sendTransaction(tx, options);
  }

  // ==================== Course Information ====================

  /**
   * Gets total number of courses on the platform
   * @returns {Promise<number>} Course count
   */
  async getCourseCount() {
    return this.call('courseCounter');
  }

  /**
   * Gets detailed information about a course
   * @param {number} courseId - ID of the course
   * @returns {Promise<object>} Course information
   */
  async getCourseInfo(courseId) {
    return this.call('getCourseInfo', [courseId]);
  }

  /**
   * Gets statistical information about a course
   * @param {number} courseId - ID of the course
   * @returns {Promise<object>} Course statistics
   */
  async getCourseStats(courseId) {
    return this.call('getCourseStats', [courseId]);
  }

  /**
   * Gets the full course object
   * @param {number} courseId - ID of the course
   * @returns {Promise<object>} Complete course object
   */
  async getCourse(courseId) {
    return this.call('courses', [courseId]);
  }

  /**
   * Gets the IPFS content hash for a course
   * @param {number} courseId - ID of the course
   * @returns {Promise<string>} Content IPFS hash
   */
  async getCourseContent(courseId) {
    return this.call('getCourseContent', [courseId]);
  }

  /**
   * Gets the preview content for a course
   * @param {number} courseId - ID of the course
   * @returns {Promise<string>} Preview content IPFS hash
   */
  async getCoursePreview(courseId) {
    return this.call('getCoursePreview', [courseId]);
  }

  // ==================== Student Functions ====================

  /**
   * Purchases a course for the sender
   * @param {number} courseId - ID of the course to purchase
   * @param {object} [options] - Transaction options with required value field
   * @returns {Promise<object>} Transaction receipt
   */
  async purchaseCourse(courseId, options = {}) {
    const course = await this.getCourse(courseId);
    
    // Ensure the value is set to at least the course price
    if (!options.value || options.value < course.price) {
      options.value = course.price;
    }
    
    const tx = this.contract.methods.purchaseCourse(courseId);
    return this._sendTransaction(tx, options);
  }

  /**
   * Marks a course as completed by the sender
   * @param {number} courseId - ID of the course to complete
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async completeCourse(courseId, options = {}) {
    const tx = this.contract.methods.completeCourse(courseId);
    return this._sendTransaction(tx, options);
  }

  /**
   * Requests a refund for a purchased course
   * @param {number} courseId - ID of the course
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async requestRefund(courseId, options = {}) {
    const tx = this.contract.methods.requestRefund(courseId);
    return this._sendTransaction(tx, options);
  }

  /**
   * Checks if a user has purchased a specific course
   * @param {string} userAddress - User's Ethereum address
   * @param {number} courseId - ID of the course
   * @returns {Promise<boolean>} True if the user has purchased the course
   */
  async hasUserPurchasedCourse(userAddress, courseId) {
    return this.call('hasUserPurchasedCourse', [userAddress, courseId]);
  }

  /**
   * Checks if a user has completed a specific course
   * @param {string} userAddress - User's Ethereum address
   * @param {number} courseId - ID of the course
   * @returns {Promise<boolean>} True if the user has completed the course
   */
  async hasUserCompletedCourse(userAddress, courseId) {
    return this.call('hasUserCompletedCourse', [userAddress, courseId]);
  }

  /**
   * Gets the completion date for a user's course
   * @param {string} userAddress - User's Ethereum address
   * @param {number} courseId - ID of the course
   * @returns {Promise<number>} Completion timestamp (0 if not completed)
   */
  async getUserCourseCompletionDate(userAddress, courseId) {
    return this.call('getUserCourseCompletionDate', [userAddress, courseId]);
  }

  /**
   * Gets the number of courses purchased by a user
   * @param {string} userAddress - User's Ethereum address
   * @returns {Promise<number>} Number of courses
   */
  async getUserCourseCount(userAddress) {
    return this.call('getUserCourseCount', [userAddress]);
  }

  /**
   * Gets a specific course ID purchased by a user
   * @param {string} userAddress - User's Ethereum address
   * @param {number} index - Index in the user's purchased courses
   * @returns {Promise<number>} Course ID
   */
  async getUserCourseId(userAddress, index) {
    return this.call('userCourseIds', [userAddress, index]);
  }

  /**
   * Gets details about a user's course purchase
   * @param {string} userAddress - User's Ethereum address
   * @param {number} courseId - ID of the course
   * @returns {Promise<object>} Purchase details
   */
  async getUserPurchaseDetails(userAddress, courseId) {
    // Find the index of this course in the user's purchases
    const courseCount = await this.getUserCourseCount(userAddress);
    let index = -1;
    
    for (let i = 0; i < courseCount; i++) {
      const id = await this.getUserCourseId(userAddress, i);
      if (id == courseId) {
        index = i;
        break;
      }
    }
    
    if (index === -1) {
      throw new Error('User has not purchased this course');
    }
    
    return this.call('userPurchases', [userAddress, index]);
  }

  // ==================== Creator Functions ====================

  /**
   * Gets the number of courses created by an instructor
   * @param {string} creatorAddress - Creator's Ethereum address
   * @returns {Promise<number>} Number of courses
   */
  async getCreatorCourseCount(creatorAddress) {
    return this.call('getCreatorCourseCount', [creatorAddress]);
  }

  /**
   * Gets a specific course ID created by a creator
   * @param {string} creatorAddress - Creator's Ethereum address
   * @param {number} index - Index in the creator's courses
   * @returns {Promise<number>} Course ID
   */
  async getCreatorCourseId(creatorAddress, index) {
    return this.call('creatorCourseIds', [creatorAddress, index]);
  }

  /**
   * Gets the current balance of a creator
   * @param {string} creatorAddress - Creator's Ethereum address
   * @returns {Promise<string>} Creator's balance in wei
   */
  async getCreatorBalance(creatorAddress) {
    return this.call('creatorBalance', [creatorAddress]);
  }

  /**
   * Withdraws a creator's earned balance
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async creatorWithdraw(options = {}) {
    const tx = this.contract.methods.creatorWithdraw();
    return this._sendTransaction(tx, options);
  }

  // ==================== Admin Functions ====================

  /**
   * Processes a refund request
   * @param {number} courseId - ID of the course
   * @param {string} buyerAddress - Buyer's Ethereum address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async processRefund(courseId, buyerAddress, options = {}) {
    const tx = this.contract.methods.processRefund(courseId, buyerAddress);
    return this._sendTransaction(tx, options);
  }

  /**
   * Changes the platform fee percentage
   * @param {number} newFeePercent - New fee percentage
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async changePlatformFee(newFeePercent, options = {}) {
    const tx = this.contract.methods.changePlatformFee(newFeePercent);
    return this._sendTransaction(tx, options);
  }

  /**
   * Gets the current platform fee percentage
   * @returns {Promise<number>} Fee percentage
   */
  async getPlatformFee() {
    return this.call('platformFeePercent');
  }

  /**
   * Withdraws platform fees (owner only)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async ownerWithdraw(options = {}) {
    const tx = this.contract.methods.ownerWithdraw();
    return this._sendTransaction(tx, options);
  }

  /**
   * Sets the address of the Mentora token contract
   * @param {string} tokenAddress - Address of the Mentora token contract
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async setMentoraToken(tokenAddress, options = {}) {
    const tx = this.contract.methods.setMentoraToken(tokenAddress);
    return this._sendTransaction(tx, options);
  }

  /**
   * Pauses the contract (emergency only)
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async pause(options = {}) {
    const tx = this.contract.methods.pause();
    return this._sendTransaction(tx, options);
  }

  /**
   * Unpauses the contract
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async unpause(options = {}) {
    const tx = this.contract.methods.unpause();
    return this._sendTransaction(tx, options);
  }

  /**
   * Checks if the contract is currently paused
   * @returns {Promise<boolean>} True if the contract is paused
   */
  async isPaused() {
    return this.call('paused');
  }

  // ==================== Role Management ====================

  /**
   * Grants a role to an account
   * @param {string} role - Role identifier (INSTRUCTOR_ROLE or STUDENT_ROLE)
   * @param {string} accountAddress - Account to grant the role to
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async grantRole(role, accountAddress, options = {}) {
    // Get the role hash if a string name is provided
    let roleHash = role;
    if (role === 'INSTRUCTOR_ROLE' || role === 'instructor') {
      roleHash = await this.call('INSTRUCTOR_ROLE');
    } else if (role === 'STUDENT_ROLE' || role === 'student') {
      roleHash = await this.call('STUDENT_ROLE');
    } else if (role === 'DEFAULT_ADMIN_ROLE' || role === 'admin') {
      roleHash = await this.call('DEFAULT_ADMIN_ROLE');
    }
    
    const tx = this.contract.methods.grantRole(roleHash, accountAddress);
    return this._sendTransaction(tx, options);
  }

  /**
   * Revokes a role from an account
   * @param {string} role - Role identifier (INSTRUCTOR_ROLE or STUDENT_ROLE)
   * @param {string} accountAddress - Account to revoke the role from
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async revokeRole(role, accountAddress, options = {}) {
    // Get the role hash if a string name is provided
    let roleHash = role;
    if (role === 'INSTRUCTOR_ROLE' || role === 'instructor') {
      roleHash = await this.call('INSTRUCTOR_ROLE');
    } else if (role === 'STUDENT_ROLE' || role === 'student') {
      roleHash = await this.call('STUDENT_ROLE');
    } else if (role === 'DEFAULT_ADMIN_ROLE' || role === 'admin') {
      roleHash = await this.call('DEFAULT_ADMIN_ROLE');
    }
    
    const tx = this.contract.methods.revokeRole(roleHash, accountAddress);
    return this._sendTransaction(tx, options);
  }

  /**
   * Checks if an account has a specific role
   * @param {string} role - Role identifier (INSTRUCTOR_ROLE or STUDENT_ROLE)
   * @param {string} accountAddress - Account to check
   * @returns {Promise<boolean>} True if the account has the role
   */
  async hasRole(role, accountAddress) {
    // Get the role hash if a string name is provided
    let roleHash = role;
    if (role === 'INSTRUCTOR_ROLE' || role === 'instructor') {
      roleHash = await this.call('INSTRUCTOR_ROLE');
    } else if (role === 'STUDENT_ROLE' || role === 'student') {
      roleHash = await this.call('STUDENT_ROLE');
    } else if (role === 'DEFAULT_ADMIN_ROLE' || role === 'admin') {
      roleHash = await this.call('DEFAULT_ADMIN_ROLE');
    }
    
    return this.call('hasRole', [roleHash, accountAddress]);
  }

  /**
   * Gets all courses for a specific instructor
   * @param {string} instructorAddress - Instructor's Ethereum address
   * @returns {Promise<Array>} Array of course objects
   */
  async getInstructorCourses(instructorAddress) {
    const courseCount = await this.getCreatorCourseCount(instructorAddress);
    const courses = [];
    
    for (let i = 0; i < courseCount; i++) {
      const courseId = await this.getCreatorCourseId(instructorAddress, i);
      const course = await this.getCourse(courseId);
      courses.push(course);
    }
    
    return courses;
  }

  /**
   * Gets all courses purchased by a student
   * @param {string} studentAddress - Student's Ethereum address
   * @returns {Promise<Array>} Array of courses with purchase details
   */
  async getStudentCourses(studentAddress) {
    const courseCount = await this.getUserCourseCount(studentAddress);
    const courses = [];
    
    for (let i = 0; i < courseCount; i++) {
      const courseId = await this.getUserCourseId(studentAddress, i);
      const course = await this.getCourse(courseId);
      const purchaseDetails = await this.call('userPurchases', [studentAddress, i]);
      
      courses.push({
        ...course,
        purchaseDetails
      });
    }
    
    return courses;
  }
}

export default CourseManager;