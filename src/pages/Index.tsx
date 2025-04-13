
import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import PropertySection from '@/components/home/PropertySection';
import PropertyStorieSection from '@/components/properties/PropertyStorie';
import FeatureCard from '@/components/home/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProperties } from '@/hooks/useProperties';
import { useServices } from '@/hooks/useServices';


const Index = () => {
  const isMobile = useIsMobile();
  const { getAllProperties, toggleFavorite } = useProperties();
  const { getHeroServices, getFeatureCards } = useServices();
  const allProperties = getAllProperties();
  const heroServices = getHeroServices();
  const featureCards = getFeatureCards();
  
  // Sélectionner 4 propriétés pour les recommandations
  const recommendedProperties = allProperties.slice(0, 4);
  
  // Sélectionner les propriétés pour les hôtes vérifiés (utilisons celles avec index 4-13)
  const verifiedProperties = allProperties.slice(4);
  
  // Gérer le basculement des favoris
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-8">
      <HeroSection services={heroServices} />
      
      <div className="mt-2">
        <PropertyStorieSection 
          title="Les hôtes vérifiés"
          properties={verifiedProperties}
          viewAllLink="/hotes-verifies"
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div className="mt-2">
        <PropertySection 
          title="Recommandés pour vous"
          properties={recommendedProperties.map(p => ({ ...p }))}
          viewAllLink="/explorer"
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      
      <div className="mt-10 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Nos services</h2>
        {isMobile ? (
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4 w-max">
              {featureCards.map((card, index) => (
                <div key={card.id || index} className="w-[280px] flex-shrink-0">
                  <FeatureCard 
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    linkUrl={card.linkUrl}
                    buttonText={card.buttonText}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card, index) => (
              <FeatureCard 
                key={card.id || index}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                linkUrl={card.linkUrl}
                buttonText={card.buttonText}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
