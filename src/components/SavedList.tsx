import React from 'react';
import { Model } from '../types';
import { Trash2, Calendar } from 'lucide-react';

interface SavedListProps {
  models: Model[];
  onRemove: (modelId: string) => void;
}

export const SavedList: React.FC<SavedListProps> = ({ models, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <span>保存したモデル / Saved Models</span>
        <span className="text-sm text-gray-500">{models.length}件</span>
      </h2>

      {models.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>保存したモデルはありません</p>
          <p className="text-sm">No saved models yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {models.map((model) => (
            <div 
              key={model.id} 
              className="flex flex-col gap-2 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-600">{model.modelType}</p>
                </div>
                <button
                  onClick={() => onRemove(model.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                  title="削除 / Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {model.savedAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={model.savedAt}>
                    {new Date(model.savedAt).toLocaleString()}
                  </time>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};