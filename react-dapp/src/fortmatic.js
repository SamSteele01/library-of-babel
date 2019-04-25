import Fortmatic from 'fortmatic';
// Works for web3 1.0 and pre-1.0 versions
import Web3 from 'web3';

const fortmaticTestApiKey = "pk_test_FA4473198B4649E4"
// const fortmaticMainApiKey = "pk_live_0AC92946C8888616"

const fm = new Fortmatic(fortmaticTestApiKey);
window.web3 = new Web3(fm.getProvider());
