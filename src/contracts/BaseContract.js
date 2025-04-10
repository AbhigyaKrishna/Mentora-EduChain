import Web3 from 'web3';

class BaseContract {
  /**
   * Creates a new instance of BaseContract
   * @param {string|object} provider - Web3 provider URL or provider instance
   * @param {string} contractAddress - The deployed contract address
   * @param {Array} abi - The contract ABI
   * @param {string} [privateKey] - Optional private key for signing transactions
   */
  constructor(provider, contractAddress, abi, privateKey = null) {
    if (!provider) throw new Error('Provider is required');
    if (!contractAddress) throw new Error('Contract address is required');
    if (!abi) throw new Error('Contract ABI is required');
    
    this.web3 = new Web3(provider);
    this.contractABI = abi;
    this.contractAddress = contractAddress;
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    this.defaultAccount = this.web3.eth.defaultAccount;
    
    if (privateKey) {
      this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this.web3.eth.accounts.wallet.add(this.account);
      this.defaultAccount = this.account.address;
    }
  }
  
  /**
   * Sets the default account for transactions
   * @param {string} account - Ethereum address
   */
  setDefaultAccount(account) {
    if (!account) throw new Error('Account address is required');
    this.defaultAccount = account;
  }

  /**
   * Gets the current contract instance
   * @returns {object} Web3 contract instance
   */
  getContract() {
    return this.contract;
  }

  /**
   * Sends a transaction to the blockchain
   * @param {object} tx - Web3 transaction object
   * @param {object} [options] - Transaction options
   * @param {string} [options.from] - From address
   * @param {number|string} [options.gas] - Gas limit
   * @param {number|string} [options.gasPrice] - Gas price
   * @param {number|string} [options.value] - ETH value to send
   * @returns {Promise<object>} Transaction receipt
   */
  async _sendTransaction(tx, options = {}) {
    try {
      const from = options.from || this.defaultAccount;
      if (!from) throw new Error('No from address specified');
      
      const gas = options.gas || await tx.estimateGas({ from }).catch(err => {
        throw new Error(`Gas estimation failed: ${err.message}`);
      });
      
      const gasPrice = options.gasPrice || await this.web3.eth.getGasPrice();
      const value = options.value || '0';
      
      const txParams = {
        from,
        to: this.contractAddress,
        data: tx.encodeABI(),
        gas,
        gasPrice,
        value
      };
      
      if (this.account && from === this.account.address) {
        const signedTx = await this.web3.eth.accounts.signTransaction(txParams, this.account.privateKey);
        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      }
      
      return this.web3.eth.sendTransaction(txParams);
    } catch (error) {
      console.error('Transaction error:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
  
  /**
   * Calls a read-only method on the contract
   * @param {string} method - Method name
   * @param {Array} [args=[]] - Method arguments
   * @returns {Promise<any>} Method result
   */
  async call(method, args = []) {
    try {
      if (!this.contract.methods[method]) {
        throw new Error(`Method ${method} does not exist on contract`);
      }
      return await this.contract.methods[method](...args).call();
    } catch (error) {
      console.error(`Error calling ${method}:`, error);
      throw error;
    }
  }
}

export default BaseContract; 