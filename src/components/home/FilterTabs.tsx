
import React from 'react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

const FilterTabs = ({ options, activeId, onChange }: FilterTabsProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeId === option.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
