
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
}

const PropertyImageCarousel = ({ images, title }: PropertyImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative">
      <div className="w-full h-[350px] md:h-[400px] relative">
        {images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`${title} - image ${index + 1}`} 
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        
        <button 
          onClick={goToPreviousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 z-10"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <button 
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 z-10"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 z-10">
          {images.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyImageCarousel;
