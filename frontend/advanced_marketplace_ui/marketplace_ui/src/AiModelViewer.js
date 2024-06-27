// marketplace_ui/src/AiModelViewer.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../web3/useWeb3';

const AiModelViewer = ({ aiModel, web3 }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [purchasePrice, setPurchasePrice] = useState(0);

  useEffect(() => {
    if (web3) {
      const contractAddress = '0x...';
      const contractABI = [...];
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      contract.methods.getAiModelPerformanceMetrics(aiModel.id).call().then(metrics => {
        setPerformanceMetrics(metrics);
      });
      contract.methods.getAiModelPurchasePrice(aiModel.id).call().then(price => {
        setPurchasePrice(price);
      });
    }
  }, [web3, aiModel]);

  const handlePurchase = () => {
    if (web3) {
      const contractAddress = '0x...';
      const contractABI = [...];
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      contract.methods.purchaseAiModel(aiModel.id).send({ from: web3.eth.accounts[0], value: purchasePrice });
    }
  };

  return (
    <div>
      <h1>{aiModel.name}</h1>
      <p>{aiModel.description}</p>
      <h2>Performance Metrics</h2>
      <ul>
        {Object.keys(performanceMetrics).map((key, index) => (
          <li key={index}>{key}: {performanceMetrics[key]}</li>
        ))}
      </ul>
      <button onClick={handlePurchase}>Purchase for {purchasePrice} ETH</button>
    </div>
  );
};

export default AiModelViewer;
