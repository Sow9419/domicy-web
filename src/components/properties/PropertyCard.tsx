
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  imageUrl: string;
  isAvailable?: boolean;
  isFavorite?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  currency,
  period,
  rating,
  imageUrl,
  isAvailable = true,
  isFavorite = false
}: PropertyProps) => {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <button 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>
        
        {isAvailable && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Disponible
          </div>
        )}
      </div>
      
      <Link to={`/propriete/${id}`} className="block p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-800 font-medium">{rating}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {location}
        </p>
        
        <p className="mt-2 font-medium">
          {price.toLocaleString()} {currency}
          <span className="text-gray-500 font-normal">/{period}</span>
        </p>
      </Link>
    </div>
  );
};

export default PropertyCard;
