// marketplace_ui/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AiModelViewer } from './AiModelViewer';
import { MarketplaceHeader } from './MarketplaceHeader';
import { MarketplaceFooter } from './MarketplaceFooter';
import { Web3Provider } from '../web3/Web3Provider';
import { useWeb3 } from '../web3/useWeb3';

function App() {
  const [aiModels, setAiModels] = useState([]);
  const [selectedAiModel, setSelectedAiModel] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    Web3Provider.getWeb3().then(web3 => {
      setWeb3(web3);
      web3.eth.getAccounts().then(accounts => {
        setAccount(accounts[0]);
      });
    });
  }, []);

  useEffect(() => {
    if (web3) {
      const contractAddress = '0x...';
      const contractABI = [...];
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      contract.methods.getAiModels().call().then(aiModels => {
        setAiModels(aiModels);
      });
    }
  }, [web3]);

  const handleAiModelSelect = (aiModel) => {
    setSelectedAiModel(aiModel);
  };

  return (
    <BrowserRouter>
      <MarketplaceHeader account={account} />
      <Switch>
        <Route path="/" exact>
          <AiModelList aiModels={aiModels} onSelect={handleAiModelSelect} />
        </Route>
        <Route path="/ai-model/:id">
          <AiModelViewer aiModel={selectedAiModel} web3={web3} />
        </Route>
      </Switch>
      <MarketplaceFooter />
    </BrowserRouter>
  );
}

export default App;
