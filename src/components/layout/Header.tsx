
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/useProperties';
import AuthButtons from './AuthButtons';

// Create a global state object for filtering
export const filterState = {
  selectedLocation: null as string | null,
  setSelectedLocation: (location: string | null) => {
    filterState.selectedLocation = location;
  }
};

const Header = () => {
  const isMobile = useIsMobile();
  const { getAllProperties, properties } = useProperties();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the search term to filter properties, for example by location
    if (searchTerm) {
      filterState.setSelectedLocation(searchTerm);
    } else {
      filterState.setSelectedLocation(null);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-green-500 mr-4">
            Logo
          </Link>

          {!isMobile && (
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Rechercher..."
                className="w-80 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <Button variant="ghost" size="sm" className="text-sm">
              Mettre mon logement sur Logo
            </Button>
          )}
          
          {!isMobile && (
            <Button variant="ghost" size="icon">
              <Bell size={20} className="text-gray-700" />
            </Button>
          )}
          
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
