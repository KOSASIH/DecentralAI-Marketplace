// marketplace_api/ApiClient.js
const axios = require('axios');

class ApiClient {
  static async getAiModels() {
    const response = await axios.get('https://data-storage.com/ai-models');
    return response.data;
  }

  static async getAiModel(aiModelId) {
    const response = await axios.get(`https://data-storage.com/ai-models/${aiModelId}`);
    return response.data;
  }

  static async getAiModelPerformanceMetrics(aiModelId) {
    const response = await axios.get(`https://data-storage.com/ai-models/${aiModelId}/performance-metrics`);
    return response.data;
  }

  static async buyAiModel(aiModelId, userId) {
    const response = await axios.post('https://blockchain-adapter.com/buy-ai-model', { aiModelId, userId });
    return response.data;
  }

  static async sellAiModel(aiModelId, userId) {
    const response = await axios.post('https://blockchain-adapter.com/sell-ai-model', { aiModelId, userId });
    return response.data;
  }
}

module.exports = ApiClient;
