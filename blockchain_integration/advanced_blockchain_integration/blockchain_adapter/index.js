// blockchain_adapter/index.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

const blockchainAdapter = {
  async getAiModels() {
    const contractAddress = '0x...';
    const contractABI = [...];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const aiModels = await contract.methods.getAiModels().call();
    return aiModels;
  },

  async getAiModel(aiModelId) {
    const contractAddress = '0x...';
    const contractABI = [...];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const aiModel = await contract.methods.getAiModel(aiModelId).call();
    return aiModel;
  },

  async purchaseAiModel(aiModelId, purchasePrice) {
    const contractAddress = '0x...';
    const contractABI = [...];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.purchaseAiModel(aiModelId).send({ from: web3.eth.accounts[0], value: purchasePrice });
  },
};

module.exports = blockchainAdapter;
