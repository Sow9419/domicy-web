
import React from 'react';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ServiceCategoryFormProps {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

const ServiceCategoryForm: React.FC<ServiceCategoryFormProps> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  // Mock categories
  const categories: Category[] = [
    { id: 'cleaning', name: 'Nettoyage', icon: '🧹' },
    { id: 'plumbing', name: 'Plomberie', icon: '🔧' },
    { id: 'electrical', name: 'Électricité', icon: '💡' },
    { id: 'moving', name: 'Déménagement', icon: '📦' },
    { id: 'painting', name: 'Peinture', icon: '🎨' },
    { id: 'gardening', name: 'Jardinage', icon: '🌱' },
    { id: 'security', name: 'Sécurité', icon: '🔒' },
    { id: 'decoration', name: 'Décoration', icon: '🏠' },
  ];

  return (
    <div className="p-4">
      <Label className="block mb-3">Catégorie de service</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedCategory === category.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-center">{category.name}</span>
            </div>
            {selectedCategory === category.id && (
              <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                <Check size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryForm;
