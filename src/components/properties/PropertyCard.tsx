
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, ArrowUpRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyType } from '@/hooks/useProperties';

interface PropertyCardProps {
  property: PropertyType;
  onToggleFavorite?: (id: string) => void;
}

const PropertyCard = ({ property, onToggleFavorite }: PropertyCardProps) => {
  const {
    id,
    title,
    location,
    price,
    currency,
    period,
    rating,
    imageUrl,
    isAvailable = true,
    isFavorite = false,
    images
  } = property;
  
  const allImages = images || [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const [showFavNotification, setShowFavNotification] = useState(false);

  // Synchroniser l'état local avec les props
  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

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
    
    // Mettre à jour l'état local
    setLocalIsFavorite(!localIsFavorite);
    
    // Appeler la fonction de callback si elle existe
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
    
    // Afficher la notification
    setShowFavNotification(true);
    
    // Masquer la notification après 2 secondes
    setTimeout(() => {
      setShowFavNotification(false);
    }, 2000);
  };

  return (
    <div className="relative w-66 h-80 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      {/* Image Carousel */}
      <div className="absolute inset-0 bg-gray-200">
        {allImages.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`${title} - image ${index + 1}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
        ))}
        
        {/* Price Tag - Only visible on hover */}
        <div className="absolute top-14 left-0 bg-white py-1 px-3 shadow-md rounded-r-full opacity-0 group-hover:opacity-100 transform translate-x-0 transition-opacity duration-300">
          <span className="text-gray-900 font-bold">{price.toLocaleString()} {currency}</span>
          <span className="text-gray-600 text-xs">/{period}</span>
        </div>
        
        {/* Carousel Navigation - Only visible on hover */}
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
      </div>
      
      {/* Overlay for text visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/30 to-transparent" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center">
        <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
          <div className="bg-gray-200 rounded-full p-1 mr-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-xs font-bold">m²</span>
            </div>
          </div>
          <div className="flex flex-col">
            {isAvailable && (
              <span className="text-xs font-medium text-green-600">Disponible</span>
            )}
            <div className="flex items-center">
              <Star size={12} fill="currentColor" className="text-gray-700" />
              <span className="text-xs ml-1">{rating} Notation</span>
            </div>
          </div>
        </div>
        <button 
          className="bg-white/90 rounded-full p-2 transition-all hover:bg-white hover:shadow-md"
          onClick={toggleFavorite}
          aria-label={localIsFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart 
            size={20} 
            className={localIsFavorite ? "text-red-500" : "text-gray-700"}
            fill={localIsFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
      
      {/* Notification de favoris */}
      <div 
        className={`absolute top-16 right-2 bg-black/70 text-white text-xs px-3 py-2 rounded-lg transform transition-all duration-300 ${
          showFavNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        {localIsFavorite ? 'Ajouté aux favoris' : 'Retiré des favoris'}
      </div>
      
      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm flex items-center gap-1 opacity-90">
          <MapPin size={14} className="text-white" />
          {location}
        </p>
      </div>
      
      {/* Carousel Indicators */}
      {allImages.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-1">
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
      
      {/* Link Button */}
      <Link
        to={`/propriete/${id}`}
        className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-gray-50"
        aria-label="Voir les détails"
      >
        <ArrowUpRight size={20} className="text-gray-700" />
      </Link>
    </div>
  );
};

export default PropertyCard;
