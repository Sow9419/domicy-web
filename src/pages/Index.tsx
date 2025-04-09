import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/home/HeroSection';
import PropertySection from '@/components/home/PropertySection';
import PropertyStorieSection from '@/components/properties/PropertyStorie';
import FeatureCard from '@/components/home/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';

const filterOptions = [
  { id: 'tous', label: 'Tous' },
  { id: 'appartement', label: 'Appartement' },
  { id: 'moderne', label: 'Moderne' },
  { id: 'local', label: 'Local' },
  { id: 'doma', label: 'Doma' },
];

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
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  }
];

const verifiedProperties = [
  {
    id: '5',
    title: 'Ramen Sapporo',
    location: 'Bamako, Baco Djicoroni',
    price: 120000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.5,
    imageUrl: '/lovable-uploads/ae148294-f4d8-480d-a44e-bba1a1860ad5.png',
    isAvailable: true
  },
  {
    id: '6',
    title: 'Ramen Sapporo',
    location: 'Bamako, Baco Djicoroni',
    price: 120000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '7',
    title: 'Modern Apartment',
    location: 'Bamako, Hamdallaye',
    price: 95000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '8',
    title: 'Luxury Villa',
    location: 'Bamako, ACI 2000',
    price: 280000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '9',
    title: 'Studio Élégant',
    location: 'Bamako, Magnambougou',
    price: 85000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
    isAvailable: true,
    isFavorite: false
  },
  {
    id: '10',
    title: 'Appartement Familial',
    location: 'Bamako, Hippodrome',
    price: 175000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true,
    isFavorite: true
  },
  {
    id: '11',
    title: 'Maison Traditionnelle',
    location: 'Bamako, Lafiabougou',
    price: 130000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '12',
    title: 'Loft Contemporain',
    location: 'Bamako, Centre-ville',
    price: 195000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true
  },
  {
    id: '13',
    title: 'Chambre Cosy',
    location: 'Bamako, Kalaban Coura',
    price: 60000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.1,
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80',
    isAvailable: true,
    isFavorite: false
  }
];

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
  const [activeFilter, setActiveFilter] = useState('tous');
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-8">
      <HeroSection services={heroServices} />
      
      <div className="mt-2">
        <PropertyStorieSection 
          title="Les hôtes vérifiés"
          properties={verifiedProperties}
          viewAllLink="/hotes-verifies"
        />
      </div>
      
      <div className="mt-2">
        <PropertySection 
          title="Recommandés pour vous"
          properties={mockProperties}
          viewAllLink="/explorer"
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
