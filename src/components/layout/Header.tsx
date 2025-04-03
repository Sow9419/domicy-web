
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sliders } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between">
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
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <Sliders size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block">
        <Link 
          to="/ajouter-logement"
          className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
        >
          Mettre mon logement sur Domicy
        </Link>
      </div>
      
      <div className="ml-4 md:ml-6">
        <Link 
          to="/compte"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
        >
          <User size={20} className="text-gray-600" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
