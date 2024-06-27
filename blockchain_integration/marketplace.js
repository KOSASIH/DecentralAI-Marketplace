// marketplace.js
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { AIModelOwnership } from "./AIModelOwnership.sol";

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID"));

const marketplace = () => {
  const [aiModels, setAIModels] = useState([]);
  const [selectedAIModel, setSelectedAIModel] = useState(null);

  useEffect(() => {
    const fetchAIModels = async () => {
      const aiModelOwnershipContract = new web3.eth.Contract(AIModelOwnership.abi, AIModelOwnership.address);
      const aiModels = await aiModelOwnershipContract.methods.getAIModels().call();
      setAIModels(aiModels);
    };
    fetchAIModels();
  }, []);

  const handleSelectAIModel = (aiModelId) => {
    setSelectedAIModel(aiModels.find((aiModel) => aiModel.id === aiModelId));
  };

  const handleLicenseAIModel = async () => {
    if (!selectedAIModel) return;
    const aiModelOwnershipContract = new web3.eth.Contract(AIModelOwnership.abi, AIModelOwnership.address);
    const license = {
      licensee: web3.eth.accounts[0],
      expirationDate: Date.now() + 31536000000, // 1 year
      royaltyRate: 10,
    };
    await aiModelOwnershipContract.methods.licenseAIModel(selectedAIModel.id, license).send({ from: web3.eth.accounts[0] });
  };

  return (
    <div>
      <h1>Decentralized AI Model Marketplace</h1>
      <ul>
        {aiModels.map((aiModel) => (
          <li key={aiModel.id}>
            <span>{aiModel.name}</span>
            <button onClick={() => handleSelectAIModel(aiModel.id)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedAIModel && (
        <div>
          <h2>{selectedAIModel.name}</h2>
          <button onClick={handleLicenseAIModel}>License</button>
        </div>
      )}
    </div>
  );
};

export default marketplace;
