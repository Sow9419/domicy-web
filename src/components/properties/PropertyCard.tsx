
import React from 'react';
import { Heart, ArrowUpRight, MapPin } from 'lucide-react';
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
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-xs font-medium text-white flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Disponible</span>
            <span className="mx-1">•</span>
            <span className="flex items-center">
              <span className="mr-1">★</span>{rating}
            </span>
          </div>
        )}
        
        <Link 
          to={`/propriete/${id}`} 
          className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm"
          aria-label="Voir les détails"
        >
          <ArrowUpRight size={16} className="text-gray-700" />
        </Link>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
          <MapPin size={14} className="text-gray-500" />
          {location}
        </p>
        
        <p className="mt-2 font-medium">
          {price.toLocaleString()} {currency}
          <span className="text-gray-500 font-normal">/{period}</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
