require("@nomicfoundation/hardhat-toolbox");


const API_URL = "https://polygon-mumbai.g.alchemy.com/v2/Yu5w2ygU22zFJWFRzrEgQjVgei8HIBMb";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    settings:{
      optimizer:{
        enabled:true,
        runs:100
      },
      viaIR:true
    }
  },
  networks:{
    mumbai:{
        url:API_URL,
        accounts:[`0x25ca3470c2f693e670b6043a1816782ab53c3bae6232fc02e2777a78cba64816`]
    }
  },
  paths: {
    artifacts: './src/artifacts',
  },
};