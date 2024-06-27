import express from 'express';
import { AIModel } from '../ai-models/AIModel';

const router = express.Router();

router.post('/ai-models', async (req, res) => {
    const { name, description, price } = req.body;
    const aiModel = new AIModel(name, description, price, req.user.address);
    await aiModel.register();
    res.json({ message: 'AI model registered successfully' });
});

export default router;
