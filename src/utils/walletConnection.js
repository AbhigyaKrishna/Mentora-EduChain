import Web3 from 'web3';

class WalletConnection {
  constructor() {
    this.web3 = null;
    this.connectedAddress = null;
  }

  async checkConnection(expectedAddress = null) {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const isConnected = accounts.length > 0;
      
      if (isConnected) {
        this.connectedAddress = accounts[0].toLowerCase();
        
        if (expectedAddress && this.connectedAddress !== expectedAddress.toLowerCase()) {
          return {
            isConnected: false,
            address: this.connectedAddress,
            error: 'Connected address does not match expected address'
          };
        }

        this.web3 = new Web3(window.ethereum);
      }

      return {
        isConnected,
        address: this.connectedAddress,
        error: null
      };
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return {
        isConnected: false,
        address: null,
        error: error.message
      };
    }
  }

  async connect(expectedAddress = null) {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.connectedAddress = accounts[0].toLowerCase();

      if (expectedAddress && this.connectedAddress !== expectedAddress.toLowerCase()) {
        throw new Error('Please connect with the same address used for Open Campus authentication');
      }

      this.web3 = new Web3(window.ethereum);

      return {
        isConnected: true,
        address: this.connectedAddress,
        error: null
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return {
        isConnected: false,
        address: null,
        error: error.message
      };
    }
  }

  getProvider() {
    return this.web3.currentProvider;
  }

  getSigner() {
    return this.web3.eth.accounts.privateKeyToAccount;
  }

  getConnectedAddress() {
    return this.connectedAddress;
  }
}

// Create a singleton instance
const walletConnection = new WalletConnection();

export default walletConnection;