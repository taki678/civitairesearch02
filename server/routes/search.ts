import { Router } from 'express';
import { searchModels } from '../services/modelService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { query, filters } = req.body;
    const results = await searchModels(query, filters);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: '検索中にエラーが発生しました / Error occurred during search'
    });
  }
});

export { router as searchRouter };