import { useState } from 'react';
import { Model } from '../types';
import { searchModels } from '../services/api';

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Model[]>([]);

  const search = async (query: string, filters: Record<string, string[]>) => {
    if (!query.trim() && Object.keys(filters).length === 0) {
      setError('検索キーワードまたはフィルターを入力してください / Please enter a search query or select filters');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await searchModels(query, filters);
      setResults(data);
      
      if (data.length === 0) {
        setError('検索結果が見つかりませんでした / No models found matching your criteria');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました / An unexpected error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    results,
    search,
  };
}