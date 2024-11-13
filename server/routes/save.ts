import { Router } from 'express';
import { saveModelToSheet } from '../services/sheetService';
import { Model } from '../../src/types';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { model } = req.body as { model: Model };
    
    if (!model) {
      return res.status(400).json({ 
        error: 'モデルデータが必要です / Model data is required' 
      });
    }

    await saveModelToSheet(model);

    res.json({ 
      success: true,
      message: 'モデルを保存しました / Model saved successfully'
    });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({
      error: '保存に失敗しました / Failed to save model'
    });
  }
});

export { router as saveRouter };