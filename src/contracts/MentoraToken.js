import BaseContract from './BaseContract';
import MentoraTokenAbi from './abis/MentoraToken.json';

/**
 * MentoraToken contract wrapper for interacting with an Mentora token smart contract
 */
class MentoraToken extends BaseContract {
  /**
   * Creates a new instance of MentoraToken contract
   * @param {string|object} provider - Web3 provider URL or provider instance
   * @param {string} [privateKey] - Optional private key for signing transactions
   */
  constructor(provider, privateKey = null) {
    super(provider, import.meta.env.VITE_MENTORA_TOKEN_ADDRESS, MentoraTokenAbi, privateKey);
  }

  /**
   * Get token name
   * @returns {Promise<string>} Token name
   */
  async name() {
    return this.call('name');
  }

  /**
   * Get token symbol
   * @returns {Promise<string>} Token symbol
   */
  async symbol() {
    return this.call('symbol');
  }

  /**
   * Get token decimals
   * @returns {Promise<number>} Token decimals
   */
  async decimals() {
    return this.call('decimals');
  }

  /**
   * Get total token supply
   * @returns {Promise<string>} Total supply
   */
  async totalSupply() {
    return this.call('totalSupply');
  }

  /**
   * Get token balance of address
   * @param {string} address - Address to check balance
   * @returns {Promise<string>} Token balance
   */
  async balanceOf(address) {
    return this.call('balanceOf', [address]);
  }

  async getBalance() {
    return await this.balanceOf(this.defaultAccount);
  }

  /**
   * Get token allowance
   * @param {string} owner - Token owner address
   * @param {string} spender - Spender address
   * @returns {Promise<string>} Allowance amount
   */
  async allowance(owner, spender) {
    return this.call('allowance', [owner, spender]);
  }

  /**
   * Transfer tokens
   * @param {string} to - Recipient address
   * @param {string|number} amount - Amount to transfer
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async transfer(to, amount, options = {}) {
    const tx = this.contract.methods.transfer(to, amount);
    return this._sendTransaction(tx, options);
  }

  /**
   * Approve spender
   * @param {string} spender - Spender address
   * @param {string|number} amount - Amount to approve
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async approve(spender, amount, options = {}) {
    const tx = this.contract.methods.approve(spender, amount);
    return this._sendTransaction(tx, options);
  }

  /**
   * Transfer tokens from another address
   * @param {string} from - Sender address
   * @param {string} to - Recipient address
   * @param {string|number} amount - Amount to transfer
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async transferFrom(from, to, amount, options = {}) {
    const tx = this.contract.methods.transferFrom(from, to, amount);
    return this._sendTransaction(tx, options);
  }

  /**
   * Burn tokens
   * @param {string|number} amount - Amount to burn
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async burn(amount, options = {}) {
    const tx = this.contract.methods.burn(amount);
    return this._sendTransaction(tx, options);
  }

  /**
   * Check if contract is paused
   * @returns {Promise<boolean>} Paused status
   */
  async paused() {
    return this.call('paused');
  }

  /**
   * Pause contract
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async pause(options = {}) {
    const tx = this.contract.methods.pause();
    return this._sendTransaction(tx, options);
  }

  /**
   * Unpause contract
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async unpause(options = {}) {
    const tx = this.contract.methods.unpause();
    return this._sendTransaction(tx, options);
  }

  /**
   * Get contract owner
   * @returns {Promise<string>} Owner address
   */
  async owner() {
    return this.call('owner');
  }

  /**
   * Transfer ownership
   * @param {string} newOwner - New owner address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async transferOwnership(newOwner, options = {}) {
    const tx = this.contract.methods.transferOwnership(newOwner);
    return this._sendTransaction(tx, options);
  }

  /**
   * Renounce ownership
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async renounceOwnership(options = {}) {
    const tx = this.contract.methods.renounceOwnership();
    return this._sendTransaction(tx, options);
  }

  /**
   * Check if address has role
   * @param {string} role - Role identifier (bytes32)
   * @param {string} account - Account to check
   * @returns {Promise<boolean>} Has role status
   */
  async hasRole(role, account) {
    return this.call('hasRole', [role, account]);
  }

  /**
   * Grant role to account
   * @param {string} role - Role identifier (bytes32)
   * @param {string} account - Account to grant role
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async grantRole(role, account, options = {}) {
    const tx = this.contract.methods.grantRole(role, account);
    return this._sendTransaction(tx, options);
  }

  /**
   * Revoke role from account
   * @param {string} role - Role identifier (bytes32)
   * @param {string} account - Account to revoke role
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async revokeRole(role, account, options = {}) {
    const tx = this.contract.methods.revokeRole(role, account);
    return this._sendTransaction(tx, options);
  }

  /**
   * Renounce role
   * @param {string} role - Role identifier (bytes32)
   * @param {string} callerConfirmation - Caller address confirmation
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async renounceRole(role, callerConfirmation, options = {}) {
    const tx = this.contract.methods.renounceRole(role, callerConfirmation);
    return this._sendTransaction(tx, options);
  }

  /**
   * Get admin role for role
   * @param {string} role - Role identifier (bytes32)
   * @returns {Promise<string>} Admin role identifier
   */
  async getRoleAdmin(role) {
    return this.call('getRoleAdmin', [role]);
  }

  /**
   * Get course purchase reward amount
   * @returns {Promise<string>} Reward amount
   */
  async coursePurchaseReward() {
    return this.call('coursePurchaseReward');
  }

  /**
   * Get course completion reward amount
   * @returns {Promise<string>} Reward amount
   */
  async courseCompletionReward() {
    return this.call('courseCompletionReward');
  }

  /**
   * Get content creation reward amount
   * @returns {Promise<string>} Reward amount
   */
  async contentCreationReward() {
    return this.call('contentCreationReward');
  }

  /**
   * Get assignment completion reward amount
   * @returns {Promise<string>} Reward amount
   */
  async assignmentCompletionReward() {
    return this.call('assignmentCompletionReward');
  }

  /**
   * Update reward rates
   * @param {string|number} purchaseReward - New course purchase reward
   * @param {string|number} completionReward - New course completion reward
   * @param {string|number} creationReward - New content creation reward
   * @param {string|number} assignmentReward - New assignment completion reward
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async updateRewardRates(purchaseReward, completionReward, creationReward, assignmentReward, options = {}) {
    const tx = this.contract.methods.updateRewardRates(
      purchaseReward, 
      completionReward, 
      creationReward, 
      assignmentReward
    );
    return this._sendTransaction(tx, options);
  }

  /**
   * Reward user for course purchase
   * @param {string} user - User address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async rewardCoursePurchase(user, options = {}) {
    const tx = this.contract.methods.rewardCoursePurchase(user);
    return this._sendTransaction(tx, options);
  }

  /**
   * Reward user for course completion
   * @param {string} user - User address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async rewardCourseCompletion(user, options = {}) {
    const tx = this.contract.methods.rewardCourseCompletion(user);
    return this._sendTransaction(tx, options);
  }

  /**
   * Reward creator for content creation
   * @param {string} creator - Creator address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async rewardContentCreation(creator, options = {}) {
    const tx = this.contract.methods.rewardContentCreation(creator);
    return this._sendTransaction(tx, options);
  }

  /**
   * Reward student for assignment completion
   * @param {string} student - Student address
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async rewardAssignmentCompletion(student, options = {}) {
    const tx = this.contract.methods.rewardAssignmentCompletion(student);
    return this._sendTransaction(tx, options);
  }

  /**
   * Reward user with custom amount
   * @param {string} user - User address
   * @param {string|number} amount - Amount to reward
   * @param {string} reason - Reason for reward
   * @param {object} [options] - Transaction options
   * @returns {Promise<object>} Transaction receipt
   */
  async rewardUser(user, amount, reason, options = {}) {
    const tx = this.contract.methods.rewardUser(user, amount, reason);
    return this._sendTransaction(tx, options);
  }

  /**
   * Get DEFAULT_ADMIN_ROLE constant
   * @returns {Promise<string>} Role identifier
   */
  async DEFAULT_ADMIN_ROLE() {
    return this.call('DEFAULT_ADMIN_ROLE');
  }

  /**
   * Get REWARDER_ROLE constant
   * @returns {Promise<string>} Role identifier
   */
  async REWARDER_ROLE() {
    return this.call('REWARDER_ROLE');
  }

  /**
   * Check if contract supports interface
   * @param {string} interfaceId - Interface ID (bytes4)
   * @returns {Promise<boolean>} Support status
   */
  async supportsInterface(interfaceId) {
    return this.call('supportsInterface', [interfaceId]);
  }
}

export default MentoraToken;