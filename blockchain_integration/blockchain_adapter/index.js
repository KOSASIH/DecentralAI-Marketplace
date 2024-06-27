// blockchain_adapter/index.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

const blockchainAdapter = {
  async buyAiModel(aiModelId, userId) {
    const contractAddress = '0x...';
    const contractABI = [...];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.buyAiModel(aiModelId, userId).send({ from: userId });
  },

  async sellAiModel(aiModelId, userId) {
    const contractAddress = '0x...';
    const contractABI = [...];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.sellAiModel(aiModelId, userId).send({ from: userId });
  },
};

module.exports = blockchainAdapter;
