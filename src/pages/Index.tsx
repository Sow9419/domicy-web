
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PropertySection from '@/components/home/PropertySection';
import FeatureCard from '@/components/home/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';

const mockProperties = [
  {
    id: '1',
    title: 'Ramen Sapporo',
    location: 'Bamako, Baco Djicoroni',
    price: 120000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '2',
    title: 'Appartement moderne',
    location: 'Bamako, Baco Djicoroni',
    price: 150000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '3',
    title: 'Villa avec piscine',
    location: 'Bamako, ACI 2000',
    price: 350000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isFavorite: true
  },
  {
    id: '4',
    title: 'Studio meublé',
    location: 'Bamako, Hamdallaye',
    price: 75000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  }
];

const verifiedProperties = [
  {
    id: '5',
    title: 'Maison familiale',
    location: 'Bamako, Baco Djicoroni',
    price: 200000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '6',
    title: 'Chambre simple',
    location: 'Bamako, Baco Djicoroni',
    price: 45000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '7',
    title: 'Appart 3 chambres',
    location: 'Bamako, Magnambougou',
    price: 180000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
    isAvailable: true
  },
  {
    id: '8',
    title: 'Loft moderne',
    location: 'Bamako, ACI 2000',
    price: 220000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="px-4 md:px-6 md:ml-16 pb-20 md:pb-10">
      <HeroSection 
        title="Nettoyage Éclatant : Votre Partenaire de Confiance"
        description="Des services professionnels pour un habitat sain et impeccable"
        imageUrl="/lovable-uploads/8d7c4e8a-758a-4034-af18-f2f78c718eb2.png"
        buttonText="Contacter le service"
        buttonLink="/services"
      />
      
      <PropertySection 
        title="Recommandés pour vous"
        properties={mockProperties}
        viewAllLink="/explorer"
      />
      
      <PropertySection 
        title="Les hôtes vérifiés"
        properties={verifiedProperties}
        viewAllLink="/hotes-verifies"
      />
      
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
              title="Mettez votre logement en location"
              description="Publiez votre propriété et trouvez des locataires fiables rapidement."
              imageUrl="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              linkUrl="/ajouter-logement"
              buttonText="Publier une annonce"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
