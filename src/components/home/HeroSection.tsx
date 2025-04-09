
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HeroService {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  category?: string; 
}

interface HeroSectionProps {
  services: HeroService[];
}

const HeroSection = ({ services }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to display position indicators (dots)
  const renderDots = () => {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-110 shadow-md' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Aller au service ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Autoplay plugin configuration
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  return (
    <div className="relative rounded-xl overflow-hidden my-6 group shadow-lg">
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
              <div className="relative rounded-xl overflow-hidden h-[350px] md:h-[70vh]">
                <div className="absolute inset-0">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>
                
                <div className="relative px-6 py-10 md:py-16 md:px-12 max-w-2xl h-full flex flex-col justify-center">
                  {service.category && (
                    <span className="inline-block bg-primary/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
                      {service.category}
                    </span>
                  )}
                  
                  <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {service.title}
                  </h1>
                  
                  <p className="text-white/90 text-base md:text-lg mb-8 max-w-md">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={service.id ? `/service/${service.id}` : service.buttonLink}
                    className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg self-start"
                  >
                    {service.buttonText || "En savoir plus"}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
