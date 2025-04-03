
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, ArrowUpRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  images?: string[];
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
  isFavorite: initialIsFavorite = false,
  images
}: PropertyProps) => {
  const allImages = images || [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showFavNotification, setShowFavNotification] = useState(false);

  // Automatic carousel function
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allImages.length]);

  // Functions to navigate through images
  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // Fonction pour ajouter/retirer des favoris
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
    
    // Afficher la notification
    setShowFavNotification(true);
    
    // Masquer la notification après 2 secondes
    setTimeout(() => {
      setShowFavNotification(false);
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md group">
      {/* Image Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        {allImages.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`${title} - image ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
        ))}
        
        {/* Top Bar with Available/Rating */}
        <div className="absolute left-3 top-3 flex items-center bg-black/70 backdrop-blur-sm rounded-md px-2 py-1 text-white text-xs">
          {isAvailable && (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              <span className="font-medium">Disponible</span>
              <span className="mx-1">•</span>
            </>
          )}
          <div className="flex items-center">
            <Star size={12} className="text-yellow-500 mr-1" />
            <span>{rating} Notation</span>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button 
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:bg-white"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
        
        {/* Favorite Notification */}
        <div 
          className={`absolute right-3 top-12 bg-black/70 text-white text-xs px-3 py-2 rounded-lg transform transition-all duration-300 z-20 ${
            showFavNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          {isFavorite ? 'Ajouté aux favoris' : 'Retiré des favoris'}
        </div>
        
        {/* Price Tag - Only visible on hover */}
        <div className="absolute top-14 left-0 bg-white py-1 px-3 shadow-md rounded-r-full opacity-0 group-hover:opacity-100 transform transition-opacity duration-300">
          <span className="text-gray-900 font-bold">{price.toLocaleString()} {currency}</span>
          <span className="text-gray-600 text-xs">/{period}</span>
        </div>
        
        {/* Carousel Navigation - Only visible on hover and when multiple images */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 duration-300"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 duration-300"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}
        
        {/* Carousel Indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1">
            {allImages.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-green-500' : 'bg-gray-300/70'
                }`}
              ></div>
            ))}
          </div>
        )}
        
        {/* Bottom dark gradient for text visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Link Button */}
        <Link
          to={`/propriete/${id}`}
          className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-gray-50"
          aria-label="Voir les détails"
        >
          <ArrowUpRight size={16} className="text-gray-700" />
        </Link>
      </div>
      
      {/* Card Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
          <MapPin size={14} className="text-gray-500" />
          {location}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
