import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Bell, Filter, Sliders, MapPin, X, Menu, ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/useProperties';
import AuthButtons from './AuthButtons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { motion, AnimatePresence } from 'framer-motion';

// Create a global state object for filtering
export const filterState = {
  selectedLocation: null as string | null,
  setSelectedLocation: (location: string | null) => {
    filterState.selectedLocation = location;
  }
};

// Location categories for filter
const locationCategories = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nice', 'Strasbourg', 'Nantes', 'Montpellier', 'Rennes', 'Grenoble', 'Toulon', 'Angers'];
const Header = () => {
  const isMobile = useIsMobile();
  const {
    getAllProperties,
    properties,
    searchProperties
  } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [openLocationPopover, setOpenLocationPopover] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  // Récupérer les emplacements uniques à partir des propriétés
  const uniqueLocations = React.useMemo(() => {
    const locations = new Set<string>();
    // Ajouter les emplacements des propriétés
    properties.forEach(property => {
      locations.add(property.location.split(',')[0].trim());
    });
    // Ajouter les catégories d'emplacement prédéfinies
    locationCategories.forEach(location => locations.add(location));
    return Array.from(locations).sort();
  }, [properties]);

  // Filtrer les emplacements en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm) {
      const filtered = uniqueLocations.filter(location => location.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [searchTerm, uniqueLocations]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the search term to filter properties, for example by location
    if (searchTerm) {
      filterState.setSelectedLocation(searchTerm);
      setSelectedLocation(searchTerm);
    } else {
      filterState.setSelectedLocation(null);
      setSelectedLocation(null);
    }
    // Close filters panel and location popover after search
    setOpenLocationPopover(false);
    if (isMobile) {
      setShowFilters(false);
    }
  };
  const handleLocationSelect = (location: string) => {
    setSearchTerm(location);
    setSelectedLocation(location);
    filterState.setSelectedLocation(location);
    setOpenLocationPopover(false);
  };

  // Update global filter state when local state changes
  React.useEffect(() => {
    filterState.setSelectedLocation(selectedLocation);
  }, [selectedLocation]);
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 sm:h-20 px-2 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center flex-1">
          {isMobile && <Link to="/" className="bg-primary rounded-full w-10 h-10 flex items-center justify-center mr-0">
              <span className="text-white font-bold text-lg">dy</span>
            </Link>}
          <div className="flex-1 max-w-2xl mx-auto px-0 sm:px-4 relative">
            {/* Barre de recherche avec autocomplétion et bouton de filtres */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Popover open={openLocationPopover} onOpenChange={setOpenLocationPopover}>
                <div className="relative w-full">
                  <div className="absolute left-3 text-gray-400 z-10 top-1/2 -translate-y-1/2">
                    <Search size={18} />
                  </div>
                  <PopoverTrigger asChild>
                    <motion.div className="w-full" whileTap={{
                    scale: 0.98
                  }}>
                      <Input type="text" placeholder="Rechercher une destination" className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary" value={searchTerm} onChange={e => {
                      setSearchTerm(e.target.value);
                      if (e.target.value) setOpenLocationPopover(true);
                    }} />

                    </motion.div>
                  </PopoverTrigger>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => setShowFilters(!showFilters)}>
                      <Sliders size={18} />
                    </Button>
                  </div>
                </div>
                <PopoverContent className="p-0 w-full max-w-[calc(100vw-2rem)] sm:max-w-[500px] shadow-xl border border-gray-100 rounded-xl overflow-hidden" align="start">
                  <Command className="rounded-lg">
                    <CommandInput placeholder="Rechercher une destination..." value={searchTerm} onValueChange={setSearchTerm} className="border-none focus:ring-0" />
                    <CommandList className="max-h-[300px] overflow-y-auto">
                      <CommandEmpty>
                        <div className="py-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500">Aucune destination trouvée</p>
                        </div>
                      </CommandEmpty>
                      <CommandGroup heading="Destinations suggérées" className="px-2">
                        {filteredLocations.length > 0 ? filteredLocations.map((location, index) => <motion.div key={location} initial={{
                        opacity: 0,
                        y: 10
                      }} animate={{
                        opacity: 1,
                        y: 0
                      }} transition={{
                        delay: index * 0.03,
                        duration: 0.2
                      }}>
                              <CommandItem value={location} onSelect={handleLocationSelect} className="flex items-center rounded-lg px-3 py-2 hover:bg-primary/5 transition-colors duration-200">
                                <div className="bg-primary/10 p-1.5 rounded-full mr-3">
                                  <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <span>{location}</span>
                              </CommandItem>
                            </motion.div>) : uniqueLocations.slice(0, 5).map((location, index) => <motion.div key={location} initial={{
                        opacity: 0,
                        y: 10
                      }} animate={{
                        opacity: 1,
                        y: 0
                      }} transition={{
                        delay: index * 0.03,
                        duration: 0.2
                      }}>
                              <CommandItem value={location} onSelect={handleLocationSelect} className="flex items-center rounded-lg px-3 py-2 hover:bg-primary/5 transition-colors duration-200">
                                <div className="bg-primary/10 p-1.5 rounded-full mr-3">
                                  <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <span>{location}</span>
                              </CommandItem>
                            </motion.div>)}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </form>
              
              {/* Panneau de filtres - visible uniquement lorsque showFilters est true */}
              <AnimatePresence>
                {showFilters && <motion.div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-40" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}>
                    {/* Section de filtre par localisation */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2 flex items-center"><MapPin size={16} className="mr-1" /> Destination</h3>
                      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                        {locationCategories.map(location => <motion.button key={location} onClick={() => setSelectedLocation(prev => prev === location ? null : location)} className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${selectedLocation === location ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }} initial={{
                    opacity: 0,
                    scale: 0.9
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    scale: 0.9
                  }}>
                            {location}
                          </motion.button>)}
                      </div>
                    </div>
                    
                    {/* Section de filtre par prix */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2 flex items-center">Prix par nuit</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600 mb-1 block">Min (€)</label>
                          <Input type="number" placeholder="0" className="w-full" min="0" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600 mb-1 block">Max (€)</label>
                          <Input type="number" placeholder="1000" className="w-full" min="0" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Section de filtre par type de logement */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2 flex items-center">Type de logement</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Appartement', 'Maison', 'Villa', 'Studio', 'Chambre'].map(type => <button key={type} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                            {type}
                          </button>)}
                      </div>
                    </div>
                    
                    {/* Boutons d'action pour les filtres (réinitialiser/appliquer) */}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => {
                  setSelectedLocation(null);
                  setShowFilters(false);
                }} className="text-sm">
                        <X size={16} className="mr-1" />
                        Réinitialiser
                      </Button>
                      <Button className="text-sm bg-primary hover:bg-primary-hover" onClick={() => {
                  setShowFilters(false);
                  handleSearch(new Event('submit') as any);
                }}>
                        Appliquer les filtres
                      </Button>
                    </div>
                  </motion.div>}
              </AnimatePresence>
              
              {/* Affichage des filtres actifs (localisation sélectionnée) */}
              <AnimatePresence>
                {selectedLocation && !showFilters && <motion.div className="absolute top-full mt-2 left-4 right-4 flex items-center" initial={{
              opacity: 0,
              y: -5
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -5
            }} transition={{
              duration: 0.2
            }}>
                    <div className="text-sm text-gray-600 mr-2">Destination:</div>
                    <motion.div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary" whileHover={{
                scale: 1.05
              }} transition={{
                type: "spring",
                stiffness: 400
              }}>
                      <MapPin size={12} className="mr-1" />
                      {selectedLocation}
                      <motion.button onClick={() => setSelectedLocation(null)} className="ml-1 text-primary hover:text-primary-hover" whileHover={{
                  rotate: 90
                }} transition={{
                  duration: 0.2
                }}>
                        <X size={12} />
                      </motion.button>
                    </motion.div>
                  </motion.div>}
              </AnimatePresence>
            </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {!isMobile ? <Button variant="ghost" size="sm" className="text-sm whitespace-nowrap">
              Mettre mon logement sur Logo
            </Button> : null}
          
          <AuthButtons />
        </div>
      </div>

      {/* Version mobile des filtres */}
      {isMobile && <AnimatePresence>
          {showFilters && <motion.div className="fixed inset-x-0 top-16 bg-white p-4 border-b border-gray-200 shadow-md z-50" initial={{
        y: -100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: -100,
        opacity: 0
      }} transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}>
              {/* Titre du panneau de filtres */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filtres</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => setShowFilters(false)}>
                  <X size={18} />
                </Button>
              </div>
              
              {/* Filtres mobiles */}
              <div className="space-y-4">
                {/* Section de filtre par localisation */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center"><MapPin size={16} className="mr-1" /> Destination</h3>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                    {locationCategories.map(location => <button key={location} onClick={() => setSelectedLocation(prev => prev === location ? null : location)} className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${selectedLocation === location ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {location}
                      </button>)}
                  </div>
                </div>
                
                {/* Section de filtre par prix */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center">Prix par nuit</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Min (€)</label>
                      <Input type="number" placeholder="0" className="w-full" min="0" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Max (€)</label>
                      <Input type="number" placeholder="1000" className="w-full" min="0" />
                    </div>
                  </div>
                </div>
                
                {/* Section de filtre par type de logement */}
                <div>
                  <h3 className="font-medium mb-2 flex items-center">Type de logement</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Appartement', 'Maison', 'Villa', 'Studio', 'Chambre'].map(type => <button key={type} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                        {type}
                      </button>)}
                  </div>
                </div>

                {/* Boutons d'action pour les filtres (réinitialiser/appliquer) */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => {
              setSelectedLocation(null);
              setShowFilters(false);
            }} className="text-sm">
                    <X size={16} className="mr-1" />
                    Réinitialiser
                  </Button>
                  <Button className="text-sm bg-primary hover:bg-primary-hover" onClick={() => {
              setShowFilters(false);
              handleSearch(new Event('submit') as any);
            }}>
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>}

      {/* Affichage des filtres actifs en mode mobile */}
      <AnimatePresence>
        {isMobile && selectedLocation && !showFilters && <motion.div className="fixed top-16 inset-x-0 bg-white border-b border-gray-200 py-2 px-4 z-40 flex items-center" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.2
      }}>
            <div className="text-sm text-gray-600 mr-2">Destination:</div>
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              <MapPin size={12} className="mr-1" />
              {selectedLocation}
              <button onClick={() => setSelectedLocation(null)} className="ml-1 text-primary hover:text-primary-hover">
                <X size={12} />
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
export default Header;