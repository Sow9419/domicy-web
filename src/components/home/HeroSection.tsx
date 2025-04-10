
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Tag, ShoppingBag, Home, Megaphone, Briefcase, PenTool } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

interface HeroService {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  category?: string; 
  categoryIcon?: string; // Optionnel: permet de spécifier une icône personnalisée
}

interface HeroSectionProps {
  services: HeroService[];
}

const HeroSection = ({ services }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fonction pour déterminer l'icône à afficher en fonction de la catégorie
  const getCategoryIcon = (category: string, customIcon?: string) => {
    // Si une icône personnalisée est spécifiée, on l'utilise
    if (customIcon) {
      return null; // À implémenter si besoin d'icônes personnalisées
    }
    
    // Classe commune pour toutes les icônes
    const iconClass = "h-5 w-5 text-white drop-shadow-glow";
    
    // Sinon, on choisit une icône en fonction de la catégorie
    switch(category.toLowerCase()) {
      case 'nettoyage':
        return <Home className={iconClass} />;
      case 'marketing':
        return <Megaphone className={iconClass} />;
      case 'publicité':
        return <PenTool className={iconClass} />;
      case 'immobilier':
        return <Home className={iconClass} />;
      case 'services':
        return <Briefcase className={iconClass} />;
      case 'shopping':
        return <ShoppingBag className={iconClass} />;
      default:
        return <Tag className={iconClass} />;
    }
  };
  
  // Function to display position indicators (dots)
  const renderDots = () => {
    return (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-10">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.7)]' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            aria-label={`Aller au service ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Autoplay plugin configuration
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );
  
  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", damping: 25 } }
  };
  
  // Animation variants for category badge
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 200 } }
  };
  
  // Animation variants for image
  const imageVariants = {
    initial: { scale: 1.1, filter: "brightness(0.9)" },
    animate: (isActive: boolean) => ({
      scale: isActive ? 1.05 : 1.1,
      filter: isActive ? "brightness(1)" : "brightness(0.9)",
      transition: { duration: 8, ease: "easeInOut", type: "tween" }
    })
  };

  // Ajout d'un effet CSS pour le drop shadow des icônes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .drop-shadow-glow {
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
      }
      
      .hero-gradient-overlay {
        background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%);
        backdrop-filter: blur(2px);
      }
      
      .glass-effect {
        background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.18);
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="relative rounded-2xl overflow-hidden my-8 group shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500">
      <Carousel 
        className="w-full" 
        opts={{ 
          loop: true, 
          startIndex: currentIndex,
          dragFree: false,
          align: "center",
          skipSnaps: false
        }} 
        plugins={[autoplayPlugin as any]}
        setApi={(api) => {
          if (api) {
            api.on('select', () => {
              setCurrentIndex(api.selectedScrollSnap());
            });
          }
        }}
      >
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[75vh]">
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    custom={index === currentIndex}
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    loading="eager"
                    key={`img-${index}`}
                  />
                  <div className="absolute inset-0 hero-gradient-overlay" />
                </div>
                
                <motion.div 
                  className="relative px-8 py-12 md:py-20 md:px-16 max-w-2xl h-full flex flex-col justify-center"
                  initial="hidden"
                  animate={index === currentIndex ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  transition={{ duration: 0.5 }}
                  key={`content-${index}`}
                >
                  {service.category && (
                    <motion.span 
                      className="inline-flex items-center gap-3 glass-effect text-white text-sm font-medium px-6 py-3 rounded-full mb-8 shadow-lg hover:scale-105 transition-all duration-300"
                      variants={badgeVariants}
                      transition={{ delay: 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.92 }}
                    >
                      {getCategoryIcon(service.category, service.categoryIcon)}
                      <span className="font-semibold tracking-wide text-base">{service.category}</span>
                    </motion.span>
                  )}
                  
                  <motion.h1 
                    className="text-white text-3xl md:text-5xl xl:text-6xl font-bold mb-5 leading-tight tracking-tight"
                    variants={contentVariants}
                    transition={{ delay: 0.3 }}
                  >
                    {service.title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-white/95 text-base md:text-lg mb-8 max-w-md leading-relaxed"
                    variants={contentVariants}
                    transition={{ delay: 0.5 }}
                  >
                    {service.description}
                  </motion.p>
                  
                  <motion.div
                    variants={contentVariants}
                    transition={{ delay: 0.7 }}
                  >
                    <Link 
                      to={service.id ? `/service/${service.id}` : service.buttonLink}
                      className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl self-start transform hover:-translate-y-2 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        {service.buttonText || "En savoir plus"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 h-14 w-14 border-2 border-white/20 glass-effect hover:border-white/40 hover:scale-110 transform -translate-y-1/2">
          <ChevronLeft className="h-7 w-7 text-white drop-shadow-glow" />
        </CarouselPrevious>
        <CarouselNext className="right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 h-14 w-14 border-2 border-white/20 glass-effect hover:border-white/40 hover:scale-110 transform -translate-y-1/2">
          <ChevronRight className="h-7 w-7 text-white drop-shadow-glow" />
        </CarouselNext>
      </Carousel>
      {renderDots()}
    </div>
  );
};

export default HeroSection;
