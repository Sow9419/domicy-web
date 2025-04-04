
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HeroService {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSectionProps {
  services: HeroService[];
}

const HeroSection = ({ services }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fonction pour afficher les indicateurs de position (points)
  const renderDots = () => {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
            aria-label={`Aller au service ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Configuration du plugin d'autoplay
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  return (
    <div className="relative rounded-xl overflow-hidden my-4 group">
      <Carousel 
        className="w-full" 
        opts={{ loop: true, startIndex: currentIndex }} 
        plugins={[autoplayPlugin as any]}
        setApi={(api) => {
          api?.on('select', () => {
            setCurrentIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[85vh]">
                <div className="absolute inset-0">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>
                
                <div className="relative px-6 py-10 md:py-16 md:px-10 max-w-2xl h-full flex flex-col justify-center">
                  <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">{service.title}</h1>
                  <p className="text-white/90 mb-6 max-w-md">{service.description}</p>
                  <Link 
                    to={service.buttonLink}
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors self-start"
                  >
                    {service.buttonText}
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CarouselNext className="right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Carousel>
      {renderDots()}
    </div>
  );
};

export default HeroSection;
