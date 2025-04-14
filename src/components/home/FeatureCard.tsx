
/**
 * FeatureCard.tsx
 * Ce fichier contient les composants pour afficher des cartes de fonctionnalités et services
 * dans l'interface utilisateur de l'application.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { HeroServiceType, FeatureCardType } from '@/hooks/useServices';
import { useServices } from '@/hooks/useServices';

/**
 * FeatureCard - Composant pour afficher une carte de fonctionnalité simple
 * avec image, titre, description et bouton d'action
 */
const FeatureCard = ({ title, description, imageUrl, linkUrl, buttonText }: FeatureCardType) => {
  return (
    <div className="relative rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-500 w-full h-[220px] md:h-[260px]">
      {/* Arrière-plan avec image et overlay */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
      </div>
      
      {/* Contenu de la carte */}
      <div className="relative p-4 md:p-5 flex flex-col h-full justify-between">
        <div className="mt-2 md:mt-4">
          <h3 className="text-white text-lg md:text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 mb-3 line-clamp-2 text-sm md:text-base">{description}</p>
        </div>
        
        {/* Bouton d'action */}
        <Link 
          to={linkUrl}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-300 self-start group-hover:translate-x-2 text-sm"
        >
          <span>{buttonText}</span>
          <ArrowRight className="ml-2 h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

/**
 * ServicesList - Composant pour afficher une liste horizontale défilable de services
 */
export const ServicesList = () => {
  // Récupération des services depuis le hook
  const { getHeroServices } = useServices();
  const services = getHeroServices();

  // Configuration des animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="mt-8 mb-12">
      {/* En-tête de la section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Nos services populaires</h2>
        <Link 
          to="/explorer" 
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
        >
          Voir tout
          <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      {/* Zone de défilement horizontal */}
      <ScrollArea orientation="horizontal" className="w-full">
        <motion.div 
          className="flex space-x-5 pb-4 px-1 pt-1 min-w-max"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id || index} 
              className="w-[280px] md:w-[320px] flex-shrink-0"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <ServiceCard 
                id={service.id}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                category={service.category || ""}
                buttonLink={service.buttonLink}
                buttonText={service.buttonText}
              />
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

/**
 * ServiceCard - Composant pour afficher une carte de service avec catégorie
 * et design moderne
 */
const ServiceCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  category, 
  buttonLink, 
  buttonText 
}: HeroServiceType) => {
  return (
    <div className="relative rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-500 h-[220px] md:h-[240px] w-full">
      {/* Image d'arrière-plan avec effet de zoom au survol */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
      </div>
      
      {/* Contenu de la carte */}
      <div className="relative p-4 flex flex-col h-full justify-center">
        {/* Badge de catégorie */}
        {category && (
          <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
            {category}
          </span>
        )}
        
        {/* Titre et description */}
        <div className="mt-5 md:mt-6">
          <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-white/90 mb-3 line-clamp-2 text-sm md:text-base">{description}</p>
        </div>
        
        {/* Bouton d'action */}
        <Link
          to={id ? `/service/${id}` : buttonLink}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-300 self-start group-hover:translate-x-2 text-sm"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-3 w-3 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
