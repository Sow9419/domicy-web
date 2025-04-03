
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';

const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Explorer', path: '/explorer', icon: Search },
    { name: 'Favoris', path: '/favoris', icon: Heart },
    { name: 'Compte', path: '/compte', icon: User }
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 px-3 h-full ${
              isActive(item.path) ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-col bg-sidebar w-16 h-screen fixed left-0 top-0">
      <div className="flex justify-center py-5">
        <Link to="/" className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">dy</span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 items-center pt-10 space-y-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'text-sidebar-icon' 
                : 'text-white hover:text-sidebar-icon'
            }`}
          >
            <item.icon size={24} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
