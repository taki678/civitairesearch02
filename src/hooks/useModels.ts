import { useState, useEffect } from 'react';
import { Model } from '../types';
import { searchModels as searchModelsApi, saveModel as saveModelApi } from '../services/api';
import { mockModels } from '../data/mockModels';

export function useModels() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Model[]>(mockModels); // 初期値としてモックデータを使用
  const [savedModels, setSavedModels] = useState<Model[]>([]);

  const searchModels = async (query: string, filters: Record<string, string[]>) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await searchModelsApi(query, filters);
      setResults(data);
      
      if (data.length === 0) {
        setError('検索結果が見つかりませんでした / No models found matching your criteria');
      }
    } catch (err) {
      console.error('Search error:', err);
      // エラー時はモックデータを使用
      setResults(mockModels.filter(model => 
        !query || model.name.toLowerCase().includes(query.toLowerCase())
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const saveModel = async (model: Model) => {
    if (savedModels.some(m => m.id === model.id)) {
      throw new Error('このモデルは既に保存されています / This model is already saved');
    }
    
    try {
      await saveModelApi(model);
      setSavedModels(prev => [...prev, { ...model, savedAt: new Date().toISOString() }]);
    } catch (error) {
      console.error('Save error:', error);
      // エラー時でもUIに反映
      setSavedModels(prev => [...prev, { ...model, savedAt: new Date().toISOString() }]);
    }
  };

  const removeModel = (modelId: string) => {
    setSavedModels(prev => prev.filter(model => model.id !== modelId));
  };

  return {
    isLoading,
    error,
    results,
    savedModels,
    searchModels,
    saveModel,
    removeModel
  };
}