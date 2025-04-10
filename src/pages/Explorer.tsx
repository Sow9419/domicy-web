
import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import FilterTabs from '@/components/home/FilterTabs';
import { filterState } from '@/components/layout/Header';
import { useProperties } from '@/hooks/useProperties';

const filterOptions = [
  { id: 'tous', label: 'Tous' },
  { id: 'appartement', label: 'Appartement' },
  { id: 'maison', label: 'Maison' },
  { id: 'villa', label: 'Villa' },
  { id: 'studio', label: 'Studio' },
  { id: 'chambre', label: 'Chambre' }
];

const Explorer = () => {
  // Utiliser le hook useProperties
  const { getAllProperties, toggleFavorite } = useProperties();
  const properties = getAllProperties();
  
  // Utiliser l'état global pour la localisation
  const [selectedLocation, setSelectedLocation] = useState<string | null>(filterState.selectedLocation);
  const [activeFilter, setActiveFilter] = useState('tous');
  
  // Synchroniser l'état local avec l'état global
  useEffect(() => {
    setSelectedLocation(filterState.selectedLocation);

    // Mettre à jour l'état global lorsque l'état local change
    const originalSetSelectedLocation = filterState.setSelectedLocation;
    filterState.setSelectedLocation = (location: string | null) => {
      setSelectedLocation(location);
      originalSetSelectedLocation(location);
    };
    return () => {
      filterState.setSelectedLocation = originalSetSelectedLocation;
    };
  }, [filterState.selectedLocation]);
  
  // Fonction pour gérer le basculement des favoris
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };
  
  // Filtrer les propriétés
  const filteredProperties = properties.filter(property => {
    // Filtre par localisation
    const locationMatch = !selectedLocation || property.location === selectedLocation;

    // Filtre par type (basé sur le titre pour cet exemple)
    const typeMatch = activeFilter === 'tous' || 
                   (activeFilter === 'appartement' && property.title.toLowerCase().includes('appartement')) || 
                   (activeFilter === 'maison' && property.title.toLowerCase().includes('maison')) || 
                   (activeFilter === 'villa' && property.title.toLowerCase().includes('villa')) || 
                   (activeFilter === 'studio' && property.title.toLowerCase().includes('studio')) || 
                   (activeFilter === 'chambre' && property.title.toLowerCase().includes('chambre'));
    
    return locationMatch && typeMatch;
  });
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-10">
      <div className="my-4">
        <FilterTabs options={filterOptions} activeId={activeFilter} onChange={setActiveFilter} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
        {filteredProperties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;
