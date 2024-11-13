import React from 'react';
import { FilterSection } from '../types';
import { ChevronDown } from 'lucide-react';

interface SearchFiltersProps {
  sections: FilterSection[];
  onFilterChange: (section: string, value: string) => void;
  activeFilters: Record<string, string[]>;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  sections, 
  onFilterChange,
  activeFilters 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sections.map((section) => (
        <details key={section.title} className="bg-gray-50 rounded-lg p-4">
          <summary className="flex items-center justify-between cursor-pointer">
            <span className="font-medium">{section.title} / {section.titleEn}</span>
            <ChevronDown className="w-5 h-5 transform transition-transform" />
          </summary>
          <div className="mt-4 space-y-2">
            {section.options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={activeFilters[section.title]?.includes(option.value) || false}
                  onChange={() => onFilterChange(section.title, option.value)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option.label} / {option.labelEn}</span>
              </label>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};