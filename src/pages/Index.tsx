
import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import PropertySection from '@/components/home/PropertySection';
import PropertyStorieSection from '@/components/properties/PropertyStorie';
import FeatureCard from '@/components/home/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProperties } from '@/hooks/useProperties';

const heroServices = [
  {
    id: "1",
    title: "Nettoyage Éclatant : Votre Partenaire de Confiance",
    description: "Des services professionnels pour un habitat sain et impeccable",
    imageUrl: "/lovable-uploads/8d7c4e8a-758a-4034-af18-f2f78c718eb2.png",
    buttonText: "Voir les détails",
    buttonLink: "/service/1",
    category: "Nettoyage"
  },
  {
    id: "2",
    title: "Location Immobilière Simplifiée",
    description: "Trouvez le logement idéal adapté à vos besoins au Mali",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    buttonText: "Explorer les logements",
    buttonLink: "/explorer",
    category: "Immobilier"
  },
  {
    id: "3",
    title: "Publiez Votre Propriété",
    description: "Mettez votre logement en location et trouvez des locataires fiables",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    buttonText: "Publier une annonce",
    buttonLink: "/creer-service",
    category: "Publicité"
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const { getAllProperties, toggleFavorite } = useProperties();
  const allProperties = getAllProperties();
  
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
      
      {!isMobile && (
        <div className="mt-10 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="Chercher un logement"
              description="Trouvez facilement le logement idéal adapté à vos besoins au Mali."
              imageUrl="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              linkUrl="/explorer"
              buttonText="Explorer"
            />
            <FeatureCard 
              title="Publier votre service"
              description="Créez une annonce pour offrir vos services professionnels."
              imageUrl="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              linkUrl="/creer-service"
              buttonText="Créer une publicité"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
