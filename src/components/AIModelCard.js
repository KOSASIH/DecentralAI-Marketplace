import React from 'react';
import { AIModel } from '../ai-models/AIModel';

const AIModelCard = ({ aiModel }) => {
    return (
        <div>
            <h2>{aiModel.name}</h2>
            <p>{aiModel.description}</p>
            <p>Price: {aiModel.price} ETH</p>
            <button onClick={() => aiModel.register()}>Register</button>
        </div>
    );
};

export default AIModelCard;
