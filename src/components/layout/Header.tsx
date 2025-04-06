import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sliders, User, MapPin, X, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Importation des composants nécessaires pour le Header
// - React et hooks pour la gestion d'état
// - React Router pour la navigation
// - Lucide React pour les icônes
// - Composants UI personnalisés (input, button, avatar)

// Création d'un objet global pour partager l'état des filtres entre les composants
// Cet objet permet de synchroniser l'état des filtres à travers différentes parties de l'application
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
  // Utilisation du hook useLocation pour accéder à l'URL actuelle
  const location = useLocation();
  // Vérification si l'utilisateur est sur la page Explorer
  const isExplorerPage = location.pathname === '/explorer';
  // États locaux pour gérer l'affichage des filtres et la localisation sélectionnée
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Hook d'effet pour synchroniser l'état local avec l'état global des filtres
  // Se déclenche à chaque changement de selectedLocation ou showFilters
  useEffect(() => {
    filterState.selectedLocation = selectedLocation;
    filterState.showFilters = showFilters;
  }, [selectedLocation, showFilters]);
  
  // Hook d'effet pour mettre à jour les setters de l'état global
  // Permet aux autres composants de modifier l'état des filtres
  // S'exécute une seule fois au montage du composant
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
  
  // Liste des localisations disponibles pour le filtre
  const locationCategories = [
    'Bamako, Baco Djicoroni',
    'Bamako, ACI 2000',
    'Bamako, Hamdallaye',
    'Bamako, Magnambougou',
    'Bamako, Centre-ville',
    'Bamako, Hippodrome'
  ];
  return (
    // En-tête principal fixé en haut de la page
    // Ajustement de la position en fonction de la présence de la sidebar (sur desktop)
    <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between fixed top-0 left-0 right-0 md:left-16 bg-white shadow-sm z-50">
      {/* Logo mobile - visible uniquement sur les appareils mobiles */}
      <div className="flex items-center md:hidden">
        <Link to="/" className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">dy</span>
        </Link>
      </div>
      
      {/* Section centrale avec la barre de recherche et les filtres */}
      <div className="flex-1 max-w-2xl mx-auto px-4">
        {/* Barre de recherche avec icône et bouton de filtres */}
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <Input 
            type="text" 
            placeholder="Rechercher un hôte ou une ville" 
            className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-200 shadow-md"
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
        
        {/* Panneau de filtres - visible uniquement lorsque showFilters est true */}
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-40 animate-fade-in">
            {/* Section de filtre par localisation */}
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
            
            {/* Section de filtre par localisation */}
            {/* Section de filtre par prix */}
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
            
            {/* Section de filtre par localisation */}
            {/* Section de filtre par type de logement */}
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
            
            {/* Boutons d'action pour les filtres (réinitialiser/appliquer) */}
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
        
        {/* Affichage des filtres actifs (localisation sélectionnée) */}
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
      
      {/* Section droite du header avec les liens et icônes utilisateur */}
      <div className="flex items-center space-x-4">
        {/* Lien pour ajouter un logement - visible uniquement sur desktop */}
        {/* Lien pour ajouter un logement - visible uniquement sur desktop */}
        <Link 
          to="/ajouter-logement"
          className="hidden md:block text-gray-700 hover:text-primary transition-colors text-sm font-medium"
        >
          Mettre mon logement sur Domicy
        </Link>
        
        {/* Icône utilisateur simple - visible uniquement en desktop */}
        <Link 
          to="/compte"
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 shadow-md"
          aria-label="Notifications"
        >
          <User size={20} className="text-gray-700" />
        </Link>
        
        {/* Avatar utilisateur - visible en mobile et desktop avec styles améliorés */}
        <Link 
          to="/compte"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 shadow-md"
          aria-label="Accéder à mon compte"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-white text-primary border border-gray-300">
              <User size={20} className="text-gray-700" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;