import Fortmatic from 'fortmatic';
// Works for web3 1.0 and pre-1.0 versions
import Web3 from 'web3';

const fortmaticTestApiKey = "pk_test_FA4473198B4649E4"
// const fortmaticMainApiKey = "pk_live_0AC92946C8888616"

async function getWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            console.log("MetaMask");
            return "metamask";
        } catch (error) {
            // User denied account access...
            console.log('USER DENIED ACCOUNT ACCESS');
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        console.log("browser");
        return "browser";
    }
    // Non-dapp browsers...
    else {
      const fm = new Fortmatic(fortmaticTestApiKey);
      window.web3 = new Web3(fm.getProvider());
      // window.web3.currentProvider.enable();
      console.log("fortmatic");
      return "fortmatic";
    }
};
export default getWeb3;
