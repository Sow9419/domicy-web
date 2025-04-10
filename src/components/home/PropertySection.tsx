
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../properties/PropertyCard';
import { PropertyType } from '@/hooks/useProperties';

interface PropertySectionProps {
  title: string;
  properties: PropertyType[];
  viewAllLink: string;
  onToggleFavorite?: (id: string) => void;
}

const PropertySection = ({ title, properties, viewAllLink, onToggleFavorite }: PropertySectionProps) => {
  return (
    <section className="py-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link to={viewAllLink} className="text-primary font-medium text-sm">
          Voir tout
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
