// marketplace_api/index.js
const express = require('express');
const app = express();
const ApiClient = require('./ApiClient');

app.use(express.json());

app.get('/ai-models', async (req, res) => {
  const aiModels = await ApiClient.getAiModels();
  res.json(aiModels);
});

app.get('/ai-model/:id', async (req, res) => {
  const aiModel = await ApiClient.getAiModel(req.params.id);
  res.json(aiModel);
});

app.get('/ai-model/:id/performance-metrics', async (req, res) => {
  const performanceMetrics = await ApiClient.getAiModelPerformanceMetrics(req.params.id);
  res.json(performanceMetrics);
});

app.post('/buy-ai-model', async (req, res) => {
  const { aiModelId, userId } = req.body;
  await ApiClient.buyAiModel(aiModelId, userId);
  res.json({ message: 'AI model purchased successfully' });
});

app.post('/sell-ai-model', async (req, res) => {
  const { aiModelId, userId } = req.body;
  await ApiClient.sellAiModel(aiModelId, userId);
  res.json({ message: 'AI model sold successfully' });
});

app.listen(3000, () => {
  console.log('Marketplace API listening on port 3000');
});
