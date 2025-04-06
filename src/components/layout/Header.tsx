
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sliders, User, MapPin, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Création d'un objet global pour partager l'état des filtres entre les composants
export const filterState = {
  selectedLocation: null as string | null,
  showFilters: false,
  setSelectedLocation: (location: string | null) => {
    filterState.selectedLocation = location;
  },
  setShowFilters: (show: boolean) => {
    filterState.showFilters = show;
  }
};

const Header = () => {
  const location = useLocation();
  const isExplorerPage = location.pathname === '/explorer';
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Synchroniser l'état local avec l'état global
  useEffect(() => {
    filterState.selectedLocation = selectedLocation;
    filterState.showFilters = showFilters;
  }, [selectedLocation, showFilters]);
  
  // Mettre à jour les setters de l'état global
  useEffect(() => {
    const originalSetSelectedLocation = filterState.setSelectedLocation;
    const originalSetShowFilters = filterState.setShowFilters;
    
    filterState.setSelectedLocation = (location: string | null) => {
      setSelectedLocation(location);
      originalSetSelectedLocation(location);
    };
    
    filterState.setShowFilters = (show: boolean) => {
      setShowFilters(show);
      originalSetShowFilters(show);
    };
    
    return () => {
      filterState.setSelectedLocation = originalSetSelectedLocation;
      filterState.setShowFilters = originalSetShowFilters;
    };
  }, []);
  
  const locationCategories = [
    'Bamako, Baco Djicoroni',
    'Bamako, ACI 2000',
    'Bamako, Hamdallaye',
    'Bamako, Magnambougou',
    'Bamako, Centre-ville',
    'Bamako, Hippodrome'
  ];
  return (
    <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between fixed top-0 left-0 right-0 md:left-16 bg-white shadow-sm z-50">
      <div className="flex items-center md:hidden">
        <Link to="/" className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">dy</span>
        </Link>
      </div>
      
      <div className="flex-1 max-w-2xl mx-auto px-4">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <Input 
            type="text" 
            placeholder="Rechercher un hôte ou une ville" 
            className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-200"
          />
          <div className="absolute right-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders size={18} />
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-40 animate-fade-in">
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
          <div className="absolute top-full mt-2 left-4 right-4 flex items-center">
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
      
      <div className="flex items-center space-x-4">
        <Link 
          to="/ajouter-logement"
          className="hidden md:block text-gray-700 hover:text-primary transition-colors text-sm font-medium"
        >
          Mettre mon logement sur Domicy
        </Link>
        
        <Link 
          to="/compte"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Accéder à mon compte"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              <User size={20} className="text-gray-600" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
