
import React from 'react';
import { MapPin, Star, Bed, Bath, Check } from 'lucide-react';

interface PropertyHeaderProps {
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviews: number;
  rooms: number;
  bathrooms: number;
  features: string[];
  showRating?: boolean;
}

const PropertyHeader = ({ 
  title, 
  location, 
  price, 
  currency, 
  period, 
  rating, 
  reviews,
  rooms,
  bathrooms,
  features,
  showRating = true
}: PropertyHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center mt-2 text-gray-600">
        <MapPin size={16} className="mr-1" />
        <span>{location}</span>
      </div>
      
      {showRating && (
        <div className="flex items-center justify-between mt-4 md:hidden">
          <div>
            <span className="text-2xl font-bold">{price.toLocaleString()} {currency}</span>
            <span className="text-gray-600">/{period}</span>
          </div>
          <div className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-100">
            <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews} avis)</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Bed size={20} className="text-primary mr-2" />
          <span>{rooms} chambres</span>
        </div>
        <div className="flex items-center">
          <Bath size={20} className="text-primary mr-2" />
          <span>{bathrooms} salles de bain</span>
        </div>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check size={20} className="text-primary mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyHeader;
