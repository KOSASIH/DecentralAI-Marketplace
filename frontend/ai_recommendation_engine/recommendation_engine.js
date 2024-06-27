// recommendation_engine.js
import { useState, useEffect } from 'react';
import * as brain from 'brain.js';

const RecommendationEngine = () => {
  const [userInteractions, setUserInteractions] = useState([]);
  const [recommendedModels, setRecommendedModels] = useState([]);
  const net = new brain.NeuralNetwork();

  useEffect(() => {
    const trainNetwork = async () => {
      const interactions = await fetch('/api/user_interactions');
      const trainingData = interactions.map((interaction) => {
        return {
          input: interaction.model_id,
          output: interaction.rating,
        };
      });
      net.train(trainingData);
    };
    trainNetwork();
  }, []);

  const handleGetRecommendations = async () => {
    const userId = '0x...userAddress...';
    const userInteractions = await fetch(`/api/user_interactions?user_id=${userId}`);
    const recommendedModels = [];
    userInteractions.forEach((interaction) => {
      const output = net.run(interaction.model_id);
      recommendedModels.push({ model_id: interaction.model_id, rating: output });
    });
    setRecommendedModels(recommendedModels);
  };

  return (
    <div>
      <button onClick={handleGetRecommendations}>Get Recommendations</button>
      <ul>
        {recommendedModels.map((model, index) => (
          <li key={index}>{model.model_id} - Rating: {model.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationEngine;
