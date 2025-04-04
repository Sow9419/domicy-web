import React, { useState } from 'react';
import { Search, Sliders, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/properties/PropertyCard';
import FilterTabs from '@/components/home/FilterTabs';

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
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
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
  },
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

const locationCategories = [
  'Bamako, Baco Djicoroni',
  'Bamako, ACI 2000',
  'Bamako, Hamdallaye',
  'Bamako, Magnambougou',
  'Bamako, Centre-ville',
  'Bamako, Hippodrome'
];

const filterOptions = [
  { id: 'tous', label: 'Tous' },
  { id: 'appartement', label: 'Appartement' },
  { id: 'maison', label: 'Maison' },
  { id: 'villa', label: 'Villa' },
  { id: 'studio', label: 'Studio' },
  { id: 'chambre', label: 'Chambre' },
];

const Explorer = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('tous');
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-10">
      <div className="sticky top-0 pt-4 pb-2 bg-white z-30">
        <div className="flex items-center mb-4">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <Input 
              type="text" 
              placeholder="Rechercher un logement" 
              className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 h-10 w-10 text-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Sliders size={20} />
          </Button>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 animate-fade-in">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Localisation</h3>
              <div className="flex flex-wrap gap-2">
                {locationCategories.map(location => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(prev => prev === location ? null : location)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                      selectedLocation === location
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MapPin size={14} className="mr-1" />
                    {location}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Prix</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Min</label>
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Max</label>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Type de logement</h3>
              <div className="flex flex-wrap gap-2">
                {['Appartement', 'Maison', 'Villa', 'Studio', 'Chambre'].map(type => (
                  <button
                    key={type}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedLocation(null);
                  setShowFilters(false);
                }}
                className="text-sm"
              >
                <X size={16} className="mr-1" />
                Réinitialiser
              </Button>
              <Button 
                className="text-sm bg-primary hover:bg-primary-hover"
                onClick={() => setShowFilters(false)}
              >
                Appliquer les filtres
              </Button>
            </div>
          </div>
        )}
        
        {selectedLocation && (
          <div className="flex items-center mb-2">
            <div className="text-sm text-gray-600 mr-2">Filtres:</div>
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              <MapPin size={12} className="mr-1" />
              {selectedLocation}
              <button 
                onClick={() => setSelectedLocation(null)}
                className="ml-1 text-primary hover:text-primary-hover"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="my-4">
        <FilterTabs 
          options={filterOptions}
          activeId={activeFilter}
          onChange={setActiveFilter}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {mockProperties
          .filter(property => {
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
          })
          .map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
      </div>
    </div>
  );
};

export default Explorer;
