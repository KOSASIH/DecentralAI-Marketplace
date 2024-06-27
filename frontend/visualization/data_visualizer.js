// data_visualizer.js
import { useState, useEffect } from 'react';
import * as d3 from 'd3-array';
import WebSocket from 'ws';

const DataVisualizer = () => {
  const [data, setData] = useState([]);
  const ws = new WebSocket('wss://example.com/ws');

  useEffect(() => {
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, ...newData]);
    };
  }, []);

  const handleDrawChart = () => {
    const chartData = data.map((datum) => {
      return {
        x: datum.timestamp,
        y: datum.value,
      };
    });
    const svg = d3.select('svg');
    svg.selectAll('circle')
      .data(chartData)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 5);
  };

  return (
    <div>
      <svg width="800" height="600"></svg>
      <button onClick={handleDrawChart}>Draw Chart</button>
    </div>
  );
};

export default DataVisualizer;
