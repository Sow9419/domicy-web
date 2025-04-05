
import React from 'react';
import { Heart, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyProps } from './PropertyCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface PropertyStorieProps {
  property: PropertyProps;
}

const PropertyStorie = ({ property }: PropertyStorieProps) => {
  const [isFavorite, setIsFavorite] = React.useState(property.isFavorite);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link 
      to={`/propriete/${property.id}`}
      className="relative min-w-[180px] w-[180px] h-[280px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm"
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
      </div>
      
      {/* Favorite Button */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm"
      >
        <Heart 
          size={18} 
          className={isFavorite ? "text-red-500" : "text-white"} 
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="text-sm font-medium line-clamp-1">{property.title}</h3>
        <div className="flex items-center space-x-1 mt-1">
          <MapPin size={12} />
          <p className="text-xs line-clamp-1">{property.location}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs">
            <span className="font-bold">{property.price.toLocaleString()}</span>
            <span> {property.currency}/{property.period}</span>
          </div>
          <div className="flex items-center">
            <Star size={12} fill="currentColor" className="text-yellow-500" />
            <span className="text-xs ml-1">{property.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PropertyStorieSection = ({ 
  title, 
  properties, 
  viewAllLink 
}: { 
  title: string; 
  properties: PropertyProps[];
  viewAllLink: string;
}) => {
  return (
    <section className="py-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link to={viewAllLink} className="text-primary font-medium text-sm">
          Voir tout
        </Link>
      </div>
      
      <div className="relative">
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4">
            {properties.map((property) => (
              <PropertyStorie key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyStorieSection;
