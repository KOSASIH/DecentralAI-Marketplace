// marketplace_ui/src/AiModelViewer.js
import React from 'react';
import { ApiClient } from '../api/ApiClient';

const AiModelViewer = ({ aiModel }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState({});

  useEffect(() => {
    ApiClient.getAiModelPerformanceMetrics(aiModel.id).then(response => {
      setPerformanceMetrics(response.data);
    });
  }, [aiModel]);

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
    </div>
  );
};

export default AiModelViewer;
