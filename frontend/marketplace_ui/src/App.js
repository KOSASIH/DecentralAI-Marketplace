// marketplace_ui/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AiModelViewer } from './AiModelViewer';
import { MarketplaceHeader } from './MarketplaceHeader';
import { MarketplaceFooter } from './MarketplaceFooter';
import { ApiClient } from '../api/ApiClient';

function App() {
  const [aiModels, setAiModels] = useState([]);
  const [selectedAiModel, setSelectedAiModel] = useState(null);

  useEffect(() => {
    ApiClient.getAiModels().then(response => {
      setAiModels(response.data);
    });
  }, []);

  const handleAiModelSelect = (aiModel) => {
    setSelectedAiModel(aiModel);
  };

  return (
    <BrowserRouter>
      <MarketplaceHeader />
      <Switch>
        <Route path="/" exact>
          <AiModelList aiModels={aiModels} onSelect={handleAiModelSelect} />
        </Route>
        <Route path="/ai-model/:id">
          <AiModelViewer aiModel={selectedAiModel} />
        </Route>
      </Switch>
      <MarketplaceFooter />
    </BrowserRouter>
  );
}

export default App;
