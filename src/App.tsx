import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchFilters } from './components/SearchFilters';
import { ModelCard } from './components/ModelCard';
import { SavedList } from './components/SavedList';
import { filterSections } from './data/filterSections';
import { useModels } from './hooks/useModels';
import { Model } from './types';

export default function App() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    isLoading, 
    error, 
    results, 
    savedModels,
    searchModels,
    saveModel,
    removeModel
  } = useModels();

  const handleFilterChange = (section: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [section]: prev[section] ? 
        prev[section].includes(value) ?
          prev[section].filter(v => v !== value) :
          [...prev[section], value] :
        [value]
    }));
  };

  const handleSearch = () => {
    searchModels(searchQuery, activeFilters);
  };

  const handleSaveModel = async (model: Model) => {
    try {
      await saveModel(model);
      toast.success('モデルを保存しました / Model saved successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '保存に失敗しました / Failed to save model');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <Sparkles className="w-8 h-8" />
            <h1>Civitai Model Search</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="検索キーワード / Search keywords..."
                    className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                >
                  <span>検索 / Search</span>
                  {isLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">フィルター / Filters</h2>
              <SearchFilters 
                sections={filterSections} 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
                  <p className="mt-4 text-gray-600">検索中... / Searching...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12 text-red-600">
                  {error}
                </div>
              ) : results.length > 0 ? (
                results.map(model => (
                  <ModelCard 
                    key={model.id} 
                    model={model} 
                    onSave={handleSaveModel}
                    isSaved={savedModels.some(m => m.id === model.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-600 text-lg">
                    検索結果がありません / No results found
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <SavedList
              models={savedModels}
              onRemove={removeModel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}