
import React from 'react';
import { Heart } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';

const favoritesProperties = [
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
    id: '8',
    title: 'Loft moderne',
    location: 'Bamako, ACI 2000',
    price: 220000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    isAvailable: true,
    isFavorite: true
  }
];

const Favoris = () => {
  const hasFavorites = favoritesProperties.length > 0;
  
  return (
    <div className="px-4 md:px-6 md:ml-16 pb-20 md:pb-10">
      <h1 className="text-2xl font-bold my-6">Mes Favoris</h1>
      
      {hasFavorites ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoritesProperties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
          <p className="text-gray-600 max-w-md mb-6">
            Vous n'avez pas encore ajouté de logements à vos favoris. Explorez notre sélection et ajoutez ceux qui vous plaisent !
          </p>
          <a 
            href="/explorer" 
            className="bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Explorer les logements
          </a>
        </div>
      )}
    </div>
  );
};

export default Favoris;
