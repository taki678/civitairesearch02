import React from 'react';
import { Check, X, ExternalLink, Save, Info } from 'lucide-react';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
  onSave: (model: Model) => void;
  isSaved: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onSave, isSaved }) => {
  const LicenseIcon = ({ allowed, label }: { allowed: boolean; label: string }) => (
    <div className="flex items-center gap-2 text-sm">
      <div className={`flex items-center justify-center w-5 h-5 rounded-full ${
        allowed 
          ? 'bg-green-100 text-green-600' 
          : 'bg-red-100 text-red-600'
      }`}>
        {allowed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      </div>
      <span className="text-gray-600">{label}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video">
        <img 
          src={model.imageUrl} 
          alt={model.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {model.modelType}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{model.name}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1">
            {model.baseModel}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-1">
              <Info className="w-4 h-4" />
              使用許可 / Permissions
            </h4>
            <div className="space-y-2">
              <LicenseIcon 
                allowed={model.license.allowNoCredit} 
                label="クレジット表記不要 / No Credit Required" 
              />
              <LicenseIcon 
                allowed={model.license.allowCommercialUse} 
                label="商用利用可能 / Commercial Use" 
              />
              <LicenseIcon 
                allowed={model.license.allowDerivatives} 
                label="派生作品許可 / Derivatives" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <a
              href={model.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              <span>View on Civitai</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onSave(model)}
              disabled={isSaved}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isSaved 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'}`}
            >
              <Save className="w-4 h-4" />
              {isSaved ? '保存済み / Saved' : '保存 / Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};