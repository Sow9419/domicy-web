
import React from 'react';
import { Heart } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';

const Favoris = () => {
  const { getFavoriteProperties, toggleFavorite } = useProperties();
  const favoriteProperties = getFavoriteProperties();
  const hasFavorites = favoriteProperties.length > 0;
  
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-10">
      <h1 className="text-2xl font-bold my-6">Vos favorites</h1>
      
      {hasFavorites ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onToggleFavorite={handleToggleFavorite} 
            />
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
