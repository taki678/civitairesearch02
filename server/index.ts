import express from 'express';
import cors from 'cors';
import { Model } from '../src/types';
import { mockModels } from '../src/data/mockModels';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// インメモリストレージ（開発用）
const savedModels: Model[] = [];

app.post('/api/search', (req, res) => {
  try {
    const { query, filters } = req.body;
    let results = [...mockModels];

    // テキスト検索
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(model =>
        searchTerms.every(term =>
          model.name.toLowerCase().includes(term) ||
          model.modelType.toLowerCase().includes(term) ||
          model.baseModel.toLowerCase().includes(term)
        )
      );
    }

    // フィルター適用
    if (Object.keys(filters).length > 0) {
      results = results.filter(model => {
        return Object.entries(filters).every(([section, values]) => {
          if (!values || values.length === 0) return true;

          switch (section) {
            case 'モデルタイプ':
              return values.some(value => model.modelType.toLowerCase() === value.toLowerCase());
            case 'ベースモデル':
              return values.some(value => model.baseModel.toLowerCase() === value.toLowerCase());
            case 'ライセンス':
              return values.every(value => {
                switch (value) {
                  case 'useWithoutCredit':
                    return model.license.allowNoCredit;
                  case 'sellImages':
                    return model.license.allowCommercialUse;
                  case 'shareMerges':
                    return model.license.allowDerivatives;
                  case 'differentPermissions':
                    return model.license.allowDifferentLicense;
                  default:
                    return true;
                }
              });
            default:
              return true;
          }
        });
      });
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: '検索中にエラーが発生しました / Error occurred during search'
    });
  }
});

app.post('/api/save', (req, res) => {
  try {
    const { model } = req.body;
    
    if (!model) {
      return res.status(400).json({ 
        error: 'モデルデータが必要です / Model data is required' 
      });
    }

    const existingIndex = savedModels.findIndex(m => m.id === model.id);
    if (existingIndex !== -1) {
      return res.status(400).json({
        error: 'このモデルは既に保存されています / This model is already saved'
      });
    }

    const savedModel = {
      ...model,
      savedAt: new Date().toISOString()
    };

    savedModels.push(savedModel);

    res.json({ 
      success: true,
      message: 'モデルを保存しました / Model saved successfully',
      model: savedModel
    });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({
      error: '保存に失敗しました / Failed to save model'
    });
  }
});

app.get('/api/saved', (req, res) => {
  res.json(savedModels);
});

app.delete('/api/saved/:id', (req, res) => {
  const { id } = req.params;
  const index = savedModels.findIndex(model => model.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      error: 'モデルが見つかりません / Model not found'
    });
  }

  savedModels.splice(index, 1);
  res.json({ 
    success: true,
    message: 'モデルを削除しました / Model removed successfully'
  });
});

app.listen(port, () => {
  console.log(`サーバーが起動しました / Server is running at http://localhost:${port}`);
});