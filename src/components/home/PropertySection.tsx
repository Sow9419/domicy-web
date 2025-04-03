
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard, { PropertyProps } from '../properties/PropertyCard';

interface PropertySectionProps {
  title: string;
  properties: PropertyProps[];
  viewAllLink: string;
}

const PropertySection = ({ title, properties, viewAllLink }: PropertySectionProps) => {
  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link to={viewAllLink} className="text-primary font-medium text-sm">
          Voir tout
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};

export default PropertySection;
