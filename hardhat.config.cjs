require("@nomicfoundation/hardhat-toolbox");
const { myAddress1, myPrivKey1 } = require('../conf.js');
let assert = require("assert");

/** @type import('hardhat/config').HardhatUserConfig */

let myAddress = myAddress1;
let myPrivKey = myPrivKey1;
//assert(myPrivKey);
//assert(myAddress);
myPrivKey = myPrivKey.trim();
myAddress = myAddress.trim();
module.exports = {
  
  defaultNetwork: "polygon4",
    networks: {
    hardhat: {
    forking: {
      url: "https://polygon-mainnet.infura.io/v3/d036743e9fcb443eb1a5fc92f9a07ab4",
    }
  },
    polygon2:{
      url: "https://polygon-mainnet.g.alchemy.com/v2/Bpsk4TDyjevK2qHlhqopzx3qCwipztjK",
      chainId: 137,
      from: myAddress,
      gas: "auto",
      gasPrice: "auto",
      gasMultaiplie: 1,
      accounts: [myPrivKey],
      httpHeaders: undefined,
      timeout: 40000
    },
    polygon4: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/agK85zPuoV9kkhO0hMk4zM1EwVm2jflx",
      chainId: 137,
      from: myAddress,
      gas: "auto",
      gasPrice: "auto",
      gasMultaiplie: 1,
      accounts: [myPrivKey],
      httpHeaders: undefined,
      timeout: 40000
    },
    polygon5:{
      
      url: "https://rpc.ankr.com/polygon",
      chainId: 137,
      from: myAddress,
      gas: "auto",
      gasPrice: "auto",
      gasMultiplie: 1,
      accounts: [myPrivKey],
      httpHeaders: undefined,
      timeout: 40000
    },
    
    
  },
  solidity: {
    
    compilers: [
      {
        version: "0.8.19",
        settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
      },
      {
        version: "0.6.2",
        settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
      },
      {
        version: "0.8.20",
        settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
        
      },
    ],
  },
  paths: {
    sources: "./contracts",
   
  },
  sourcify: {
    enabled: true
  },
  
  etherscan: {
    apiKey: "86WMNQRTK6W3BF2BJGKFNNEDG4H21D7R8A",
  },
};

